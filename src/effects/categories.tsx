import fetch from "cross-fetch"
import { useEffect, useState } from "react"

import { BASE_URL } from "../common/url"
import { isCategory, Category } from "../units/category"
import { isArray, isObject } from "../common/type-checks"


type State = {
  categories?: Record<string, Category>
  error?: Error
}


export default function useCategories() {
  const [ state, setState ] = useState<State>({})

  useEffect(() => {
    async function categories() {
      try {
        const results = await fetch(`${BASE_URL}/categories.json`).then(a => a.json())

        if (!isObject(results)) throw new Error("Unexpected response from categories listing")
        if (!isObject(results.category_list)) throw new Error("Unexpected response from categories listing: 2")
        if (!isArray(results.category_list.categories)) throw new Error("Unexpected response from categories listing: 3")

        const categories: Record<string, Category> = results
          .category_list
          .categories
          .reduce((acc: Record<string, Category>, a: unknown) => {
            return isCategory(a) ? { ...acc, [ a.id.toString() ]: a } : acc
          }, {})

        setState({ categories })

      } catch (error) {
        setState({ error: error instanceof Error ? error : new Error("Something went wrong") })

      }
    }

    categories()
  }, [])

  return state
}