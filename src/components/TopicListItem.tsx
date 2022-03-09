import { Action, ActionPanel, Color, Icon, List } from "@raycast/api"
import { DateTime } from "luxon"

import { BASE_URL } from "../common/url"
import { Category } from "../units/category"
import { Topic } from "../units/topic"


const CURRENT_YEAR = DateTime.now().year


export function TopicListItem(props: { categories: Record<string, Category>, topic: Topic; index: number }) {
  const { categories, topic } = props
  const category = categories[ topic.category_id.toString() ]
  const datetime = DateTime.fromISO(topic.created_at)

  return (
    <List.Item
      icon={{ source: Icon.Circle, tintColor: category?.color ? `#${category?.color}` : Color.SecondaryText }}
      title={topic.title}
      subtitle={undefined}
      // accessoryIcon={{ source: Icon.Calendar }}
      accessoryTitle={
        datetime.year === CURRENT_YEAR
          ? datetime.toLocaleString({ month: "short", day: "numeric" })
          : datetime.toLocaleString(DateTime.DATE_MED)
      }
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