import { getPreferenceValues } from "@raycast/api"


// 🌸


export type Preferences = {
  api_key?: string,
  api_username?: string,
  enable_tasks: boolean
}



// 🛠


export function possiblyAuthHeaders(pref?: Preferences): { "Api-Key": string, "Api-Username": string } | {} {
  const p = pref || getPreferenceValues<Preferences>()
  const k = p.api_key?.trim()
  const u = p.api_username?.trim()

  return k && k.length > 0 && u && u.length > 0
    ? { "Api-Key": k, "Api-Username": u }
    : {}
}