
package it.citel.postel.bancarizzazioneGUI.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

import org.apache.logging.log4j.LogManager;

public class IOUtility {
	
	static final org.apache.logging.log4j.Logger logger = LogManager.getLogger(IOUtility.class);
    
    public static long CopyFile(String pathIn, String pathOut) {
    	return CopyFile(pathIn, pathOut, 65000);
    }    
    public static long CopyFile(String pathIn, String pathOut, boolean keepOriginalDatetime) {    	
    	long res = CopyFile(pathIn, pathOut);
    	if(res > 0 && keepOriginalDatetime == true) {
    		File fin = new File(pathIn);
    		File fout = new File(pathOut);
    		if(fin != null && fout != null)
    			fout.setLastModified(fin.lastModified());
    		fin = fout = null;
    	}
    	return res;
    }    
    public static long CopyFile(String pathIn, String pathOut, int bufferSize) {
    	long result = 0;
    	File inputFile = new File(pathIn);
    	File outputFile = new File(pathOut);
    	InputStream in = null;
    	OutputStream out = null;
    	try {
    		in = new BufferedInputStream(new FileInputStream(inputFile));
    	 	out = new BufferedOutputStream( new FileOutputStream(outputFile));
    	 	byte[] buffer = new byte[bufferSize];
    	 	int bytes_letti = 0;
    	 	while((bytes_letti = in.read(buffer)) > 0) {
    	 		out.write(buffer, 0, bytes_letti);
    	 		result += bytes_letti; 
    	 	}
    		in.close();
    		in = null;
    		out.flush();
    	 	out.close();
    	 	out = null;
    	} catch(Exception e) {
            logger.error(e.getMessage());
    		result = -1;
        } finally {
    		try {
	        	if(out != null) {
        			out.close();
        			out = null;
	        	}
	        	if(in != null) {
        			in.close();
        			in = null;
	        	}
    		} catch(Exception e) {}
        }
    	return result;
    }
    
    public static int CreateFile(String pathOut) {
    	return CreateFile(pathOut, "");
    }
    public static int CreateFile(String pathOut, byte[] data) {
    	int res = 0;
    	try {
        	FileOutputStream fos = new FileOutputStream(pathOut);
        	fos.write(data);
        	fos.close();
    	} catch(IOException e) {
    		logger.error(e.getMessage());
    		res = -1;
    	}
    	return res;
    }
    public static int CreateFile(String pathOut, List<String> list, String lineSeparator) {
    	String[] arr = new String[list.size()];
    	return CreateFile(pathOut, list.toArray(arr), lineSeparator);
    }
    public static int CreateFile(String pathOut, List<String> list) {
    	String[] arr = new String[list.size()];
    	return CreateFile(pathOut, list.toArray(arr));
    }
    public static int CreateFile(String pathOut, String data) {
    	return CreateFile(pathOut, new String[] { data });
    }
    public static int CreateFile(String pathOut, String[] data) {
    	return CreateFile(pathOut, data, "\r\n");
    }
    public static int CreateFile(String pathOut, String[] data, String lineSeparator) {
    	int res = 0;
    	PrintWriter out = null;
    	try {    		
    		out = new PrintWriter(pathOut);
    		if(data != null && data.length > 0) {
    			for(int ct = 0; ct < data.length; ct++) {
    				if(data.length == 1 && data[0].length() == 0)
    					break;
        			out.print(data[ct] + lineSeparator);
    			}
    		}
    		out.flush();
    		out.close();    		
    		out = null;
        } catch(Exception e) {
            logger.error(e.getMessage());
            res = -1;
        } finally {
    		try {
	        	if(out != null) {
        			out.close();
        			out = null;
	        	}
    		} catch(Exception e) {}
        }
    	return res;
    }

    public static String ReadFile(String pathIn) {
    	String res = null;
    	StringBuilder text = new StringBuilder();
        Scanner scanner = null;
    	if(isFile(pathIn) == true) {
            try {
                scanner = new Scanner(new FileInputStream(pathIn));
            	while (scanner.hasNextLine()){
            		text.append(scanner.nextLine() +"\n");
            	}
            } catch(Exception e) {
                logger.error(e.getMessage());
            } finally{
            	if(scanner != null) {
            		scanner.close();
                    res = text.toString();
            	}
            }    	    		
    	}
    	return res;
    }
    
