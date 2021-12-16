const { app, BrowserWindow, ipcMain } = require('electron'); 

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.removeMenu();
  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow)

ipcMain.on('btn-exit', () => {
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})