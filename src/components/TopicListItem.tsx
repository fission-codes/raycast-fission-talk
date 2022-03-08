import { ActionPanel, List, Action } from "@raycast/api"

import { BASE_URL } from "../common/url"
import { Topic } from "../units/topic"


export function TopicListItem(props: { topic: Topic; index: number }) {
  const { topic } = props

  return (
    <List.Item
      icon={"🧺"}
      title={topic.title}
      subtitle={""}
      accessoryTitle={""}
      actions={<Actions topic={topic} />}
    />
  );
}

function Actions({ topic }: { topic: Topic }) {
  return (
    <ActionPanel title={"TODO"}>
      <ActionPanel.Section>
        <Action.OpenInBrowser url={`${BASE_URL}/t/${topic.slug}`} />
      </ActionPanel.Section>
      {/* <ActionPanel.Section>
        {props.item.link && (
          <Action.CopyToClipboard
            content={props.item.link}
            title="Copy Link"
            shortcut={{ modifiers: [ "cmd" ], key: "." }}
          />
        )}
      </ActionPanel.Section> */}
    </ActionPanel>
  );
}