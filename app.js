const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const { blurNativeFocused } = require("@taiga-ui/cdk");
const { reduce } = require("highcharts");

process.env.NODE_ENV = "production";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    icon: "src/icon.ico",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: false,
    },
  });

  // create a new `splash`-Window
  var splash = new BrowserWindow({
    width: 940,
    height: 390,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
  });

  splash.loadFile("./splash.html");
  splash.center();
  // splash.close();
  setTimeout(function () {
    splash.close();
    mainWindow.center();
    mainWindow.maximize();
    mainWindow.show();
  }, 5000);
  // mainWindow.show();

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/www/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
