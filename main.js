const { app, BrowserWindow } = require('electron')
let win;
// const server = require('./api/dist/app/server/src/index');

function createWindow () {
  // Create the browser window.
  let winConfig = {
    width: 1024,
    height: 768,
    backgroundColor: '#ffffff',
    minimizable: false,
    // resizable: false,
    frame: false,
    titleBarStyle: 'hidden',
    kiosk: true,
    webPreferences: {
      nodeIntegration: false
    }
  }

  if ( process.env.NODE_ENV === 'dev' ) {
    winConfig['frame'] = true;
    winConfig['titleBarStyle'] = 'show';
    winConfig['kiosk'] = false;
  }

  win = new BrowserWindow(winConfig);
  if( ! process.env.NODE_ENV ) {
    win.setFullScreen(true);
  }

  let appPath  = process.env.NODE_ENV === 'dev' ? 'dist/app' : 'app';

  win.loadURL(`file://${__dirname}/${ appPath }/index.html`)
  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()
  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}
// Create window on electron intialization
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
