package patterns.creator.factorymethod;

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

	static class ImageReaderFactory {
		public ImageReader getImageReader(String format, String image) {
			ImageReader reader = null;
			if (format.equals("gif")) {
				reader = new GifReader(image);
			} else if (format.equals("jpeg")) {
				reader = new JpegReader(image);
			}
			return reader;
		}
	}

	public static void main(String[] args) {
		ImageReaderFactory imageReaderFactory = new ImageReaderFactory();  
		DecodedImage decodedImage;
		String image = args[0];
		String format = image.substring(image.indexOf('.') + 1, (image.length()));
		ImageReader reader = imageReaderFactory.getImageReader(format, image);
		assert reader != null;
		decodedImage = reader.getDecodeImage();
		System.out.println(decodedImage);
	}
}
