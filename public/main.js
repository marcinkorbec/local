const { app, BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');

const isDev = require('electron-is-dev');
const prodUrl = url.format({
  pathname: path.join(__dirname, 'index.html'),
  protocol: 'file:',
  slashes: true,
});

require('@electron/remote/main').initialize();

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 1280,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  win.maximize();

  win.loadURL(
    isDev ? 'http://localhost:3000' : prodUrl,
  );
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('allow-insecure-localhost', 'true');

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
