# Healthy Paws App

##Workstation Setup

Install the following (if needed)

1. Node.js 6.9.x `https://nodejs.org/en/`
2. Cordova `sudo npm install -g cordova@6.0.0`
3. Ionic `sudo npm install -g ionic`
4. JDK 7+
5. Android Standalone SDK `http://developer.android.com/sdk/installing/index.html?pkg=tools` or Android Studio `http://developer.android.com/sdk/installing/index.html?pkg=studio`
6. Start Android SDK Manager `android` and install tools for SDK Level 25
  1. Android Platform SDK
  2. Android SDK build-tools version 19.1.0 or higher
  3. Android Support Repository (found under "Extras")
  4. Android Emulator
7. Add environment variables for the following (adjust paths as needed)
  1. export ANDROID_HOME=/Development/android-sdk/
  2. export PATH=${PATH}:/Development/android-sdk/platform-tools:/Development/android-sdk/tools
  3. export JAVA_HOME=/path/to/jdk
8. Xcode (from App Store)
9. Xcode command line tools `xcode-select --install`
10. iOS simulator plug-in `sudo npm install -g ios-sim`
11. iOS deployment plug-in `npm install -g ios-deploy`


##Compile & Run

###One-time (or after settings / dependencies are updated)

- Update dependencies `npm install`
- Restore ionic state `ionic state restore` (once or after team changes)

###Primary Development (in Chrome)

- Start Development server: `ionic serve` (choose localhost if asked)
  - iOS `ionic serve --platform ios`
  - Android `ionic run --platform android`

###Running in Simulator

*iOS*

- Run emulate: `ionic emulate ios`
- Optionally add `-lc` to enable livereload and console output

*Android*

- Prerequisite: Setup and boot whichever AVD you'd like to use by running `android avd`
- Run emulate: `ionic emulate android`

###Running on Devices

*iOS*

- Prerequisite: Open Xcode Preferences and login to your developer account (must be on development team for this app)
- Build: `ionic build ios`
- Open the `.xcodeproj` in `platforms/ios` in Xcode
- Run it!

*Android*

- Connect a compatible device
- Run: `ionic run android --device`

##Deployment

TODO
