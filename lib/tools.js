String.prototype.fUC = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.c2snake = function () {
  return this.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
};

/**
 * @param string src/name/dir
 * @summary split dir list
 */
String.prototype.dirSplit = function (spl = "/") {
  return this.split(spl).reduce((path, item, n) => {
    let dir = item;
    if (item !== "." && item !== "..") {
      if (path.length > 0) {
        dir = `${path[path.length - 1]}/${item}`;
      }
      path.push(dir);
    }

    return path;
  }, []);
};

module.exports = {};
