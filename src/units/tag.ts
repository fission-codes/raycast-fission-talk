import { isObject } from "../common/type-checks"


// 🌸


export type Tag = {
  id: number
  text: string
  count: number
}



// 🔎


export function isTag(a: unknown): a is Tag {
  return isObject(a) &&

    ("id" in a) && ("text" in a) && ("count" in a)
}
