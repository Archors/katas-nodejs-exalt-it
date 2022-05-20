import searchId from "../src/search";

var filePath = "./input.json";

describe("False id", () => {
  it("-1", async () => {
    const result = await searchId(filePath, -1);
    expect(result).toEqual(false);
  });
  it("string", async () => {
    const result = await searchId(filePath, "rien");
    expect(result).toEqual(false);
  });
});

describe("id in data", () => {
  it("0 : Allen Hauck", async () => {
    const expected = "Allen Hauck"
    const result = await searchId(filePath, 0);
    expect(result).toEqual(expected);
  });
  it("716172 : Elnora Nicolas", async () => {
    const expected = "Elnora Nicolas"
    const result = await searchId(filePath, 716172);
    expect(result).toEqual(expected);
  });
  it("665076 : Anne Rolfson", async () => {
    const expected = "Anne Rolfson"
    const result = await searchId(filePath, 665076);
    expect(result).toEqual(expected);
  });
  it("558141 : Akeem Leffler (between 2 chunks)", async () => {
    const expected = "Akeem Leffler"
    const result = await searchId(filePath, 558141);
    expect(result).toEqual(expected);
  });
});