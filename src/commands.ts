import { workspace, Neovim } from 'coc.nvim'
import DB from './util/db'
import { BookmarkItem } from './types'

export default class Bookmark {
  constructor(private nvim: Neovim, private db: DB) { }

  private async getDocInfo(): Promise<[
    number,
    string,
    string,
    string
  ]> {
    const doc = await workspace.document
    const lnum = await this.nvim.call('line', ['.'])
    const line = await this.nvim.line
    const filetype = doc.filetype
    const filepath = doc.uri
    return [lnum, line, filetype, filepath]
  }

  public async create(annotation: string): Promise<void> {
    const [
      lnum,
      line,
      filetype,
      filepath
    ] = await this.getDocInfo()

    const bookmark: BookmarkItem = {
      lnum,
      line,
      filetype,
      annotation
    }

    this.db.add(bookmark, filepath)
  }

  public async annotate(): Promise<void> {
    const annotation = await workspace.requestInput('Annotation')
    await this.create(annotation.trim())
  }

  public async delete(): Promise<void> {
    const [lnum, , , filepath] = await this.getDocInfo()
    await this.db.delete(filepath, lnum)
  }

  public async toggle(): Promise<void> {
    const data = await this.db.load()
    const [lnum, , , filepath] = await this.getDocInfo()
    const bookmarks = data.get(filepath)
    if (bookmarks) {
      if (bookmarks.filter(b => b.lnum === lnum).length !== 0)
        await this.delete()
    } else {
      await this.create('')
    }
  }
}
