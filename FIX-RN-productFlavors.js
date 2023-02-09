/**
 * @author 9christian9
 * @description This script file must be in the react native root project
 * <br> This script work only with RN 0.67.x and Android Gradle Plugin 7.2 - 7.3
*/

const {readFile, writeFile} = require('fs');
const reactNative = "./node_modules/react-native/react.gradle";

const workaround = `

def currentAssetsCopyTask = tasks.create(
    name: "copy\${targetName}BundledJs",
    type: Copy) {
    group = "react"
    description = "copy bundled JS into \${targetName}."

    from(jsBundleDir)
    if (config."jsBundleDir\${targetName}") {
        into(file(config."jsBundleDir\${targetName}"))
    } else {
        into ("$buildDir/intermediates")
        if (isAndroidLibrary) {
            into ("library_assets/$\{variant.name}/out")
        } else {
            into ("assets/\${targetPath}")

            // Workaround for Android Gradle Plugin 3.2+ new asset directory
            into ("merged_assets/\${variant.name}/merge\${targetName}Assets/out")

            // Workaround for Android Gradle Plugin 3.4+ new asset directory
            into ("merged_assets/\${variant.name}/out")

            // Workaround for Android Gradle Plugin 7.2 - 7.3 and React-Native 0.67.x - Assets directory by christian
            into("$buildDir/intermediates/assets/\${variant.name}")
        }
    }

    dependsOn(variant.mergeAssetsProvider.get())
    enabled(currentBundleTask.enabled)
    dependsOn(currentBundleTask)
}

`;

readFile(reactNative, 'utf-8', function (err, contents) {
    if (err) {
        console.log(err);
        return;
    }
    if(!contents.includes(workaround)){
        contents = contents.split("\n");
        contents.splice(288, 38);
        contents[288] = [workaround];
        contents = contents.join("\n");

        writeFile(reactNative, contents, 'utf-8', function (err) {
            if (err) {
                console.log(err);
                return;
            }else{
                console.log('File react.gradle changed correctly');
                return;
            }
        });
    }else{
        console.log('Fix already present');
        return;
    }
});