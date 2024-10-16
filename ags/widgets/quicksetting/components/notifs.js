import { Notification } from '../../notifications/notification.js';
const notifications = await Service.import('notifications');

const ClearNotifs = Widget.Button({
  on_clicked: () => notifications.clear(),
  hpack: "center",
  hexpand: false,
  class_name: "qs-notif-clear",
  child: Widget.Box({
    hpack: "center",
    spacing: 5,
    children: [
      Widget.Label({
        label: "Clear",
        class_name: "qs-notif-clear-label",
      }),
      Widget.Icon({
        class_name: "qs-notif-clear-icon",
        icon: "user-trash-symbolic",
      })
    ]
  })
});

export const NotifHeader = Widget.CenterBox({
  class_name: "qs-notif-header",
  startWidget: Widget.Label({
    class_name: "qs-notif-header-label",
  }).hook(notifications, (self) => {
    self.label = 
      `${notifications.notifications.length} notifications`;
  }),
  endWidget: ClearNotifs
});

export function NotificationList() {
    const list = Widget.Box({
        vertical: true,
        children: notifications.notifications.map(Notification),
    })

    function onNotified(_, /** @type {number} */ id) {
        const n = notifications.getNotification(id)
        if (n)
            list.children = [Notification(n), ...list.children]
    }

    function onDismissed(_, /** @type {number} */ id) {
        list.children.find(n => n.attribute.id === id)?.destroy()
    }

    list.hook(notifications, onNotified, "notified")
        .hook(notifications, onDismissed, "dismissed")
        .hook(notifications, onDismissed, "closed")

    return Widget.Scrollable({
      class_name: "notification-list",
      hscroll: "never",
      vscroll: "external",
      child: Widget.Box({
        hexpand: true,
        vertical: true,
        child: list
      })
    })
}
