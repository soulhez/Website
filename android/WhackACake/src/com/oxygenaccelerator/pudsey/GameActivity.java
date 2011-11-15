package com.oxygenaccelerator.pudsey;

import java.io.File;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;



public class GameActivity  extends Activity{
	
	private static final String LOG_TAG = "GameActivity";
	
	 @Override
	    public void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        
	        requestWindowFeature(Window.FEATURE_NO_TITLE);
	        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, 
	                                WindowManager.LayoutParams.FLAG_FULLSCREEN);
	        
	        setContentView(R.layout.game);
	            
	        
	        final WebView webview = (WebView) findViewById(R.id.webview);
	        
	        WebSettings ws = webview.getSettings();
	        
	        ws.setJavaScriptEnabled(true);
	        ws.setSupportZoom(true);
	        ws.setBuiltInZoomControls(true);
	        ws.setDefaultZoom(WebSettings.ZoomDensity.FAR);
	   //     ws.setLoadWithOverviewMode(true);
	        ws.setUseWideViewPort(true);
	        
	        webview.setWebChromeClient(new MyWebChromeClient());
	        
	        /* WebViewClient must be set BEFORE calling loadUrl! */  
	        webview.setWebViewClient(new WebViewClient() {  
	            @Override  
	            public void onPageFinished(WebView view, String url)  
	            {  
	                webview.loadUrl("javascript:(function() { " +  
	                        "whackacake.init(); " +  
	                		"whackacake.start(); " +  
	                        "})()");  
	            }  
	        });  
	        
	        
	        
	        
	        webview.loadUrl("file:///android_asset/game.html");
	        
	               
	 }
	 
	 final class MyWebChromeClient extends WebChromeClient {
	        public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
	            Log.d(LOG_TAG, message);
	            result.confirm();
	            return true;
	        }
	    }
	 
	 
	 

}
