const Battery = await Service.import('battery');

const BatteryBulb = Widget.Box({
  class_name: "battery-bulb",
  homogeneous: false,
  vpack: "center",
})

const BatteryProgress = Widget.ProgressBar({
  class_name: "battery-progress",
  vpack: "center",
  value: Battery.bind('percent').as(p => p > 0 ? p / 100 : 0),
  tooltipText: Battery.bind('percent').as(p => `Battery: ${p}%`),
})

export const BatteryWidget = Widget.Box({
  class_name: "battery",
  children: [
    BatteryProgress,
    BatteryBulb,
  ]
})
