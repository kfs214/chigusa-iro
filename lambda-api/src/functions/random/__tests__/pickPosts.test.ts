import { getPickedOffsets } from "../pickPosts";

describe("getPickedOffsets", () => {
  it("totalPosts < length", () => {
    const totalPosts = 3;
    const length = 5;
    const expected = [0, 1, 2];

    const result = getPickedOffsets(totalPosts, length);
    expect(result).toEqual(expected);
  });

  it("totalPosts = length", () => {
    const totalPosts = 4;
    const length = 4;
    const expected = [0, 1, 2, 3];

    const result = getPickedOffsets(totalPosts, length);
    expect(result).toEqual(expected);
  });

  describe("totalPosts > length", () => {
    describe("totalPosts: 10 / length: 9", () => {
      let result: number[] = [];

      const totalPosts = 10;
      const length = 9;

      beforeAll(() => {
        result = getPickedOffsets(totalPosts, length);
      });

      it("has specified length", () => {
        expect(result).toHaveLength(length);
      });

      it("has no duplicate", () => {
        expect(new Set(result).size).toBe(result.length);
      });
    });

    describe("totalPosts: 500 / length: 50", () => {
      let result: number[] = [];

      const totalPosts = 10;
      const length = 9;

      beforeAll(() => {
        result = getPickedOffsets(totalPosts, length);
      });

      it("has specified length", () => {
        expect(result).toHaveLength(length);
      });

      it("has no duplicate", () => {
        expect(new Set(result).size).toBe(result.length);
      });
    });
  });
});
