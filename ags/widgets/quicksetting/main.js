import { Header } from "./header.js"
import { toggleBtns } from "./components/QSbtns.js";
import { NotificationList, NotifHeader } from "./components/notifs.js";

export const QS_NAME = "Quicksetting";

export const QS = Widget.Window({
  name: QS_NAME,
  anchor: ["right", "top"],
  margins: [20, 200, 0, 0],
  keymode: "on-demand",
  setup: (self) => self.keybind('Escape', () => App.toggleWindow(QS_NAME)),
  visible: false,
  child: Widget.Box({
    vertical: true,
    class_name: "qs",
    children: [
      Header,
      toggleBtns,
      NotifHeader,
      NotificationList()
    ]
  }),
  css: "border-radius: 20px"
})
