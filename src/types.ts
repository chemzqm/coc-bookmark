
export type BookmarkItemDB = Map<string, BookmarkItem[]>

export interface BookmarkItem {
  lnum: number
  line: string
  filetype: string
  annotation?: string
}

export interface DocInfo {
  lnum: number
  line: string
  filetype: string
  filepath: string
}