    public static String ReadFile(InputStream is) {
    	String res = "";
    	try {
    		if(is != null) {
        		BufferedReader br = new BufferedReader(new InputStreamReader(is));
        	    StringBuilder sb = new StringBuilder();
        	    int nextchar;
        	    while ((nextchar = br.read()) != -1)
        	       sb.append((char)nextchar);
        	    res = sb.toString();
    		}
    	} catch(Exception e) {
    		logger.error(e);
    	}
    	return res;
    }
    
    public static String[] ReadFileArray(String pathIn) {
    	String[] res = null;
    	String buf = ReadFile(pathIn);
    	if(buf != null)
    		res = buf.split("\n");
    	return res;
    }
    
//    public static String[] ReadFileEx(String pathIn) {
//    	String[] res = null;
//    	String line;    	
//		BufferedReader fin = null;
//		String charset = null;
//		List<String> lines = new ArrayList<String>();
//		
//    	try {
//    		
//	    	try {    	
//	    		charset = CharsetDetector.getCharset(pathIn);
//	    	} catch (IOException ioe) {}
//	    	
//	    	if(charset != null)
//			    fin = new BufferedReader(new InputStreamReader(new FileInputStream(pathIn), charset));
//	    	else
//			    fin = new BufferedReader(new InputStreamReader(new FileInputStream(pathIn)));
//
//			while((line = fin.readLine()) != null) {
//				lines.add(line);
//			}
//			
//			res = new String[lines.size()];
//			res = lines.toArray(res);
//			
//    	} catch (Exception e) {
//    		
//            logger.error(e.getMessage());
//    		res = null;
//    		
//    	} finally {
//
//			try {
//				if(fin != null) {
//					fin.close();
//					fin = null;
//				}
//			} catch(Exception e) {}
//
//    	}
//				
//    	return res;
//    }

//    public static List<String> ReadFileIntoList(String pathIn) {
//    	List<String> res = new ArrayList<String>();
//    	String line;    	
//		BufferedReader fin = null;
//		String charset = null;
//		
//    	try {
//    		
//	    	try {    	
//	    		charset = CharsetDetector.getCharset(pathIn);
//	    	} catch (IOException ioe) {}
//	    	
//	    	if(charset != null)
//			    fin = new BufferedReader(new InputStreamReader(new FileInputStream(pathIn), charset));
//	    	else
//			    fin = new BufferedReader(new InputStreamReader(new FileInputStream(pathIn)));
//
//			while((line = fin.readLine()) != null) {
//				res.add(line);
//			}
//			
//    	} catch (Exception e) {
//    		
//            logger.error(e.getMessage());
//    		res = null;
//    		
//    	} finally {
//
//			try {
//				if(fin != null) {
//					fin.close();
//					fin = null;
//				}
//			} catch(Exception e) {}
//
//    	}
//				
//    	return res;
//    }

    public static int unlink(String filePath) {
    	int res = -1;
    	File f = new File(filePath);
    	if(f != null) {
    		boolean bres = f.delete();
    		if(bres == true)
    			res = 0;
    	}
    	return res;
    }
    
    public static void deltree(String folder) {
    	deleteDir(new File(folder));
    }
    
    public static void deleteDir(File dir) {
        if (dir.isDirectory()) {
            String[] children = dir.list();
            for (int i=0; i<children.length; i++) {
                deleteDir(new File(dir, children[i]));
            }
        }
        // The directory is now empty so delete it
        dir.delete();
    }
    
    public static int makedir(String folder) {
    	return makedir(folder, false);
    }
    public static int makedir(String folder, boolean all) {
    	int res = -1;
    	File f = new File(folder);
   		if(f != null && all == false && f.mkdir() == true)
   			res = 0;
   		if(f != null && all == true && f.mkdirs() == true)
   			res = 0;
    	return res;
    }
    
    public static int rmdir(String folder) {
    	int res = -1;
    	File f = new File(folder);
    	if(f != null && f.delete() == true) {
    		res = 0;    			
    	}
    	return res;
    }
    
    public static int move(String inPath, String outPath) {
    	int res = -1;
    	long lw = CopyFile(inPath, outPath);
    	if(lw >= 0) {
    		res = unlink(inPath);
    		if(res < 0)
        		unlink(outPath);
    	}
    	return res;
    }
    
