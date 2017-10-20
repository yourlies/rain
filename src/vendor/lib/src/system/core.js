//无限分类赋值
const storeClassification = function (object, dir, value, index = 0) {
  if (index == 0 && dir.length == 1) {
    object['./'][dir[0]] = value;
  } else {
  object[dir[index]] = !object.hasOwnProperty(dir[index]) ? {} : object[dir[index]];
  index == dir.length - 1
    ? object[dir[index]] = value
    : storeClassification(object[dir[index]], dir, value, index + 1)
  }
}
//无限分类读取
const readClassification = function (object, dir, index = 0) {
  if (dir.length == index) {
    return object;
  } else {
    return dir.length == 1
    ? object['./'][dir[index]]
    : readClassification(object[dir[index]], dir, index + 1);
  }
}

const readTreeClassification = function (object, tree, path) {
  for (let [key, value] of Object.entries(tree)) {
    object[key] = require(`../../../../${path}/${key}`);
    if (!!value.child) {
      readTreeClassification(object, value.child, path);
    }
  }
}

export default {
  storeClassification,
  readClassification,
  readTreeClassification
}