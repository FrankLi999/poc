package _strings;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class StringAndFile {

//	public static String readSrting(String path) {
//		// Java 11
//		try {
//			return Files.readString(path);
//		} catch (IOException ex) {
//			e.printStackTrace();
//		}
//	}

	public static String readLineByLineJava8(String filePath) {

		StringBuilder contentBuilder = new StringBuilder();
		// Files.lines Java 8
		try (Stream<String> stream = Files.lines(Paths.get(filePath), StandardCharsets.UTF_8)) {
			stream.forEach(s -> contentBuilder.append(s).append("\n"));
		} catch (IOException e) {
			e.printStackTrace();
		}

		return contentBuilder.toString();
	}

	public static String readAllBytesJava7(String filePath) {
		String content = "";

		try {
			content = new String(Files.readAllBytes(Paths.get(filePath)));
		} catch (IOException e) {
			e.printStackTrace();
		}

		return content;
	}

	public static String usingBufferedReader(String filePath) {
		StringBuilder contentBuilder = new StringBuilder();
		try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {

			String sCurrentLine;
			while ((sCurrentLine = br.readLine()) != null) {
				contentBuilder.append(sCurrentLine).append("\n");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return contentBuilder.toString();
	}
}
