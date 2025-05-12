const { app, BrowserWindow,ipcMain } = require('electron/main')
const path = require('node:path')
console.warn('main process')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // alwaysOnTop: true, //always shows on top of other windows
    frame:false,   //removes the window frame
    backgroundColor: 'green',
    title: 'My Electron App', //custom title but is overwritten by the index.html title
  // resizable: false,//   makes the window not resizable
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})