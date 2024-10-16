import { StatusBar } from "./widgets/bar/main.js";
import { applauncher } from "./widgets/applauncher/main.js";
import { QS } from "./widgets/quicksetting/main.js";
import { NotificationPopups } from "./widgets/notifications/popups.js";

Utils.monitorFile(
  `${App.configDir}` + "/style/",
  function() {
    applyScss()
  },
)

function applyScss () {
  let scss = App.configDir + "/style/style.scss";
  let css = App.configDir + "/style.css";
  Utils.execAsync(`sass ${scss} ${css}`);
  App.resetCss();
  App.applyCss(css);
}

App.config({
    icons: `${App.configDir}/assets/`,
    style: `${App.configDir}/style.css`,
    windows: [StatusBar, applauncher, QS],
    gtkTheme: "Materia",
    iconTheme: "Papirus-Dark",
})
