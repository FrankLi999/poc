package com.bpwizard.poc.bootfileupload;

import java.io.BufferedReader;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(FileUploadController.BASE_URI)
public class FileUploadController {
	private static final Logger logger = LogManager.getLogger(FileUploadController.class);
	public static final String BASE_URI = "/upload";

	/**
	 * Imports a single CND file into the repository, using a
	 * {@link MediaType#_FORM_DATA} request. The CND file is expected to be
	 * submitted from an HTML element with the name <i>file</i>
	 *
	 * @param request        a non-null {@link HttpServletRequest} request
	 * @param repositoryName a non-null {@link String} representing the name of a
	 *                       repository.
	 * @param workspaceName  a non-null {@link String} representing the name of a
	 *                       workspace.
	 * @param allowUpdate    an optional parameter which indicates whether existing
	 *                       node types should be updated (overridden) or not.
	 * @param form           a {@link FileUploadForm} instance representing the HTML
	 *                       form from which the cnd was submitted
	 * @return a {@code non-null} {@link ResponseEntity}
	 * @throws RepositoryException      if any JCR operations fail
	 * @throws IllegalArgumentException if the submitted form does not contain an
	 *                                  HTML element named "file".
	 */
	@PostMapping(path = "/base64", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public String base64(HttpServletRequest request, @RequestBody Map<String, Object> formData
	// @RequestParam("file") MultipartFile file
	) {
		logger.debug("Entering ...");
		try {
			printFormData(formData);
			logger.debug("Exiting ...");
			return "{\"status\":\"done\"}";
		} catch (Throwable t) {
			throw new RuntimeException(t);
		}
	}

	/**
	 * Imports a single CND file into the repository, using a
	 * {@link MediaType#_FORM_DATA} request. The CND file is expected to be
	 * submitted from an HTML element with the name <i>file</i>
	 *
	 * @param request        a non-null {@link HttpServletRequest} request
	 * @param repositoryName a non-null {@link String} representing the name of a
	 *                       repository.
	 * @param workspaceName  a non-null {@link String} representing the name of a
	 *                       workspace.
	 * @param allowUpdate    an optional parameter which indicates whether existing
	 *                       node types should be updated (overridden) or not.
	 * @param form           a {@link FileUploadForm} instance representing the HTML
	 *                       form from which the cnd was submitted
	 * @return a {@code non-null} {@link ResponseEntity}
	 * @throws RepositoryException      if any JCR operations fail
	 * @throws IllegalArgumentException if the submitted form does not contain an
	 *                                  HTML element named "file".
	 */
	@PostMapping(path = "/binary", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public String binary(HttpServletRequest request,
		@RequestBody Map<String, Object> formData) {
		logger.debug("Entering ...");
		try {
     		printFormData(formData);

			for (Part p: request.getParts()) {
				System.out.println(p.getName());
			}
			logger.debug("Exiting ...");
			return "{\"status\":\"done\"}";
		} catch (Throwable t) {
			throw new RuntimeException(t);
		}
	}
	
	@PostMapping(path = "/multipart", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public String multipart(HttpServletRequest request) {
		// @RequestBody Map<String, Object> formData) {
//    		@RequestParam("name") String name,
//    		@RequestParam("avatar") MultipartFile file,
//    		@RequestParam("avatars") MultipartFile[] files) {
		logger.debug("Entering ...");
		try {
//     		printFormData(formData);
//    		for (int i = 0 ; i < files.length; i++) {
//    			System.out.println(files[i]);
//    		}
			for (Part p: request.getParts()) {
				System.out.println(p.getName());
			}
			logger.debug("Exiting ...");
			return "{\"status\":\"done\"}";
		} catch (Throwable t) {
			throw new RuntimeException(t);
		}
	}

	private void printFormData(Map<String, Object> formData) {
		System.out.println(formData);
		if (formData != null) {
			for (String key : formData.keySet()) {
				System.out.println("====================================");
				System.out.println("key:" + key);
				System.out.println("value:" + formData.get(key));
				System.out.println("value class:" + formData.get(key).getClass());
				if (formData.get(key) instanceof Map) {
					System.out.println("value class:" + ((Map) formData.get(key)).get("value"));
					System.out.println("value class:" + ((Map) formData.get(key)).get("value").getClass());
				}
				System.out.println("====================================");
			}
		}
	}
}
