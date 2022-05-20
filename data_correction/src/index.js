import getInformations from "./getData/getInformation.js";
import getJobs from "./getData/getJobs.js";
import getUsers from "./getData/getUsers.js";
import postData from "./postData/postData.js";
import { mergeDeep, createFile } from "./Tools/tools.js";

const informations = await getInformations();
const users = await getUsers();
const jobs = await getJobs();
//backup of each file
createFile("informations.json", informations);
createFile("user.json", users);
createFile("jobs.json", jobs);
//Merge in one file and sanitise data
let finalData = mergeDeep(informations, users);
finalData = mergeDeep(jobs, finalData);
finalData = mergeDeep(finalData, finalData);
//Store the sanitise data
createFile("dataSanitize.json", finalData);
//Upload it on Krate
postData(finalData);
console.log("merge :\n", finalData);