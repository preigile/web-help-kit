import objectToMap from "./convertToMap";

const obj = { one: "value1", two: "value2", three: "value3" };

describe("objectToMap", () => {
  test("when get object should return Map", () => {
    const result = objectToMap(obj);
    expect(result.get("two")).toBe("value2");
  });
});
