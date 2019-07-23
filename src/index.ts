import {
  commands,
  ExtensionContext,
  listManager,
  workspace
} from 'coc.nvim'
import { mkdirAsync, statAsync } from './util/io'
import DB from './util/db'
import BookmarkList from './lists/bookmark'
import Bookmark from './commands'

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration('bookmark')
  const enable = config.get<boolean>('enable', true)
  if (!enable)
    return

  const { subscriptions, storagePath } = context
  const { nvim } = workspace

  const maxsize = config.get<number>('maxsize', 5000)
  const db = new DB(storagePath, 'bookmark', maxsize)
  const bookmark = new Bookmark(nvim, db)

  const stat = await statAsync(storagePath)
  if (!stat || !stat.isDirectory()) {
    await mkdirAsync(storagePath)
  }

  subscriptions.push(
    workspace.registerKeymap(
      ['n'],
      'bookmark-toggle',
      async () => await bookmark.toggle(),
      { sync: false }
    ))

  subscriptions.push(
    workspace.registerKeymap(
      ['n'],
      'bookmark-annotate',
      async () => await bookmark.annotate(),
      { sync: false }
    ))

  subscriptions.push(
    workspace.registerKeymap(
      ['n'],
      'bookmark-next',
      async () => await bookmark.find('next'),
      { sync: false }
    ))

  subscriptions.push(
    workspace.registerKeymap(
      ['n'],
      'bookmark-prev',
      async () => await bookmark.find('prev'),
      { sync: false }
    ))

  subscriptions.push(
    commands.registerCommand(
      'bookmark.toggle',
      async () => await bookmark.toggle()
    )
  )

  subscriptions.push(
    commands.registerCommand(
      'bookmark.annotate',
      async () => await bookmark.annotate()
    )
  )

  subscriptions.push(
    listManager.registerList(
      new BookmarkList(nvim, db)
    )
  )
}
