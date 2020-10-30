package _lang;

public class LocalClass {
	// format has to be effective final
	public static String testLocalClass(String format) {
		final class PhoneNumber {
			public String phoneNumber = null;

            PhoneNumber(String phoneNumber){
            	this.phoneNumber = phoneNumber;
            }
            
            public String formatPhoneNumner() {
            	return String.format(format, phoneNumber);
            }
		}
		PhoneNumber phoneNumber = new PhoneNumber("1233456");
		return phoneNumber.formatPhoneNumner();
	}
	
	public static void main(String argc[]) {
        System.out.println(LocalClass.testLocalClass("%s"));
	}
}
