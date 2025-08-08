package it.postel.bancarizzazioneGUI.util.constants;


public enum MimeTypeEnum {
	
	MIME_PDF, MIME_DOC, MIME_DOCX, MIME_XLS, MIME_XLSX, MIME_PPT, MIME_PPTX, MIME_BMP, MIME_JPG, MIME_JPEG, MIME_TIFF, MIME_TIF, MIME_TXT, MIME_DEFAULT;
	 
	public String getAuthority() {
        return name();
    }
}
