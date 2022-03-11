import fetch from "cross-fetch"
import { useEffect, useState } from "react"

import { BASE_URL } from "../common/url"
import { isTag, Tag } from "../units/tag"
import { isArray, isObject } from "../common/type-checks"
import { possiblyAuthHeaders } from "../units/preferences"


type State = {
  tags?: Tag[]
  error?: Error
}


export default function useTags() {
  const [ state, setState ] = useState<State>({})

  useEffect(() => {
    async function tags() {
      try {
        const results = await fetch(
          `${BASE_URL}/tags.json`,
          { headers: possiblyAuthHeaders() }
        ).then(
          a => a.json()
        )

        if (!isObject(results)) throw new Error("Unexpected response from tags listing")
        if (!isArray(results.tags)) throw new Error("Unexpected response from tags listing: 2")

        const processTag = (acc: Tag[], a: unknown): Tag[] => {
          if (isTag(a)) {
            return [ ...acc, a ]
          } else {
            return acc
          }
        }

        const tags: Tag[] = results
          .tags
          .reduce(processTag, [])

        const sortedTags =
          tags.sort((a, b) => a.count > b.count ? -1 : 1)

        setState({ tags: sortedTags })

      } catch (error) {
        setState({ error: error instanceof Error ? error : new Error("Something went wrong") })

      }
    }

    tags()
  }, [])

  return state
}