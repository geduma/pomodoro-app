import { app, BrowserWindow } from 'electron'
import path from 'path'

const isMac = process.platform === 'darwin'
if (isMac) app.dock?.hide()

const createWindow = (): void => {
  const main = new BrowserWindow({
    width: 250,
    height: 350,
    // frame: false,
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js')
    }
  })

  main.setAlwaysOnTop(true, 'screen-saver')
  main.setVisibleOnAllWorkspaces(true)
  main.unmaximize()
  main.loadFile(path.join(__dirname, '../../index.html')).catch(err => {
    console.error(err)
  })
}

app.whenReady().then(() => {
  createWindow()
}).catch(err => console.error(err))

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') app.quit()
  app.quit()
})

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
// app.on('activate', function () {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow()
// })
