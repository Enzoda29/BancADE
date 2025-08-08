package it.citel.postel.bancarizzazioneGUI.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.krysalis.barcode4j.impl.AbstractBarcodeBean;
import org.krysalis.barcode4j.impl.codabar.CodabarBean;
import org.krysalis.barcode4j.impl.code128.Code128Bean;
import org.krysalis.barcode4j.impl.code39.Code39Bean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;
import org.krysalis.barcode4j.tools.UnitConv;



public class BarcodeUtility {
    private static final Logger log = LogManager.getLogger(BarcodeUtility.class);
	public static final short BAR_CODE_39 = 1;
	public static final short BAR_CODE_128 = 2;
	public static final short BAR_CODE_BAR = 3;
	private Properties prop;
	private short code_type;
	private int resolution;
	private double height;
	private double module_width;
	private double wide_factor;
	private String temp_dir;
	private double font_size;

	public BarcodeUtility() {
		_init();
	}

	public BarcodeUtility(String xmlConfigFile) throws Exception {
		_init();
		try {
			loadConfig(xmlConfigFile);
		} catch (Exception e) {
			throw new Exception("Configuration error on file " + xmlConfigFile);
		}
	}

	public BarcodeUtility(String params, String tempPath) throws Exception {
		String param = "";
		_init();

		param = getParam(params, Costanti.BARCODE_CODE_TYPE);
		if (param != null) {
			this.code_type = Short.parseShort(param);
		}
		param = getParam(params, Costanti.BARCODE_RESOLUTION);
		if (param != null) {
			this.resolution = Integer.parseInt(param);
		}
		param = getParam(params, Costanti.BARCODE_FONT_SIZE);
		if (param != null) {
			this.font_size = Double.parseDouble(param);
		}
		param = getParam(params, Costanti.BARCODE_MODULE_WIDTH);
		if (param != null) {
			this.module_width = Double.parseDouble(param);
		}
		param = getParam(params, Costanti.BARCODE_HEIGHT);
		if (param != null) {
			this.height = Double.parseDouble(param);
		}
		param = getParam(params, Costanti.BARCODE_WIDE_FACTOR);
		if (param != null) {
			this.wide_factor = Double.parseDouble(param);
		}
		if (tempPath.length() > 0) {
			this.temp_dir = tempPath;
		}
	}

	private void _init() {
		this.code_type = 1;
		this.resolution = 300;
		this.height = 10.0D;
		this.font_size = 5.0D;
		this.module_width = 4.0D;
		this.wide_factor = 3.0D;
		this.temp_dir = "/";
	}

	public int loadConfig(String xmlConfigFile) throws IOException {
		int rc = -1;

		this.prop = new Properties();

		InputStream is = null;
		try {
			is = getClass().getResourceAsStream(xmlConfigFile);
			if (is == null) {
				rc = -2;
			} else {
				this.prop.loadFromXML(is);
				this.code_type = Short.parseShort(this.prop.getProperty(Costanti.BARCODE_CODE_TYPE));
				this.resolution = Integer.parseInt(this.prop.getProperty(Costanti.BARCODE_RESOLUTION));
				this.height = Double.parseDouble(this.prop.getProperty(Costanti.BARCODE_HEIGHT));
				this.font_size = Double.parseDouble(this.prop.getProperty(Costanti.BARCODE_FONT_SIZE));
				this.module_width = Double.parseDouble(this.prop.getProperty(Costanti.BARCODE_MODULE_WIDTH));
				this.wide_factor = Double.parseDouble(this.prop.getProperty(Costanti.BARCODE_WIDE_FACTOR));
				this.temp_dir = this.prop.getProperty(Costanti.BARCODE_TEMP_DIR);
				log.info("Configuration file " + xmlConfigFile + " loaded");
				rc = 0;
			}
		} catch (IOException ioe) {
			log.error("IOException: " + ioe.toString());
			rc = -2;
		} catch (Exception e) {
			log.error("Exception: " + e.toString());
			rc = -4;
		} finally {
			if (is != null) {
				is.close();
			}
		}
		return rc;
	}

