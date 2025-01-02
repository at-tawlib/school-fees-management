const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");

const DatabaseHandler = require("./scripts/db/db-handler");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "School Management System",
    width: 1200,
    height: 800,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "src/html/index.html"));
}

// app.whenReady().then(createWindow);
app.whenReady().then(() => {
  try {
    new DatabaseHandler();
    createWindow();
  } catch (error) {
    console.error(error.message);
    dialog.showErrorBox(
      "Database Error",
      `An error occurred while initializing the database:\n\n${error.message}`
    );
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
