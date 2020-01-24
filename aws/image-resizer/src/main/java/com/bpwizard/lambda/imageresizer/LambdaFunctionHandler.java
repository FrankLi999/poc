package com.bpwizard.lambda.imageresizer;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

import javax.imageio.ImageIO;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.S3Event;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;

public class LambdaFunctionHandler implements RequestHandler<S3Event, String> {

	private static final int IMG_WIDTH = 100;
	private static final int IMG_HEIGHT = 100;

	private AmazonS3 s3 = AmazonS3ClientBuilder.standard().build();
	private String resizedBucketName = "source-resized-img-xli";
    
    public LambdaFunctionHandler() {}

    // Test purpose only.
    LambdaFunctionHandler(AmazonS3 s3) {
        this.s3 = s3;
    }

    @Override
    public String handleRequest(S3Event event, Context context) {
        context.getLogger().log("Received event: " + event);

        // Get the object from the event and show its content type
        String bucket = event.getRecords().get(0).getS3().getBucket().getName();
        String key = event.getRecords().get(0).getS3().getObject().getKey();
        try {
            S3Object response = s3.getObject(new GetObjectRequest(bucket, key));
            String contentType = response.getObjectMetadata().getContentType();
            context.getLogger().log("CONTENT TYPE: " + contentType);
            
            resizeImageAndSaveToS3(response);
            
            return contentType;
        } catch (Exception e) {
            e.printStackTrace();
            context.getLogger().log(String.format(
                "Error getting object %s from bucket %s. Make sure they exist and"
                + " your bucket is in the same region as this function.", key, bucket));
            throw e;
        }
    }

	private void resizeImageAndSaveToS3(S3Object response) {
		try (InputStream s3ObjectData = response.getObjectContent()) {
			File sourceImageFile = File.createTempFile("sourceImgFile", "");
			Files.copy(s3ObjectData, sourceImageFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
			
			BufferedImage originalImage = ImageIO.read(sourceImageFile);
			int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
				
			BufferedImage resizeImageJpg = resizeImage(originalImage, type);
			File resizedImageFile = File.createTempFile("resizedimage", "");
			ImageIO.write(resizeImageJpg, "jpg", resizedImageFile); 
			
			// Push the image to the other bucket
			s3.putObject(new PutObjectRequest(resizedBucketName , response.getKey(), resizedImageFile));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	private BufferedImage resizeImage(BufferedImage originalImage, int type) {
		BufferedImage resizedImage = new BufferedImage(IMG_WIDTH, IMG_HEIGHT, type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, IMG_WIDTH, IMG_HEIGHT, null);
		g.dispose();
			
		return resizedImage;
	}
}