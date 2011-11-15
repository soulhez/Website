package com.oxygenaccelerator.pudsey;

import android.app.Activity;
import android.media.MediaPlayer;
import android.util.Log;

/*
 * Class for playing music across activities. R.Jeffries
 */
public class MusicPlayer {
	private static final String TAG = "MusicPlayer";

	private static MediaPlayer mp;
	private final static int music = R.raw.whackacake;
	private static float pct = 5.0f;

	public static void start(Activity context) {
		/*
		if (Preferences.getMusicMuted(context)) {
			try {
				if (mp != null) {
					mp.stop();
					mp.release();
					mp = null;
				}

			} catch (IllegalStateException ise) {
				Log.d(TAG, "Whoops:" + ise);
				if (mp != null) {
					mp = null;
				}
			}
			//release();
			return;
		}
*/
		Log.e(TAG, "start called");
		if (mp == null) {
			mp = MediaPlayer.create(context, music);
			if (mp == null) {
				Log.e(TAG, "musciplayer was not created successfully");
			} else {
				try {
					mp.setLooping(false);
//					pct = Preferences.getMusicVolume(context);
				} catch (Exception e) {
					Log.e(TAG, e.getMessage(), e);
				}
			}
		}

		if (!mp.isPlaying()) {
//			pct = Preferences.getMusicVolume(context);
			Log.i(TAG, "Setting music at: " + pct);
			mp.setVolume(pct, pct);
			mp.start();
		}

	}

	public static void pause() {
		try {
			Log.d(TAG, "pause called");
			if (mp != null) {
				if (mp.isPlaying()) {
					mp.pause();
				}
			}
		} catch (IllegalStateException ise) {
			Log.e(TAG, "Whoops:" + ise);
			if (mp != null) {
				mp = null;
			}
		}
	}

	public static void resume() {
		try {
			Log.d(TAG, "resume called");
			if (mp != null) {
				if (mp.isPlaying()) {
					// ????? what are we doing here ???
				} else {
					mp.start();
				}
			}
		} catch (IllegalStateException ise) {
			Log.e(TAG, "Whoops:" + ise);
			if (mp != null) {
				mp = null;
			}
		}
	}


	public static void release() {

		Log.d(TAG, "release called");

		if (mp != null)
			mp.release();
	}

}
