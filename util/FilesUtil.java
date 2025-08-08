package it.postel.bancarizzazioneGUI.util;

import java.io.File;
import java.util.Date;
import java.util.logging.LoggingMXBean;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class FilesUtil {
	
	static final Logger log = LogManager.getLogger(FilesUtil.class);
	
	public static void removeOldFiles(String path) {
        File folder = new File(path);
        File[] listOfFiles = folder.listFiles();
        for (int i = 0; i < listOfFiles.length; i++) {
               if (listOfFiles[i].isFile()) {
                      File f = listOfFiles[i];
                      long diff = new Date().getTime() - f.lastModified();
                      // Più vecchi di un giorno
                      if ((diff > 1 * 24 * 60 * 60 * 1000) && f.getName().endsWith(".pdf")) {
                             if (!f.delete()) {
                                   log.error("Impossibile cancellare il file: " + f.getAbsolutePath());
                             }
                      }
               }
        }
  }


}
