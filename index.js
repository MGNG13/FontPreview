const { app, BrowserWindow } = require("electron");

const createWindow = () =>
    new BrowserWindow({
        title: "Font Preview",
        width: 1200,
        height: 800,
        icon: null,
        center: true,
        fullscreenable: false,
        autoHideMenuBar: true,
    }).loadFile("index.html");

app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