    public static int rename(String inPath, String outPath) {
    	int res = -1;
    	File fin = new File(inPath);
    	File fout = new File(outPath);
    	if(fin != null && fout != null) {
    		boolean bres = fin.renameTo(fout);
    		if(bres == true)
    			res = 0;
    	}
    	return res;
    }
    
    public static String getFileName(String filePath) {
    	String res = filePath;
    	File f = new File(filePath);
    	if(f != null) {
    		res = f.getName();
    	}
    	return res;
    }
    
    public static long getFileLength(String filePath) {
    	long res = -1;
    	File f = new File(filePath);
    	if(f != null) {
    		res = f.length();
    	}
    	return res;
    }

    public static long getFileTime(String filePath) {
    	long res = -1;
    	File f = new File(filePath);
    	if(f != null) {
    		res = f.lastModified();
    	}
    	return res;
    }
    
    public static boolean isDirectory(String path) {
    	boolean res = false;
    	File f = new File(path);
    	if(f != null) {
    		res = f.isDirectory();
    	}
    	return res;
    }
    
    public static boolean isFile(String path) {
    	boolean res = false;
    	File f = new File(path);
    	if(f != null) {
    		res = f.isFile();
    	}
    	return res;
    }
    
    public static String removeSuffix(String filePath) {
    	String res = filePath;
    	int idx = filePath.lastIndexOf(".");
    	if(idx >= 0) {
    		res = filePath.substring(0, idx);
    	}
    	return res;
    }

    private static double convertByte(long val, String format) {
    	int BASE = 1024;
    	double res = val;
    	if(format.equalsIgnoreCase("KB") == true)
    		res /= Math.pow(BASE, 1); 
    	if(format.equalsIgnoreCase("MB") == true)
    		res /= Math.pow(BASE, 2); 
    	if(format.equalsIgnoreCase("GB") == true)
    		res /= Math.pow(BASE, 3);
    	if(format.equalsIgnoreCase("TB") == true)
    		res /= Math.pow(BASE, 4);
    	/* trunc 2 decimal point */
    	return (double)((int)(res*100))/100;  
    }
    
    public static double getDiskFreeSpace(String filePath, String format) {
    	double res = 0;
		File f = new File(filePath);
    	if(f != null) 
    		res = convertByte(f.getFreeSpace(), format);
    	return res;
    }
    
    public static double getDiskFreeSpace(String filePath) {
    	return getDiskFreeSpace(filePath, "");
    }
    
    public static double getDiskTotalSpace(String filePath, String format) {
    	double res = 0;
		File f = new File(filePath);
    	if(f != null) 
    		res = convertByte(f.getTotalSpace(), format);
    	return res;
    }
    
    public static double getDiskTotalSpace(String filePath) {
    	return getDiskTotalSpace(filePath, "");
    }
    
    public static String getCanonicalPath(String filePath) {
    	String res = filePath;
		File f = new File(filePath);
    	if(f != null) 
    		try {
    			res = f.getCanonicalPath();
    		} catch(IOException ioe) {}
    	return res;
    }

    public static String getFolderName(String filePath) {
    	String res = "";
    	int idx = filePath.lastIndexOf("/");
    	int idx1 = filePath.lastIndexOf("\\");
    	if(idx1 > idx && idx1 >= 0)
    		idx = idx1;
    	if(idx >= 0)
    		res = filePath.substring(0, idx);
    	return res;
    }
    
    public static long getLastRefreshFSObject(String fsObject) {
    	long res = -1;
		long lnow = new Date().getTime();		
		long lfile = IOUtility.getFileTime(fsObject);
		if(lfile > 0)
			res = (lnow - lfile) / 1000;
    	return res;
    }

//    public static String getTempPath() {
//    	return getTempPath("");
//    }

//    public static String getTempPath(String name) {
//    	String tempFolder = System.getProperty("java.io.tmpdir");
//    	if(tempFolder.endsWith("/") == false && tempFolder.endsWith("\\") == false)
//    		tempFolder = tempFolder.concat(Costanti.FS_SEPARATOR);
//    	if(name != null && name.length() > 0) {
//    		tempFolder = tempFolder.concat(name);
//    	}
//    	File f = new File(tempFolder);
//    	if(f.exists() == false)
//    		f.mkdirs();
//    	if(tempFolder.endsWith("/") == true || tempFolder.endsWith("\\") == true)
//    		tempFolder = tempFolder.substring(0, tempFolder.length()-1);
//    	return tempFolder;
//    }

//    public static String getTempFile(String prefix, String suffix, String extension) {
//    	return getTempFile("", prefix, suffix, extension);
//    }
    
//    public static String getTempFile(String tmpFolder, String prefix, String suffix, String extension) {
//    	String ext = extension;
//    	String tempFile = getTempPath(tmpFolder) + Costanti.FS_SEPARATOR + prefix + Utility.getRandomString("0123456789abcdef", 12) + suffix;
//    	if(extension == null)
//    		ext = "";
//    	if(ext.length() > 0 && ext.startsWith(".") == false)  
//    		tempFile += ".";
//    	tempFile += ext;
//    	return tempFile;
//    }

