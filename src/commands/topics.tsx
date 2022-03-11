import { Action, ActionPanel, List, showToast, Toast } from "@raycast/api"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"

import { Tag } from "../units/tag"
import { TopicListItem } from "../components/TopicListItem"
import useCategories from "../effects/categories"
import useSearch, { Query } from "../effects/search"
import useTags from "../effects/tags"


type State = {
  query?: Query,
  tags?: string[]
}


export default function Command() {
  const [ state, setState ] = useState<State>({})

  const cats = useCategories()
  const search = useSearch(state.query, state.tags)
  const tags = useTags()

  useEffect(() => {
    if (cats.error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed loading categories",
        message: cats.error.message,
      })
    } else if (tags.error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed loading tags",
        message: tags.error.message,
      })
    } else if (search.error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed loading search results",
        message: search.error.message,
      })
    }
  }, [ search.error, cats.error, tags.error ])

  const isLoadingCategories = !cats.categories && !cats.error
  const isLoadingSearch = !search.posts && !search.topics && !search.error
  const isLoadingTags = !tags.tags && !tags.error

  return (
    <List
      actions={<Actions />}
      isLoading={isLoadingCategories || isLoadingSearch || isLoadingTags}
      onSearchTextChange={term => setState({ ...state, query: { term } })}
      searchBarAccessory={
        <List.Dropdown
          onChange={tagId => setState({ ...state, tags: [ tagId ] })}
          tooltip="Tags"
        >
          <List.Dropdown.Item title="All tags" value="" />
          <List.Dropdown.Section>
            {
              (tags.tags || []).map(tag => {
                const id = tag.id.toString()
                return <List.Dropdown.Item key={id} title={tag.text} value={id} />
              })
            }
          </List.Dropdown.Section>
        </List.Dropdown>
      }
      throttle={true}
    >
      {search.topics?.map((topic, index) => (
        <TopicListItem
          key={topic.id}
          index={index}
          {...{ topic, categories: cats.categories || {} }}
        />
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