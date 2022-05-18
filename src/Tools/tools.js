import fs from "fs";

//Create a file
export function createFile(filename, content) {
  content = JSON.stringify(content);
  fs.writeFile(filename, content, (err) => {
    if (err) {
      console.log(err);
      return false;
    } else return true;
  });
}
const isObject = (item) => {
  return item && typeof item === "object" && !Array.isArray(item);
};

//Deep merge two objects and clean them up
export const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, {
            [key]: {},
          });
        mergeDeep(target[key], source[key]);
      } else if (source[key] != "#ERROR") {
        Object.assign(target, {
          [key]: cleanData(key, source[key]),
        });
      }
    }
  }
  return mergeDeep(target, ...sources);
};

//Clean data from errors
function cleanData(key, data) {
  switch (key) {
    case "city":
      data = data.toLowerCase();
      data = data.charAt(0).toUpperCase() + data.slice(1);
      break;
    case "name":
      data = data.charAt(0).toUpperCase() + data.slice(1);
      data = data.replaceAll("3", "e");
      data = data.replaceAll("4", "a");
      data = data.replaceAll("1", "i");
      data = data.replaceAll("0", "o");
      break;
    default:
      return data;
  }
  return data;
}
