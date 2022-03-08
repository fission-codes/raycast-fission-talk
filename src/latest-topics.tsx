import { List, showToast, Toast } from "@raycast/api"
import { useEffect } from "react"

import { TopicListItem } from "./components/TopicListItem"
import useSearch from "./effects/search"


export default function Command() {
  const state = useSearch()

  useEffect(() => {
    if (state.error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed loading stories",
        message: state.error.message,
      })
    }
  }, [ state.error ])

  return (
    <List isLoading={!state.posts && !state.topics && !state.error}>
      {state.topics?.map((topic, index) => (
        <TopicListItem key={topic.id} topic={topic} index={index} />
      ))}
    </List>
  )
}