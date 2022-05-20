import getInformation from "../src/getData/getInformation";
import getJobs from "../src/getData/getJobs";
import getUsers from "../src/getData/getUsers";
import { mergeDeep } from "../src/Tools/tools";

describe("Data reception", () => {
  it("Informations", async () => {
    const expected = {
      "-MYaJYUrII35RcHQsSIB": { age: 37, city: "versailleS" },
      "-MYaJYfv5N5ENN_Xx-af": { age: 27 },
      "-MYaJYhfB3K6JOxs9glD": { age: 32 },
      "-MYaJYjPRSrb7EUP7rUv": { age: 28, city: "Paris" },
      "-MYaJYmusYDxbkbIMfk1": {
        age: 27,
        city: "La banlieu",
        job: "Junior Developer",
      },
      "-MYaJYoe5hsOQne1Kkex": { city: "PARIS" },
      "-MYaJYqQuZO8RNhZybks": { age: 12, city: "pAriS" },
      "-MYaJYs9t7o8NIEgOtZm": { age: 25 },
    };
    const result = await getInformation();
    expect(result).toEqual(expected);
  });
  it("Jobs", async () => {
    const expected = {
      "-MYaJYUrII35RcHQsSIB": { job: "CTO", name: "Poul" },
      "-MYaJYfv5N5ENN_Xx-af": { age: 289, job: "Developer" },
      "-MYaJYhfB3K6JOxs9glD": {
        job: "Engeneering Manager",
        name: "Queeeentin",
      },
      "-MYaJYjPRSrb7EUP7rUv": { job: "DevOps" },
      "-MYaJYl93f0fXBJPvSqG": { job: "Developer" },
      "-MYaJYoe5hsOQne1Kkex": { job: "Senior Developer" },
      "-MYaJYqQuZO8RNhZybks": { job: "Developer", name: "L43t1t14" },
      "-MYaJYs9t7o8NIEgOtZm": { job: "Developer", name: "Ttoto" },
    };
    const result = await getJobs();
    expect(result).toEqual(expected);
  });
  it("Users", async () => {
    const expected = {
      "-MYaJYUrII35RcHQsSIB": { name: "P4ul" },
      "-MYaJYfv5N5ENN_Xx-af": { name: "V1nc3nt" },
      "-MYaJYhfB3K6JOxs9glD": { name: "Qu3nt1n" },
      "-MYaJYjPRSrb7EUP7rUv": { name: "4nh-J0" },
      "-MYaJYl93f0fXBJPvSqG": { name: "4lex" },
      "-MYaJYmusYDxbkbIMfk1": { name: "N1n4" },
      "-MYaJYoe5hsOQne1Kkex": { name: "F4b13n" },
      "-MYaJYqQuZO8RNhZybks": { name: "#ERROR" },
      "-MYaJYs9t7o8NIEgOtZm": { name: "T0ny" },
    };
    const result = await getUsers();
    expect(result).toEqual(expected);
  });
});

describe("Test section", () => {
  it("compare result with expected result", async () => {
    // actual test
    const expected = {
      "-MYaJYUrII35RcHQsSIB": {
        job: "CTO",
        name: "Paul",
        age: 37,
        city: "Versailles",
      },
      "-MYaJYfv5N5ENN_Xx-af": {
        age: 27,
        job: "Developer",
        name: "Vincent",
      },
      "-MYaJYhfB3K6JOxs9glD": {
        job: "Engeneering Manager",
        name: "Quentin",
        age: 32,
      },
      "-MYaJYjPRSrb7EUP7rUv": {
        job: "DevOps",
        age: 28,
        city: "Paris",
        name: "Anh-Jo",
      },
      "-MYaJYl93f0fXBJPvSqG": {
        job: "Developer",
        name: "Alex",
      },
      "-MYaJYmusYDxbkbIMfk1": {
        age: 27,
        city: "La banlieu",
        job: "Junior Developer",
        name: "Nina",
      },
      "-MYaJYoe5hsOQne1Kkex": {
        job: "Senior Developer",
        city: "Paris",
        name: "Fabien",
      },
      "-MYaJYqQuZO8RNhZybks": {
        job: "Developer",
        name: "Laetitia",
        age: 12,
        city: "Paris",
      },
      "-MYaJYs9t7o8NIEgOtZm": {
        job: "Developer",
        name: "Tony",
        age: 25,
      },
    };
    const informations = await getInformation();
    const users = await getUsers();
    const jobs = await getJobs();
    let result = mergeDeep(informations, users);
    result = mergeDeep(jobs, result);
    result = mergeDeep(result, result);
    expect(result).toStrictEqual(expected);
  });
});
