import { isArray, isObject } from "../common/type-checks"


// 🌸


export type Topic = {
  id: number
  title: string
  fancy_title: string
  slug: string
  posts_count: number
  reply_count: number
  highest_post_number: number
  created_at: string
  last_posted_at: string
  bumped: boolean
  bumped_at: string
  archetype: string
  unseen: boolean
  // last_read_post_number: number
  // unread: number
  // new_posts: number
  // unread_posts: number
  pinned: boolean
  // unpinned: string | null
  visible: boolean
  closed: boolean
  archived: boolean
  bookmarked: boolean
  // notification_level: number
  liked: boolean | null
  tags: string[]
  category_id: number
}



// 🔎


export function isTopic(a: unknown): a is Topic {
  return isObject(a) &&

    ("id" in a) && ("title" in a) && ("fancy_title" in a) && ("slug" in a) &&
    ("posts_count" in a) && ("reply_count" in a) && ("highest_post_number" in a) &&
    ("created_at" in a) && ("last_posted_at" in a) && ("bumped" in a) && ("bumped_at" in a) &&
    ("archetype" in a) && ("unseen" in a) && ("pinned" in a) && ("visible" in a) &&
    ("closed" in a) && ("archived" in a) && ("bookmarked" in a) &&
    ("liked" in a) && ("tags" in a) && ("category_id" in a) &&

    isArray(a.tags)
}