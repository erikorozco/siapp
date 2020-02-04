package com.siapp.utilities;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

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

}
