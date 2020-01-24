package com.bpwizard.lambda.imageresizer;

import static org.mockito.Mockito.when;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.verify;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.apache.http.client.methods.HttpRequestBase;
import org.junit.Assert;
import org.junit.Before;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.S3Event;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
@RunWith(MockitoJUnitRunner.class)
public class LambdaFunctionHandlerTest {

    private final String CONTENT_TYPE = "image/jpeg";
    private final String TEST_IMAGE_FILENAME = "HappyFace.jpg";
    private S3Event event;

    @Mock
    private AmazonS3 s3Client;
    @Mock
    private S3Object s3Object;
    @Mock
    private HttpRequestBase httpRequestBaseMock;

    @Captor
    private ArgumentCaptor<GetObjectRequest> getObjectRequest;
    
    @Captor
    private ArgumentCaptor<PutObjectRequest> putObjectRequestCaptor;
    
    @Before
    public void setUp() throws IOException {
        event = TestUtils.parse("/s3-event.put.json", S3Event.class);

        // TODO: customize your mock logic for s3 client
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(CONTENT_TYPE);
        when(s3Object.getObjectMetadata()).thenReturn(objectMetadata);
        when(s3Client.getObject(getObjectRequest.capture())).thenReturn(s3Object);
        
        when(s3Object.getKey()).thenReturn(TEST_IMAGE_FILENAME);
        
        when(s3Object.getObjectContent()).thenReturn(new S3ObjectInputStream(LambdaFunctionHandler.class.getResourceAsStream("/HappyFace.jpg"), httpRequestBaseMock));
    }

    private Context createContext() {
        TestContext ctx = new TestContext();

        // TODO: customize your context here if needed.
        ctx.setFunctionName("Your Function Name");

        return ctx;
    }

    @Test
    public void testLambdaFunctionHandler() {
        LambdaFunctionHandler handler = new LambdaFunctionHandler(s3Client);
        Context ctx = createContext();

        String output = handler.handleRequest(event, ctx);

        // TODO: validate output here if needed.
        Assert.assertEquals(CONTENT_TYPE, output);
    }
    
    @Test
    public void testLambdaFunctionHandlerSendsResizedImageToTheResizedImageBucket() {
        LambdaFunctionHandler handler = new LambdaFunctionHandler(s3Client);
        Context ctx = createContext();

        handler.handleRequest(event, ctx);
        
        // Verify that s3.putObject was called and capture the object used in the call
        verify(s3Client).putObject(putObjectRequestCaptor.capture());
        PutObjectRequest putObject = putObjectRequestCaptor.getValue();
        
        // Verify the parameter to putObject is what we expect
        assertEquals("source-resized-img-xli", putObject.getBucketName());
        assertEquals(TEST_IMAGE_FILENAME, putObject.getKey());
    }
    
    @Test
    public void testLambdaFunctionHandlerResizedImageTo100x100() throws IOException {
        LambdaFunctionHandler handler = new LambdaFunctionHandler(s3Client);
        Context ctx = createContext();

        handler.handleRequest(event, ctx);
        
        // Verify that s3.putObject was called and capture the object used in the call
        verify(s3Client).putObject(putObjectRequestCaptor.capture());
        PutObjectRequest putObjectRequest = putObjectRequestCaptor.getValue();
        
        // Get the image from the putObject call and verify that the image height and width is 100
        File imageFile = putObjectRequest.getFile();
		BufferedImage originalImage = ImageIO.read(imageFile);
		assertEquals(100, originalImage.getHeight());
		assertEquals(100, originalImage.getWidth());
    }

}
