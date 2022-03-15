import fetch from "cross-fetch"
import { getPreferenceValues } from "@raycast/api"
import { useEffect, useState } from "react"

import { BASE_URL } from "../common/url"
import { Preferences, possiblyAuthHeaders } from "../units/preferences"
import { isPost, Post } from "../units/post"
import { isTopic, Topic } from "../units/topic"
import { isArray, isObject } from "../common/type-checks"


export type Query = {
  term?: string
}


type State = {
  posts?: Post[]
  topics?: Topic[]
  error?: Error
}


export default function useSearch(query?: Query, tagIds?: string[]) {
  const [ state, setState ] = useState<State>({})

  useEffect(() => {
    async function search() {
      try {
        const preferences = getPreferenceValues<Preferences>()
        tagIds = (tagIds || []).filter(t => t.length)

        // Build query
        let q = `${query?.term ? query?.term + " " : ""}after:2015-01-01 order:latest min_posts:0`
        if (tagIds.length) q = `${q} tags:${tagIds.join(",")}`

        // Fetch results
        const results = await fetch(
          `${BASE_URL}/search.json?q=${encodeURIComponent(q)}`,
          { headers: possiblyAuthHeaders() }
        ).then(
          a => a.json()
        )

        if (!isObject(results)) throw new Error("Unexpected response from search")

        // Type check and extract data
        const posts: Post[] = isArray(results.posts)
          ? results.posts.reduce((acc: Post[], a: unknown) => isPost(a) ? [ ...acc, a ] : acc, [])
          : []

        const topics: Topic[] = isArray(results.topics)
          ? results.topics.reduce((acc: Topic[], a: unknown) => {
            return isTopic(a) && (preferences.enable_tasks ? true : a.category_id !== 35) ? [ ...acc, a ] : acc
          }, [])
          : []

        // Fin
        setState({ posts, topics })

      } catch (error) {
        setState({ error: error instanceof Error ? error : new Error("Something went wrong") })

      }
    }

    search()
  }, [ query?.term, tagIds ])

  return state
}