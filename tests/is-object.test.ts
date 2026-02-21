import { expect } from "@std/expect";
import { it } from "@std/testing/bdd";
import { is_object } from "@riklund/helpers";

/**
 * [ Validation of object type ]
 *
 * Verifies that the `isObject` function correctly identifies valid object types,
 * including plain objects (`{}`), Date objects, and RegExp objects, all of which should return `true`.
 */

it("should return true when passed a plain object", () => {
  expect(is_object({})).toBe(true);
});

it("should return true when passed a Date object", () => {
  expect(is_object(new Date())).toBe(true);
});

it("should return true when passed a RegExp object", () => {
  expect(is_object(new RegExp(".*"))).toBe(true);
});

/**
 * [ Exclusion of non-object types ]
 *
 * Verifies that the `isObject` function correctly excludes arrays and primitive values,
 * ensuring that it returns `false` for arrays (`[]`), `null`, `undefined`, strings, numbers, and booleans.
 */

it("should return false when passed an array", () => {
  expect(is_object([])).toBe(false);
});

it("should return false when passed 'null'", () => {
  expect(is_object(null)).toBe(false);
});

it("should return false when passed 'undefined'", () => {
  expect(is_object(undefined)).toBe(false);
});

it("should return false when passed a string value", () => {
  expect(is_object("")).toBe(false);
});

it("should return false when passed a numeric value", () => {
  expect(is_object(0)).toBe(false);
});

it("should return false when passed a boolean value", () => {
  expect(is_object(true)).toBe(false);
});
