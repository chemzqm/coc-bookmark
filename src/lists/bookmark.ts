import {
  ListAction,
  ListContext,
  ListItem,
  BasicList,
  Neovim,
  Uri,
} from 'coc.nvim'
import DB from '../util/db'

export default class BookmarkList extends BasicList {
  public readonly name = 'bookmark'
  public readonly description = 'bookmark'
  public readonly defaultAction = 'delete'
  public actions: ListAction[] = []

  constructor(protected nvim: Neovim, private db: DB) {
    super(nvim)

    this.addLocationActions()

    this.addAction('preview', async (item: ListItem, context) => {
      const { bookmark } = item.data
      const { line, filetype } = bookmark
      const lines = [line]
      await this.preview({            // TODO: annotation
        bufname: 'bookmark',
        sketch: true,
        filetype,
        lines,
      }, context)
    }, { persist: true, reload: true })

    this.addAction('delete', async (item: ListItem) => {
      const { bookmark, path } = item.data
      const { lnum } = bookmark
      await this.db.delete(path, lnum)
    }, { persist: true, reload: true })
  }

  public async loadItems(_context: ListContext): Promise<ListItem[]> {
    const map = await this.db.load()
    let res: ListItem[] = []
    for (const [path, bookmarks] of map.entries()) {
      for (const bookmark of bookmarks) {
        const { lnum, annotation } = bookmark
        res.push({
          label: `${path.toString()} line: ${lnum}\t\t${annotation ? annotation : ''}`,
          filterText: annotation + path,
          data: Object.assign({}, { path, bookmark }),
          location: Uri.file(path).toString()
        })
      }
    }
    return res
  }

  public doHighlight(): void {
    let { nvim } = this
    nvim.pauseNotification()
    nvim.command('syntax match BookmarkFilePath /\\v^.*line: \\d+/', true)
    nvim.command('syntax match BookmarkAnnotation /\\v\\t.*$/', true)
    nvim.command('highlight default link BookmarkFilePath String', true)
    nvim.command('highlight default link BookmarkAnnotation Statement', true)
    nvim.resumeNotification().catch(_e => {
      // noop
    })
  }
}
