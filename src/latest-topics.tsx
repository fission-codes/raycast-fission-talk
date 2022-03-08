import { List, showToast, Toast } from "@raycast/api"
import { useEffect } from "react"

import { TopicListItem } from "./components/TopicListItem"
import useCategories from "./effects/categories"
import useSearch from "./effects/search"


export default function Command() {
  const cats = useCategories()
  const search = useSearch()

  useEffect(() => {
    if (cats.error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed loading categories",
        message: cats.error.message,
      })
    } else if (search.error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed loading search results",
        message: search.error.message,
      })
    }
  }, [ search.error, cats.error ])

  const isLoadingCategories = !cats.categories && !cats.error
  const isLoadingSearch = !search.posts && !search.topics && !search.error

  return (
    <List isLoading={isLoadingCategories || isLoadingSearch}>
      {search.topics?.map((topic, index) => (
        <TopicListItem key={topic.id} topic={topic} index={index} />
      ))}
    </List>
  )
}