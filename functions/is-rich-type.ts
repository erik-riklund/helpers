import { is_object } from "./is-object.ts";

/**
 * Checks if a value is a "rich type" object.
 *
 * Implementation borrowed from the "microdiff" package
 *   -> https://byteofdev.com/posts/microdiff/
 *
 * @param value The object to check.
 * @returns `true` if it is a rich type object; otherwise `false`.
 */
export function is_rich_type(value: object): boolean {
  const rich_types: Record<string, boolean> = {
    Date: true,
    RegExp: true,
    String: true,
    Number: true,
  };

  if (!is_object(value)) {
    return false; // primitive type or array.
  }
  const prototype = Object.getPrototypeOf(value)?.constructor?.name;
  return prototype && rich_types[String(prototype)] === true;
}
