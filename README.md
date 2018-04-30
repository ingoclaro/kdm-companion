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

### Android app

Create new package:

```
exp build:android
```

After the build has finished, download the signed package, you can install it in your phone locally with:

```
adb install -r kdm-companion-signed.apk
```

TODO: submit to store steps.

### iOS app

iOS needs a yearly developer license to publish apps to their app store. If you would like
to have this app on iOS please [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=DZNFFEH9A9B4W&lc=US&item_number=kdm%2dcompanion&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)
so that I can acquire and keep the developer's license. Anything helps, ideally do a monthly donation if you can.

## Making copies

If you want to build your own software based off of my code, please make it meaningfully
different rather than just a clone, better yet, consider contributing to this app to improve it!

TODO: process to submit to app store.
