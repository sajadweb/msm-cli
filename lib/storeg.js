// basic file management

const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },
  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },
  directoryUpdateOrNew: (directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
      fse.mkdir(directoryPath);
    }
    return;
  },
  makeDirectory: (directoryPath) => {
    return fse.mkdir(directoryPath);
  },
  getPath: () => {
    return process.cwd();
  },
  write: async (filePath, content, force = false) => {
    if (force) {
      return await fse.writeFile(filePath, content);
    } else {
      if (!fs.existsSync(filePath)) {
        return await fse.writeFile(filePath, content);
      } else {
        return false;
      }
    }
  },
  writeJson: async (filePath, json) => {
    return await fse.writeJson(filePath, json);
  },
  readJsonSync: (filePath) => {
    return fse.readJsonSync(filePath, { replacer: true });
  },
   readSync:(filePath) => {
    return fse.readFileSync(filePath, { replacer: true });
  },
};
