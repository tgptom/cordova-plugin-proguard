# cordova-plugin-proguard

[![NPM version][npm-image]][npm-url]
[![npm](https://img.shields.io/npm/dm/cordova-plugin-proguard.svg)](https://www.npmjs.com/package/cordova-plugin-proguard)

> Cordova plugin that enables Android code shrinking/obfuscation for **release** builds.

## Modern Android behavior (R8)

Recent `cordova-android` versions (including 14 and 15) build with modern Android Gradle Plugin versions that run **R8**.
R8 accepts ProGuard-compatible rules, so this plugin still uses `proguard-custom.txt` rules.

## Installation

```bash
cordova plugin add cordova-plugin-proguard
```

This plugin:
- injects a Gradle reference (`build.gradle`) into Android builds;
- keeps `debug` builds non-minified;
- enables minification for `release` builds;
- uses `src/main/assets/www/proguard-custom.txt` as the custom rules file.

## Custom rules

You can add project-specific rules by creating a `proguard-custom.txt` in your Cordova project root.
During prepare, `scripts/androidBeforeInstall.js` merges your project rules with the plugin defaults and writes the merged file to the Android platform assets.

The defaults preserve `BuildConfig.APPLICATION_ID` for plugins that read it reflectively, such as `cordova-plugin-app-update`, so no extra rule is needed for this safeguard.

Example:

```bash
# in your app project root
cat > proguard-custom.txt <<'EOF_RULES'
-keep class com.example.yourlib.** { *; }
-dontwarn com.example.yourlib.**
EOF_RULES

cordova plugin add cordova-plugin-proguard
cordova prepare android
```

## Compatibility checks

Example commands to verify with recent Android platforms:

```bash
cordova platform rm android
cordova platform add android@14
cordova build android --release

cordova platform rm android
cordova platform add android@15
cordova build android --release
```

## Notes

- This plugin does **not** pin Cordova Android, Gradle, AGP, SDK, Kotlin, or Android Studio versions.
- If your app/plugins use reflection-heavy SDKs, add app-specific keep rules.

## History

- v1.0.0 - supports Cordova version < 7
- v2.0.0 - supports Cordova version 7+

## License

MIT © [Aleksandr Filatov](https://alfilatov.com)

[npm-url]: https://npmjs.org/package/cordova-plugin-proguard
[npm-image]: https://img.shields.io/npm/v/cordova-plugin-proguard.svg
