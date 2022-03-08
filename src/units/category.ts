import { isArray, isObject } from "../common/type-checks"


// 🌸


export type Category = {
  id: number
  name: string
  color: string
  text_color: string
  slug: string

  description: string
  description_text: string
  description_excerpt: string

  subcategory_ids: string[]
  subcategory_list: string[]

  uploaded_logo: string
  uploaded_background: string
}



// 🔎


export function isCategory(a: unknown): a is Category {
  return isObject(a) &&
    ("id" in a) && ("name" in a) && ("color" in a) && ("text_color" in a) && ("slug" in a) &&
    ("description" in a) && ("description_text" in a) && ("description_excerpt" in a) &&

    ("subcategory_ids" in a) && ("subcategory_list" in a) &&
    ("uploaded_logo" in a) && ("uploaded_background" in a) &&

    isArray(a.subcategory_ids) && isArray(a.subcategory_list)
}