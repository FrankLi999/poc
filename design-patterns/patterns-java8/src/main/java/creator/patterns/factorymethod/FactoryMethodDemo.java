package creator.patterns.factorymethod;

/**
 * Create an object based on the given input
 *
 */
public class FactoryMethodDemo {
	
	interface ImageReader {
	    DecodedImage getDecodeImage();
	}

	static class DecodedImage {
	    private String image;

	    public DecodedImage(String image) {
	        this.image = image;
	    }

	    @Override
	    public String toString() {
	        return image + ": is decoded";
	    }
	}

	static class GifReader implements ImageReader {
	    private DecodedImage decodedImage;

	    public GifReader(String image) {
	        this.decodedImage = new DecodedImage(image);
	    }

	    @Override
	    public DecodedImage getDecodeImage() {
	        return decodedImage;
	    }
	}

	static class JpegReader implements ImageReader {
	    private DecodedImage decodedImage;

	    public JpegReader(String image) {
	        decodedImage = new DecodedImage(image);
	    }

	    @Override
	    public DecodedImage getDecodeImage() {
	        return decodedImage;
	    }
	}
	
    public static void main(String[] args) {
    	
        DecodedImage decodedImage;
        ImageReader reader = null;
        String image = args[0];
        String format = image.substring(image.indexOf('.') + 1, (image.length()));
        if (format.equals("gif")) {
            reader = new GifReader(image);
        } else if (format.equals("jpeg")) {
            reader = new JpegReader(image);
        }
        assert reader != null;
        decodedImage = reader.getDecodeImage();
        System.out.println(decodedImage);
    }
}
