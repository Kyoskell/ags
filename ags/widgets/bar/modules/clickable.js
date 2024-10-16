import { APP_WINNAME } from "../../applauncher/main.js";
import { QS_NAME } from "../../quicksetting/main.js";

export const Arch = Widget.Button({
  class_name: "arch-button",
  on_clicked: () => App.toggleWindow(QS_NAME),
  child: Widget.Icon({
    class_name: "arch-icon",
    icon: "browse-symbolic",
  })
})

export const Launcher = Widget.Button({
  class_name: "launcher-button",
  on_clicked: () => App.toggleWindow(APP_WINNAME),
  child: Widget.Icon({
    class_name: "launcher-icon",
    icon: "launcher-symbolic",
  })
})

