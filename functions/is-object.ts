/**
 * Checks if a value is an object (excluding arrays).
 *
 * @param value The value to check.
 * @returns `true` if the value is an object; otherwise `false`.
 */
export function is_object(value: unknown): boolean {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
