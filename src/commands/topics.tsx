import { Action, ActionPanel, List, showToast, Toast } from "@raycast/api"
import { useEffect, useState } from "react"

import { TopicListItem } from "../components/TopicListItem"
import useCategories from "../effects/categories"
import useSearch, { Query } from "../effects/search"


type State = {
  query?: Query
}


export default function Command() {
  const [ state, setState ] = useState<State>({})

  const cats = useCategories()
  const search = useSearch(state.query)

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
    <List
      actions={<Actions />}
      isLoading={isLoadingCategories || isLoadingSearch}
      onSearchTextChange={term => setState({ query: { term } })}
      throttle={true}
    >
      {search.topics?.map((topic, index) => (
        <TopicListItem key={topic.id} index={index} {...{ topic, categories: cats.categories || {} }} />
      ))}
    </List>
  )
}



// ㊙️


function Actions() {
  return (
    <ActionPanel title={"List actions"}>
    </ActionPanel>
  )
}