	public String getBarcodeFile(String text) {
		String res = null;
		String PathBarcode = this.temp_dir;
		String RandomString = getRandomString();

		log.info("Creating barcode text : " + text);
		if ((!PathBarcode.endsWith("/")) && (!PathBarcode.endsWith("\\"))) {
			PathBarcode = PathBarcode.concat("/");
		}
		PathBarcode = PathBarcode.concat(RandomString) + ".bmp";

		log.info("Assigned barcode file : " + PathBarcode);
		AbstractBarcodeBean bean = null;
		switch (this.code_type) {
		case 2:
			bean = new Code128Bean();
			break;
		case 3:
			bean = new CodabarBean();
			setWideFactor((CodabarBean) bean, this.wide_factor);
			break;
		default:
			bean = new Code39Bean();
			setWideFactor((Code39Bean) bean, this.wide_factor);
		}
		bean.setFontSize(this.font_size);
		bean.setHeight(this.height);
		bean.setModuleWidth(UnitConv.in2mm(this.module_width / this.resolution));

		bean.doQuietZone(false);
		try {
			log.info("Creating barcode file : " + PathBarcode);
			File outputFile = new File(PathBarcode);
			OutputStream out = new FileOutputStream(outputFile);
			try {
				BitmapCanvasProvider canvas = new BitmapCanvasProvider(out, "image/bmp", this.resolution, 12, false, 0);

				bean.generateBarcode(canvas, text);

				canvas.finish();

				res = PathBarcode;
				log.info("res = " + res);
			} catch (Exception e) {
				log.error("Exception: " + e.toString());
			} finally {
				log.info("Closing barcode file : " + PathBarcode);

				out.close();
			}

		} catch (IOException ioe) {
			log.error("Exception: " + ioe.toString());
		}
		return res;
	}

	public ByteArrayOutputStream getBarcodeStream(String text) {
		ByteArrayOutputStream res = null;

		AbstractBarcodeBean bean = null;
		switch (this.code_type) {
		case 2:
			bean = new Code128Bean();
			break;
		case 3:
			bean = new CodabarBean();
			setWideFactor((CodabarBean) bean, this.wide_factor);
			break;
		default:
			bean = new Code39Bean();
			setWideFactor((Code39Bean) bean, this.wide_factor);
		}
		bean.setFontSize(this.font_size);
		bean.setHeight(this.height);
		bean.setModuleWidth(UnitConv.in2mm(this.module_width / this.resolution));

		bean.doQuietZone(false);
		try {
			log.info("Creating barcode stream  ");
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			try {
				BitmapCanvasProvider canvas = new BitmapCanvasProvider(out, "image/bmp", this.resolution, 12, false, 0);

				bean.generateBarcode(canvas, text);

				canvas.finish();

			} catch (Exception e) {
				log.error("Exception: " + e.toString());
			} finally {
				log.info("Closing barcode stream " );

				out.close();
				res=out;
			}

		} catch (IOException ioe) {
			log.error("Exception: " + ioe.toString());
		}
		return res;
	}

	
	public static String getRandomString() {
		String res = UUID.randomUUID().toString();
		res = res.replace("-", "");
		return res;
	}

	public short getCode() {
		return this.code_type;
	}

	public void setCode(short val) {
		this.code_type = val;
	}

	public String getTempPath() {
		return this.temp_dir;
	}

	private void setWideFactor(Code39Bean bean, double wide_factor) {
		bean.setWideFactor(wide_factor);
	}

	private void setWideFactor(CodabarBean bean, double wide_factor) {
		bean.setWideFactor(wide_factor);
	}

	private String getParam(String line, String key) {
		String res = null;
		String[] as = line.split(" ");
		for (int i = 0; i < as.length; i++) {
			if (as[i].startsWith(key + ":")) {
				res = as[i].replaceFirst(key + ":", "");
				break;
			}
		}
		return res;
	}
}