package com.oxygenaccelerator.pudsey;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class whackacake extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        
        final Button donate_button = (Button) findViewById(R.id.button_donate);
        donate_button.setOnClickListener(new View.OnClickListener() {
        	

			@Override
			public void onClick(View v) {
				Intent i = new Intent("com.oxygenaccelerator.pudsey.DONATE");
				startActivity(i);
	        }
				
			});
        
        
        
        final Button game_button = (Button) findViewById(R.id.button_playgame);
        game_button.setOnClickListener(new View.OnClickListener() {
        	

			@Override
			public void onClick(View v) {
				
//				String packageName = "com.android.browser";  
//			    String className = "com.android.browser.BrowserActivity"; 
//				
//			    
//				Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://whackacake.com/game.html"));
//				browserIntent.addCategory(Intent.CATEGORY_LAUNCHER);
//				browserIntent.setClassName(packageName, className);
//				
//				startActivity(browserIntent);
//				
				Intent i = new Intent("com.oxygenaccelerator.pudsey.GAME");
				startActivity(i);
	        }
				
			});
        
        
    }
}