import fs from "fs";

//Search in the file the id and return the corresponding name or false
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
        if (chunk.indexOf('"name":', start) == -1) return false; //Between 2 chunks
        let indexOfName =
          '"name": '.length + chunk.indexOf('"name":', start) + 1;
        if (chunk.indexOf('"', indexOfName) == -1) return false; //Between 2 chunks
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
  const chunkSize = 200000; //Can be increased to decrease processing time (also reducing chance of data between 2 chunks)
  const otherChunkSize = chunkSize * 2 + chunkSize / 100; //Change the chunksize to avoid data split between 2 chunk (still not perfect)
  let result = await search(path, id, chunkSize);
  //If it's false it may be because the data is between two chunks
  if (result != false) return result;
  result = await search(path, id, otherChunkSize); //Same search with a different chunk in case of data between 2 chunk
  return result;
}
