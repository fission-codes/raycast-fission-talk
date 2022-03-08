export function isArray<T>(a: unknown): a is Array<T> {
  return a !== null && Array.isArray(a)
}

export function isObject<T>(a: unknown): a is Record<string, T> {
  return a !== null && typeof a === "object"
}