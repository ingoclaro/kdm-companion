# Kingdom Death: Monster Companion

This app streamlines playing [Kingdom Death: Monster](http://kingdomdeath.com/) board game.

## Developer Setup

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

You can see some common tasks and commands [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

It also uses [Expo](https://docs.expo.io).

A quick start:

```
yarn install
yarn start
```

## Publishing

Usually you can just publish to Expo and clients will get the latest version when they reload the app.
If you do any changes to `app.json` or if you upgrade the Expo SDK you need to deploy a new version to the app store.

To upload new version to Expo:

```
exp publish
```

Note that apps in the internal test and beta channels are going to get the update automatically.

---

To upload the version to the `production` build, execute the following command:

```
exp publish --release-channel production
```

This will distribute the update to the production app automatically.

### Android app

Create new package:

```
exp build:android
```

After the build has finished, download the signed package, you can install it in your phone locally with:

```
adb install -r kdm-companion-signed.apk
```

or you can drag it to the simulator.

To submit to the store go [here](https://play.google.com/apps/publish/) and upload the apk to the internal test channel.
After trying it out you can promote it to the beta channel.

To build the apk for production execute:

```
exp build:android --release-channel production
```

#### in-app purchases

The steps above work for a standard expo app, but in this one, since it has in app purchases and expo doesn't support that yet, the app binary is detached.

To build the apk follow these steps (see bottom with steps to create detached branch):

switch to `detached` branch.

To verify the app in development mode:

```
expo-cli publish
expo-cli start

# in a new window:
cd android
./gradlew installDevMinSdkDevKernelDebug
```

If you have the emulator open, this should copy the apk to the emulator automatically. This build step also should point the bundle url to your local dev server (exp start), so you can edit js files as usual.

To create apk to submit to play store:

```
expo-cli publish
expo-cli fetch:android:keystore
```

Replace data

```
keyAlias 'XXX'
keyPassword 'XXX'
storePassword 'XXX'
```

in `android/app/build.gradle` with the stuff shown in the `exp fetch:android:keystore` command.
dunno if storeFile can be a relative path, I just tried with an absolute one.

```
cd android
./gradlew assembleRelease
```

The apk is in `andoid/app/build/outputs/apk/prodMinSdkProdKernel/release/app-prodMinSdk-prodKernel-release.apk`, upload it to the play store.

**NOTE**: this apk points to the default release channel of expo, which I'm using for development purposes, a different apk should be build to submit to the production release in the play store.

TODO: see how to create apk that uses the production release channel of expo.

### iOS app

iOS needs a yearly developer license to publish apps to their app store. If you would like
to have this app on iOS please [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=DZNFFEH9A9B4W&lc=US&item_number=kdm%2dcompanion&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)
so that I can acquire and keep the developer's license. Anything helps, ideally do a monthly donation if you can.

### Detached branch

To create the detached branch I followed these steps:

- exp detach
- exp prepare-detached-build
- react-native link react-native-iap

Check manual setup instructions of react-native-iap project and make sure everything was correctly applied.

edit `android/app/build.gradle` and configure for auto signing:

```
diff --git a/android/app/build.gradle b/android/app/build.gradle
index 3fbefe9..0e88d38 100644
--- a/android/app/build.gradle
+++ b/android/app/build.gradle
@@ -58,6 +58,17 @@ android {
       minSdkVersion 19
     }
   }
+  signingConfigs {
+    debug {
+      storeFile file('../debug.keystore')
+    }
+    release {
+      keyAlias 'XXX'
+      keyPassword 'XXX'
+      storePassword 'XXX'
+      storeFile file('../../kdm-companion.jks')
+    }
+  }
   buildTypes {
     debug {
       debuggable true
@@ -67,11 +78,7 @@ android {
       /*minifyEnabled true
       proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'*/
       zipAlignEnabled true
-    }
-  }
-  signingConfigs {
-    debug {
-      storeFile file('../debug.keystore')
+      signingConfig signingConfigs.release
     }
   }
   lintOptions {

diff --git a/android/gradle.properties b/android/gradle.properties
index 509ba88..999381c 100644
--- a/android/gradle.properties
+++ b/android/gradle.properties
@@ -2,4 +2,4 @@ android.useDeprecatedNdk=true
 org.gradle.parallel=true
 org.gradle.daemon=true
 org.gradle.jvmargs=-Xmx9216M -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
-org.gradle.configureondemand=true
+# org.gradle.configureondemand=true
```

## Making copies

If you want to build your own software based off of my code, please make it meaningfully
different rather than just a clone, better yet, consider contributing to this app to improve it!
