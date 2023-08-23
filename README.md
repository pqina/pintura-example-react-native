# Pintura React Native example project

Run `npm install` to install project dependencies, then run `npm start` to start the development server.

Post install the Pintura React Native component does two things:

- It creates a `pintura.html` file in the Pintura React Native npm package folder, this file is used as a WebView source.
- It copies the `pintura.html` file to the `android/app/src/main/assets` folder so it can be loaded by Android, iOS doesn't require this step.

When we update `@pqina/pintura` or `@pqina/pintura-video` we need to run `npm rebuild` to rebuild the `pintura.html` file.

## How to run

### Android

- Have an Android emulator running (quickest way to get started), or a device connected.

```
npx react-native run-android
```

### iOS

```
npx react-native run-ios
```

OR

- Open ios/pinturaexamplereactnative.xcworkspace in Xcode or run "xed -b ios"
- Hit the Run button

### MacOS

See https://aka.ms/ReactNativeGuideMacOS for the latest up-to-date instructions.

## License

This projects uses a test version of Pintura. This version of Pintura will show a watermark in the editor and on generated images.

Purchase a license at https://pqina.nl/pintura to use Pintura in production.
