import fetch from "cross-fetch"
import { useEffect, useState } from "react"

import { BASE_URL } from "../common/url"
import { isPost, Post } from "../units/post"
import { isTopic, Topic } from "../units/topic"
import { isArray, isObject } from "../common/type-checks"
import { title } from "process"


export type Query = {}


type State = {
  posts?: Post[]
  topics?: Topic[]
  error?: Error
}


export default function useSearch(query?: Query) {
  const [ state, setState ] = useState<State>({})

  useEffect(() => {
    async function search() {
      try {
        const q = "after:2015-01-01 order:latest"
        const results = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(q)}`).then(a => a.json())
        if (!isObject(results)) throw new Error("Unexpected response from search")

        const posts: Post[] = isArray(results.posts)
          ? results.posts.reduce((acc: Post[], a: unknown) => isPost(a) ? [ ...acc, a ] : acc, [])
          : []

        const topics: Topic[] = isArray(results.topics)
          ? results.topics.reduce((acc: Topic[], a: unknown) => isTopic(a) ? [ ...acc, a ] : acc, [])
          : []

        setState({ posts, topics })

      } catch (error) {
        setState({ error: error instanceof Error ? error : new Error("Something went wrong") })

      }
    }

    search()
  }, [])

  return state
}