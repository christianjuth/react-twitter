function ObjectKeys<T>(obj: T): (keyof T)[] {
  return Object.keys(obj as any) as (keyof T)[]
}

export const preserveTypes = {
  ObjectKeys,
}