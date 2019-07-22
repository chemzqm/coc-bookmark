
export interface BookmarkItem {
  lnum: number
  line: string
  filetype: string
  annotation?: string
}

// export interface BookmarkItemDB {
//   bookmark: BookmarkItem
//   path: string
// }

export type BookmarkItemDB = Map<string, BookmarkItem[]>
