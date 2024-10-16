import { sh } from "../../utils/main.js";
import { QS_NAME } from "./main.js";

function sysBtn(icon = "", action) {
  return Widget.Button({
    on_clicked: action,
    class_name: "qs-header-sysbtn",
    child: Widget.Icon({
      icon: icon,
    })
  })
}

const imgPath = App.configDir + "/assets/Kosei.png";

const Avatar = Widget.Box({
  class_name: "qs-header-avatar",
  tooltipText: Utils.USER,
  css: `background-image: url('${imgPath}');`
    + `background-size: cover;`
    + "min-height: 50px;"
    + "min-width: 50px;"
});

const closer = Widget.Button({
  on_clicked: () => App.toggleWindow(QS_NAME),
  class_name: "qs-closer",
  hpack: "end",
  vpack: "start",
  child: Widget.Icon({
    icon: "window-close-symbolic",
  })
});

const left = Widget.Box({
  spacing: 10,
  children: [
    Avatar,
    Widget.Button({
      on_clicked: () => sh('sway exit'),
      class_name: "qs-header-signout",
      child: Widget.Label('Sign out'),
    }),
    sysBtn("system-shutdown-symbolic", () => null),
    sysBtn("system-lock-screen-symbolic", () => null),
    sysBtn("preferences-system-symbolic", () => null),
  ]
})

export const Header = Widget.CenterBox({
  class_name: "qs-header",
  hexpand: true,
  hpack: "fill",
  startWidget: left,
  endWidget: closer,
})
