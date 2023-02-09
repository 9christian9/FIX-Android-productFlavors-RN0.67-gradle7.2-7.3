# FIX-Android-productFlavors-RN0.67-gradle7.2-7.3

This repository solve the problem of using productFlavors when used with React Native 0.67.x and Gradle 7.2 -7.3
Common error `Unable to load script. Make sure you're either running a Metro server (run 'react-native start') or that your bundle 'index.android.bundle' is packaged correctly for release.`

I have noticed that when using productFlavors the React Native currentAssetsCopyTask does not work correctly because the index.android.bundle is not copied and past correctly since the file is needed to run the apk (because without it, the app crashes) .


## How to use?

 1. Download the FIX-RN-productFlavors.js file and place it in the react native root project
 2. In the script section of package.json add a new script: `"fix-productFlavors": "node FIX-RN-productFlavors.js"`
 3. Enter the name of the created script in the Android build stream


### Example

```
.....
scripts {
    "fix-productFlavors" : "node FIX-RN-productFlavors.js"
    "android": "npm run fix-productFlavors && react-native run-android --variant=${productFlavors}${buildTypes} --appIdSuffix=${appIdSuffix}",
}
.....

```


## License

MIT
