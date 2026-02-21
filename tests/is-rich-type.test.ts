import { expect } from "@std/expect";
import { it } from "@std/testing/bdd";
import { is_rich_type } from "@riklund/helpers";

/**
 * [ Identification of rich data types ]
 *
 * Verifies that the `isRichType` function correctly identifies built-in JavaScript objects
 * that typically require deep cloning due to their mutability or complex internal state,
 * such as Date, RegExp, and the boxed primitive wrappers (String, Number).
 */

it("should return true for a Date object", () => {
  expect(is_rich_type(new Date())).toBe(true);
});

it("should return true for a RegExp object", () => {
  expect(is_rich_type(new RegExp(".*"))).toBe(true);
});

it("should return true for a boxed String object", () => {
  expect(is_rich_type(new String("foo"))).toBe(true);
});

it("should return true for a boxed Number object", () => {
  expect(is_rich_type(new Number(123))).toBe(true);
});

/**
 * [ Exclusion of simple and collection types ]
 *
 * Verifies that `isRichType` correctly excludes simple mutable types (plain objects),
 * collection types (Array, Map, Set), functions, and custom class instances, all of which are
 * typically handled differently (e.g., proxied or treated as non-rich).
 */

it("should return false for a plain object literal", () => {
  expect(is_rich_type({})).toBe(false);
});

it("should return false for an array", () => {
  expect(is_rich_type([])).toBe(false);
});

it("should return false for a function", () => {
  expect(is_rich_type(() => {})).toBe(false);
});

it("should return false for a custom class instance", () => {
  class Dummy {}
  expect(is_rich_type(new Dummy())).toBe(false);
});

it("should return false for a Map", () => {
  expect(is_rich_type(new Map())).toBe(false);
});

it("should return false for a Set", () => {
  expect(is_rich_type(new Set())).toBe(false);
});
