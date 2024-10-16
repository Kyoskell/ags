import { BatteryWidget } from "./modules/battery.js";
import { TimeWidget } from "./modules/date.js";
import { VolEvBox } from "./modules/volume.js";
import { WifiWidget } from "./modules/network.js";
import { WSWidget } from "./modules/workspace.js";
import { Arch, Launcher } from "./modules/clickable.js";
const Right = Widget.Box({
  class_name: "right",
  hpack: "end",
  children: [
    VolEvBox,
    Widget.Box({
      class_name: "combo",
      spacing: 5,
      children: [
        WifiWidget,
        BatteryWidget
      ]
    }),
    Arch
  ]
})

const Left = Widget.Box({
  class_name: "left-box",
  spacing: 10,
  children: [
    Launcher,
    WSWidget 
  ],
})

const Main = Widget.CenterBox({
  class_name: "main",
  startWidget: Left,
  centerWidget: TimeWidget,
  endWidget: Right,
})

export const StatusBar = Widget.Window({
  name: "StatusBar",
  anchor: ['left', 'top', 'right'],
  exclusivity: "exclusive",
  child: Main,
})
