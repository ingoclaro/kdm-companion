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
SENTRY_AUTH_TOKEN=xxx expo-cli publish
```

Note that apps in the internal test and beta channels are going to get the update automatically.

---

To upload the version to the `production` build, execute the following command:

```
SENTRY_AUTH_TOKEN=xxx expo-cli publish --release-channel production
```

This will distribute the update to the production app automatically.

SENTRY_AUTH_TOKEN should be taken from the following url: https://sentry.io/settings/account/api/auth-tokens/

### Android app

Create new package:

```
expo-cli build:android
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
expo-cli build:android --release-channel production
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

export env variables:

```
export ANDROID_KEYSTORE_PATH=../kdm-companion.jks
export ANDROID_KEYSTORE_PASSWORD=$storePassword
export ANDROID_KEY_ALIAS=$keyAlias
export ANDROID_KEY_PASSWORD=$keyPassword
export ANDROID_NDK_HOME="/usr/local/share/android-ndk"
```

In `android/app/build.gradle` check that `versionCode` and `versionName` match app.json.

Note that `versionCode` with **odd** numbers are for internal release, and the ones with **even** numbers are intended for production release. The only difference is the release-channel they have. Internal release uses **default** and the production release uses **production**.

```
cd android
./gradlew bundleRelease
```

The apk is in `android/app/build/outputs/bundle/release/app.aab`, upload it to the play store.

**NOTE**: this apk points to the default release channel of expo, which I'm using for development purposes, a different apk should be build to submit to the production release in the play store.

To make the final production build you need to edit `android/app/src/main/java/host/exp/exponent/generated/AppConstants.java` and change RELEASE_CHANNEL from `default` to `production`.

### iOS app

iOS needs a yearly developer license to publish apps to their app store. If you would like
to have this app on iOS please [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=DZNFFEH9A9B4W&lc=US&item_number=kdm%2dcompanion&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)
so that I can acquire and keep the developer's license. Anything helps, ideally do a monthly donation if you can.

### Detached branch

To create the detached branch I followed these steps:

- brew cask install android-sdk android-ndk
- yarn eject
- npx expo-cli prepare-detached-build
- react-native link react-native-iap

Check manual setup instructions of react-native-iap project and make sure everything was correctly applied (for me the BILLING permission wasn't added)

edit `android/app/src/main/AndroidManifest.xml` and add:

```
<uses-permission android:name="com.android.vending.BILLING" />
```

edit `android/app/build.gradle` and change this line to add 64 bit support:

```
ndk {
    abiFilters "armeabi-v7a", "x86", "arm64-v8a", "x86_64"
}
```

## Making copies

If you want to build your own software based off of my code, please make it meaningfully
different rather than just a clone, better yet, consider contributing to this app to improve it!
