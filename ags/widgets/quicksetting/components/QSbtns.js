import { config } from "../../../config/var.js";
const network = await Service.import('network');
const bluetooth = await Service.import('bluetooth');
const notifications = await Service.import('notifications');

function QsButton({icon, label, setChevron = false, ...rest}) {
  const qsIcon = Widget.Icon({
    class_name: "qs-btn-icon",
    icon: icon,
  });

  const qsLabel = Widget.Label({
    class_name: "qs-btn-label",
    label: label,
  });

  const qsIconExtra = Widget.Icon({
    class_name: "qs-btn-icon-extra",
    icon: "chevron-right-symbolic",
  });

  const children = [
    qsIcon,
    qsLabel,
    ...(setChevron ? [qsIconExtra] : [])
  ];

  return Widget.Button({
    class_name: "qs-btn",
    tooltip_text: label,
    child: Widget.Box({
      spacing: 10,
      hpack: "start",
      vpack: "center",
      hexpand: true,
      children: children,
    }),
    ...rest
  });
}

const NetworkIndicator = QsButton({
  icon: network.wifi.bind('icon_name'),
  label: network.wifi.bind('ssid'),
  setChevron: true,
  setup: (self) => {
    self.hook(network.wifi, () => {
      self.toggleClassName("qs-btn-active", network.wifi.enabled)
    });
  },
  on_clicked: () => null,
});

const BluetoothIndicator = QsButton({
  icon: bluetooth.bind('enabled').as(on =>
    `bluetooth-${on ? "active" : "disabled"}-symbolic`),
  label: "Bluetooth",
  setChevron: true,
  setup: (self) => {
    self.hook(bluetooth, () => {
      self.toggleClassName("qs-btn-active", bluetooth.enabled)
    });
  },
  on_clicked: () => bluetooth.toggle()
});

const DND = QsButton({
  icon: "dnd-on-symbolic",
  label: "Do Not Disturb",
  setChevron: false,
  setup: (self) => {
    self.hook(notifications, () => {
      self.toggleClassName("qs-btn-active", notifications.dnd)
    });
  },
  on_clicked: () => {
    notifications.dnd = !notifications.dnd
  }
});

const DarkMode = QsButton({
  icon: "dark-mode-symbolic",
  label: "Dark Mode",
  setChevron: false,
  setup: (self) => {
    self.hook(config.dark_theme, () => {
      self.toggleClassName("qs-btn-active", config.dark_theme.value)
    });
  },
  on_clicked: () => 
    config.dark_theme.updateValue(!config.dark_theme.value),
});

export const toggleBtns = Widget.Box({
  class_name: "qs-btn-container",
  vertical: true,
  hpack: "center",
  children: [
    Widget.Box({
      hexpand: true,
      hpack: "center",
      children: [NetworkIndicator, BluetoothIndicator]
    }),
    Widget.Box({
      hexpand: true,
      hpack: "center",
      children: [DND, DarkMode]
    })
  ]
})
