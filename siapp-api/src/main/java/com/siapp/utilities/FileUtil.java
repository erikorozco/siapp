package com.siapp.utilities;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;

public class FileUtil {
	
	/**
	 * 
	 * @param file
	 * @return byte[] compatible with postgres byte[] and Java swing application
	 * @throws IOException
	 */
	public static byte[] convertFileToBinaryStream(MultipartFile file) throws IOException {
		InputStream inputStream = file.getInputStream();
		
		ByteArrayOutputStream buffer = new ByteArrayOutputStream();

		int nRead;
		byte[] data = new byte[16384];

		while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
		  buffer.write(data, 0, nRead);
		}

		return buffer.toByteArray();
	
	}
	
	
	public static List<HashMap<String, String>> getFolderFilesOnBase64(List<com.siapp.models.File> fileList, String folderPath){
		
		List<HashMap<String, String>> encodedFiles = new ArrayList<HashMap<String, String>>();
		HashMap<String, String> fileMap = null;
//		File fileFolder = new File(folderPath);
//		if(fileFolder != null) {
//			for(final File file: fileFolder.listFiles()) {
//				String encodeBase64 = null;
//				if(!file.isDirectory()) {
//					try {
//						String extension =  FilenameUtils.getExtension(file.getName().toLowerCase());
//						if(extension.equals("jpg") || extension.equals("png") || extension.equals("jpeg")) {
//							FileInputStream fileInputStream = new FileInputStream(file);
//							byte[] bytes = new byte[(int) file.length()];
//							fileInputStream.read(bytes);
//							encodeBase64 = Base64.getEncoder().encodeToString(bytes);
//							fileMap = new HashMap<>();
//							fileMap.put("src", "data:image/"+extension+";base64,"+encodeBase64);
//							encodedFiles.add(fileMap);
//							fileInputStream.close();
//						}
//					} catch (Exception e) {
//						throw new RuntimeException("An error ocurred while encoding the files");
//					}
//					
//				}
//			}
//		}
		encodedFiles = new ArrayList<HashMap<String, String>>();
		//TO CHANGE THIS
		for(com.siapp.models.File file: fileList) {
			File image = new File(folderPath+"/"+file.getPath());
			if(image.exists()) {
				String encodeBase64 = null;
				try {
					String extension =  FilenameUtils.getExtension(image.getName().toLowerCase());
					if(extension.equals("jpg") || extension.equals("png") || extension.equals("jpeg")) {
						FileInputStream fileInputStream = new FileInputStream(image);
						byte[] bytes = new byte[(int) image.length()];
						fileInputStream.read(bytes);
						encodeBase64 = Base64.getEncoder().encodeToString(bytes);
						fileMap = new HashMap<>();
						fileMap.put("description", file.getDescription());
						fileMap.put("therapist", file.getTherapist().getName());
						fileMap.put("createdAt", file.getCreatedAt().toString());
						fileMap.put("path", file.getPath());
						fileMap.put("src", "data:image/"+extension+";base64,"+encodeBase64);
						encodedFiles.add(fileMap);
						fileInputStream.close();
					}
				} catch (Exception e) {
					throw new RuntimeException("An error ocurred while encoding the files");
				}
			}
		}
		
		return encodedFiles;
	}

}
