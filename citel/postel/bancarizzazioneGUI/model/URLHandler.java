package it.citel.postel.bancarizzazioneGUI.model;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLStreamHandler;

public class URLHandler extends URLStreamHandler {
	/** The classloader to find resources from. */
    private final ClassLoader classLoader;

    public URLHandler() {
        this.classLoader = getClass().getClassLoader();
    }

    public URLHandler(ClassLoader classLoader) {
        this.classLoader = classLoader;
    }

    @Override
    protected URLConnection openConnection(URL u) throws IOException {
        final URL resourceUrl = classLoader.getResource(u.getPath());
        return resourceUrl.openConnection();
    }
}
