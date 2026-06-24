// Merge optional project proguard rules with the plugin defaults after Android prepare.
let fs = require('fs');
let path = require('path');

module.exports = function (ctx) {
  const projectRoot = ctx.opts.projectRoot;
  const pluginDir = ctx.opts.plugin.dir;
  const sourceProguardFile = path.join(pluginDir, 'proguard-custom.txt');
  const projectProguardFile = path.join(projectRoot, 'proguard-custom.txt');
  const destProguardFile = path.join(projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'assets', 'www', 'proguard-custom.txt');

  try {
    let rules = fs.readFileSync(sourceProguardFile, 'utf8');

    if (fs.existsSync(projectProguardFile)) {
      const customRules = fs.readFileSync(projectProguardFile, 'utf8');
      rules += '\r\n' + customRules;
      console.log('Merged optional project proguard rules into Android platform assets.');
    } else {
      console.log('No optional proguard-custom.txt found in projectRoot: ' + projectRoot);
    }

    fs.writeFileSync(destProguardFile, rules);
  } catch (err) {
    console.error(err);
  }
};
