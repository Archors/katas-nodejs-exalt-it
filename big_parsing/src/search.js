import fs from "fs";

function search(path, id, chunksize) {
  return new Promise((resolve) => {
    let reader = fs.createReadStream(path, {
      encoding: "UTF-8",
      highWaterMark: chunksize,
    });
    reader.on("error", (error) => {
      reject(error);
    });
    reader.on("data", function (chunk) {
      if (chunk.includes('"id": ' + id + ",")) {
        //String parsing if the id is in the chunk
        let index = chunk.indexOf('"id": ' + id + ",");
        let reverse = [...chunk].reverse().join("");
        let start = chunk.length - reverse.indexOf("{", chunk.length - index);
        if (chunk.indexOf('"name":', start) == -1) {
          return false;
        }
        let indexOfName =
          '"name": '.length + chunk.indexOf('"name":', start) + 1;
        if (chunk.indexOf('"', indexOfName) == -1) {
          return false;
        }
        let lastIndexOfName = chunk.indexOf('"', indexOfName);
        let name = chunk.substring(indexOfName, lastIndexOfName);
        reader.destroy();
        resolve(name);
      }
    });
    reader.on("end", () => {
      resolve(false);
    });
  });
}

export default async function searchId(path, id) {
  const chunkSize = 20000;
  const otherChunkSize = chunkSize + chunkSize / 2;
  let result = await search(path, id, chunkSize);
  //If it's false it may be because the data is between two chunks
  if (result != false) return result;
  result = await search(path, id, otherChunkSize); //Same search with a different chunk
  return result;
}
