package io.github.yourname.downresource;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.File;

public class Downresource extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("fetchFromURL")) {
            String urlString = args.getString(0);
            String filePath = args.getString(1);
            this.download(urlString, filePath, callbackContext);
            return true;
        }
        return false;
    }

    private void download(final String urlString, final String filePath, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    URL url = new URL(urlString);
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.connect();

                    // 创建父目录
                    File file = new File(filePath);
                    File parentDir = file.getParentFile();
                    if (parentDir != null && !parentDir.exists()) {
                        parentDir.mkdirs();
                    }

                    InputStream input = new BufferedInputStream(url.openStream());
                    FileOutputStream output = new FileOutputStream(filePath);

                    byte[] data = new byte[1024];
                    int count;
                    while ((count = input.read(data)) != -1) {
                        output.write(data, 0, count);
                    }

                    output.flush();
                    output.close();
                    input.close();

                    callbackContext.success("File downloaded to: " + filePath);
                } catch (Exception e) {
                    callbackContext.error("Download failed: " + e.getMessage());
                }
            }
        });
    }
}
