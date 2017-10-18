package com.rrz.modules.sys.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

public class Test {

	public static void main(String[] args) throws IOException {
		File file = new File("D:\\a.log");
		InputStream input  = new FileInputStream(file);
		
		
		InputStreamReader reader = new InputStreamReader(System.in);
		
		OutputStream output  = new FileOutputStream("D:\\b.log");
		
		byte[] b = new byte[1024];
		while(input.read(b)!=-1){
			output.write(b);
		}
	}
}
