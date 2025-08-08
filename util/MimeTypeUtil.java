package it.postel.bancarizzazioneGUI.util;

import it.postel.bancarizzazioneGUI.util.constants.FormatConstants;
import it.postel.bancarizzazioneGUI.util.constants.MymeTypeCostants;

public class MimeTypeUtil {

	public static String getMimeType(String format) {
		String mimeType = "";
		switch (format) {
			case FormatConstants.PDF:
				mimeType = MymeTypeCostants.MIME_PDF;
				break;
			case FormatConstants.DOC:
				mimeType = MymeTypeCostants.MIME_DOC;
				break;
			case FormatConstants.DOCX:
				mimeType = MymeTypeCostants.MIME_DOCX;
				break;
			case FormatConstants.XLS:
				mimeType = MymeTypeCostants.MIME_XLS;
				break;
			case FormatConstants.XLSX:
				mimeType = MymeTypeCostants.MIME_XLSX;
				break;
			case FormatConstants.PPT:
				mimeType = MymeTypeCostants.MIME_PPT;
				break;
			case FormatConstants.PPTX:
				mimeType = MymeTypeCostants.MIME_PPTX;
				break;
			case FormatConstants.BMP:
				mimeType = MymeTypeCostants.MIME_BMP;
				break;
			case FormatConstants.JPG:
				mimeType = MymeTypeCostants.MIME_JPG;
				break;
			case FormatConstants.JPEG:
				mimeType = MymeTypeCostants.MIME_JPEG;
				break;
			case FormatConstants.TIFF:
				mimeType = MymeTypeCostants.MIME_TIFF;
				break;
			case FormatConstants.TIF:
				mimeType = MymeTypeCostants.MIME_TIF;
				break;
			case FormatConstants.TEXT:
				mimeType = MymeTypeCostants.MIME_TXT;
				break;
		}
		return mimeType;
	}

}
