import searchId from "./search.js";
let filePath = "./input.json";

let id = process.argv.slice(2);

let name = await searchId(filePath, id);

console.log(name);
