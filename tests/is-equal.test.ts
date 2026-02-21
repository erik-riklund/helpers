import { expect } from "@std/expect";
import { it } from "@std/testing/bdd";
import { is_equal } from "@riklund/helpers";

/**
 * [ Reference equality for complex types ]
 *
 * Verifies that the `isEqual` helper performs strict reference equality checks when comparing
 * complex types like plain objects and arrays. It should return `true` only if the references are identical,
 * and `false` even if two distinct references point to objects or arrays with identical content.
 */

it("should return true for identical object references", () => {
  const object = {};
  expect(is_equal(object, object)).toBe(true);
});

it("should return false for different object references with identical content", () => {
  expect(is_equal({ foo: "bar" }, { foo: "bar" })).toBe(false);
});

it("should return true for identical array references", () => {
  const array = [1, 2, 3];
  expect(is_equal(array, array)).toBe(true);
});

it("should return false for different array references with identical content", () => {
  expect(is_equal([1, 2, 3], [1, 2, 3])).toBe(false);
});

it("should return false when comparing an array and an object", () => {
  expect(is_equal([], {})).toBe(false);
});

/**
 * [ Value equality for primitives ]
 *
 * Verifies that the `isEqual` helper performs standard value equality checks for all
 * primitive types (strings, numbers, `null`, `undefined`) and handles the special case of `NaN`,
 * ensuring two `NaN` values are considered equal.
 */

it("should return true for identical primitive strings", () => {
  expect(is_equal("hello", "hello")).toBe(true);
});

it("should return false for different primitive strings", () => {
  expect(is_equal("hello", "world")).toBe(false);
});

it("should return true for identical primitive numbers", () => {
  expect(is_equal(10, 10)).toBe(true);
});

it("should return false for different primitive numbers", () => {
  expect(is_equal(10, 20)).toBe(false);
});

it("should return true for null and null", () => {
  expect(is_equal(null, null)).toBe(true);
});

it("should return true for undefined and undefined", () => {
  expect(is_equal(undefined, undefined)).toBe(true);
});

it("should return true for NaN and NaN", () => {
  expect(is_equal(NaN, NaN)).toBe(true);
});

/**
 * [ Value comparison for rich types ]
 *
 * Verifies that the `isEqual` helper performs custom value-based comparison for built-in
 * "rich types" like Date, boxed String/Number, and RegExp objects, treating them as equal if their
 * underlying values/properties are identical, despite being different references.
 */

it("should return true for two identical Date objects", () => {
  const date1 = new Date(1678886400000);
  const date2 = new Date(1678886400000);

  expect(is_equal(date1, date2)).toBe(true);
});

it("should return true for two identical boxed String objects", () => {
  expect(is_equal(new String("test"), new String("test"))).toBe(true);
});

it("should return true for two identical boxed Number objects", () => {
  expect(is_equal(new Number(1), new Number(1))).toBe(true);
});

it("should return true for two identical RegExp objects", () => {
  expect(is_equal(/a/g, /a/g)).toBe(true);
});

/**
 * [ Edge cases and type coercion ]
 *
 * Verifies that `isEqual` handles specific edge cases, such as treating `0` and `-0` as equal,
 * and confirms that it correctly compares primitive values against their corresponding boxed objects as equal.
 * It also verifies that it correctly treats `null` and `undefined` as unequal.
 */

it("should return true for number 0 and negative 0", () => {
  expect(is_equal(0, -0)).toBe(true);
});

it("should return true for primitive 1 and boxed Number(1)", () => {
  expect(is_equal(1, new Number(1))).toBe(true);
});

it("should return true for primitive '1' and boxed String('1')", () => {
  expect(is_equal("1", new String("1"))).toBe(true);
});

it("should return false for null and undefined", () => {
  expect(is_equal(null, undefined)).toBe(false);
});