    public static String skipFileExt(String fileName) {
    	String res = fileName;
    	int lastIndex = fileName.lastIndexOf(".");
    	if(lastIndex >= 0)
    		res = fileName.substring(0, lastIndex);
    	return res;
    }

    /*
    public static String normalizePath(String path) {
    	String res = path;
    	if(path == null)
    		res = "";
    	String sep1, sep2;
    	if(File.separator.equals("\\") == true) {
    		// windows 
    		sep1 = "/";
    		sep2 = "\\";
    	} else {
    		// unix / linux 
    		sep1 = "\\";
    		sep2 = "/";
    	}
    	res = res.replace(sep1, sep2);		
    	return res;
    }
     */
    
	public static byte[] getBytes(String filePath) {
		byte[] res = null;
    	File f = new File(filePath);
    	InputStream finput = null;
    	
		try {
			long size = f.length();
			if(size > 0) {
	    	 	byte[] buffer = new byte[(int)size];
	    		finput = new BufferedInputStream(new FileInputStream(filePath));
	    	 	finput.read(buffer);
	    		finput.close();	
	    		res = buffer;
			}
		} catch(Exception e) {			
		}
		return res;
	}

	public static int touch(String file) {
		return touch(file, (new Date()).getTime());
	}
	public static int touch(String file, long ltime) {
		int res = -1;
		File f = new File(file);
		if(f.isFile()) {
			if(f.setLastModified(ltime) == true)
				res = 0;
		}
		return res;
	}
	
	/* 24/08/2015 : Roberto A. added */
    public static boolean isFileExists(String path, String file) {
    	boolean res = false;
    	String pathCheck = path;
    	if(pathCheck.endsWith("/") == false && pathCheck.endsWith("\\") == false)
    		pathCheck = pathCheck + File.separator;
    	pathCheck += file;
    	res = isFile(pathCheck); 
    	return res;
    }
	/* 24/08/2015 : Roberto A. added */
    
	public static void main(String[] args) throws SQLException {
		//System.out.println(normalizePath("\\\\192.168.3.152\\shared/folder1/hello.java"));
		//System.out.println(normalizePath("\\\\192.168.3.152\\shared\\folder1\\hello.java"));
		
	    //int res = CreateFile("C:\\Windows\\Temp\\lyra\\CreateFile.txt", "uno-due-tre".split("-"), "\r\n");
	    int res = CreateFile("C:\\Windows\\Temp\\lyra\\CreateFile.txt");
		System.out.println(res);
		
		/*
		long res = CopyFile("F:/dev/dematerializzazione/messi_2013/supporto/albanesi/data.rar", "C:/windows/temp/lyra/data.rar", true);
		System.out.println(res);
		
		int rc;
		String file = "F:/Query.txt";
		rc = touch(file);
		System.out.println(rc);
		rc = touch(file, ((new Date()).getTime() - 3600*1000));
		System.out.println(rc);
		
		byte[] res = getBytes("C:/autoexec.bat");
		if(res != null)
			System.out.println(res.length);
		
		int rc1 = move("C:/Windows/Temp/dvd/zerobyte.txt", "C:/Windows/Temp/dvd/zerobyte.out");
		System.out.println(rc1);
		
		int rc2 = move("C:/Windows/Temp/dvd/longbyte.txt", "C:/Windows/Temp/dvd/longbyte.out");
		System.out.println(rc2);
		*/
		
		System.exit(0);
	}

    
    
}
