import { isObject } from "../common/type-checks"


// 🌸


export type Post = {
  id: number
  name: string
  username: string
  created_at: string
  blurb: string
  post_number: number
  topic_id: number
}



// 🔎


export function isPost(a: unknown): a is Post {
  return isObject(a) &&
    ("id" in a) && ("name" in a) && ("username" in a) &&
    ("created_at" in a) && ("blurb" in a) && ("post_number" in a) && ("topic_id" in a)
}