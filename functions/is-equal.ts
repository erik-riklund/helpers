import { is_object } from "./is-object.ts";
import { is_rich_type } from "./is-rich-type.ts";

/**
 * ?
 *
 * Implementation inspired by the "microdiff" package
 *   -> https://byteofdev.com/posts/microdiff/
 *
 * @param value ?
 * @param other ?
 * @returns `true` if the values are considered equal; otherwise `false`.
 */
export function is_equal(value: unknown, other: unknown): boolean {
  const is_primitive_comparison =
    !Array.isArray(value) &&
    !Array.isArray(other) &&
    (!is_object(value) || is_rich_type(value as object)) &&
    (!is_object(other) || is_rich_type(other as object));

  if (!is_primitive_comparison) {
    return value === other; // reference equality comparison.
  }
  return (
    value === other ||
    (isNaN(Number(value)) || isNaN(Number(other))
      ? String(value) === String(other)
      : Number(value) === Number(other))
  );
}
