const { query } = await Service.import("applications")
export const APP_WINNAME = "applauncher"

/** @param {import('resource:///com/github/Aylur/ags/service/applications.js').Application} app */
const AppItem = app => Widget.Button({
    class_name: "app",
    on_clicked: () => {
        App.closeWindow(APP_WINNAME)
        app.launch()
    },
    attribute: { app },
    child: Widget.Box({
        children: [
            Widget.Icon({
                icon: app.icon_name && Utils.lookUpIcon(app.icon_name) ? app.icon_name : "image-missing-symbolic",
                size: 42,
            }),
            Widget.Label({
                class_name: "app-title",
                label: app.name,
                xalign: 0,
                vpack: "center",
                truncate: "end",
                css: "color: #dbe2f9"
            }),
        ],
    }),
  css: "background-color: #3f4759;"
      + "border-radius: 10px;"
})

const Applauncher = ({ width = 500, height = 500, spacing = 12 }) => {
    // list of application buttons
    let applications = query("").map(AppItem)

    // container holding the buttons
    const list = Widget.Box({
        vertical: true,
        children: applications,
        spacing,
    })

    // repopulate the box, so the most frequent apps are on top of the list
    function repopulate() {
        applications = query("").map(AppItem)
        list.children = applications
    }

    // search entry
    const entry = Widget.Entry({
        hexpand: true,
        css: `margin-bottom: ${spacing}px;`
            + 'color: #dbe2f9;',

        // to launch the first item on Enter
        on_accept: () => {
            // make sure we only consider visible (searched for) applications
	    const results = applications.filter((item) => item.visible);
            if (results[0]) {
                App.toggleWindow(APP_WINNAME)
                results[0].attribute.app.launch()
            }
        },

        // filter out the list
        on_change: ({ text }) => applications.forEach(item => {
            item.visible = item.attribute.app.match(text ?? "")
        }),
    })

    return Widget.Box({
        vertical: true,
        css: `margin: ${spacing * 2}px;`,
        children: [
            entry,

            // wrap the list in a scrollable
            Widget.Scrollable({
                hscroll: "never",
                vscroll: "external",
                css: `min-width: ${width}px;`
                    + `min-height: ${height}px;`,
                child: list,
            }),
        ],
        setup: self => self.hook(App, (_, windowName, visible) => {
            if (windowName !== APP_WINNAME)
                return

            // when the applauncher shows up
            if (visible) {
                repopulate()
                entry.text = ""
                entry.grab_focus()
            }
        }),
    })
}

// there needs to be only one instance
export const applauncher = Widget.Window({
    name: APP_WINNAME,
    setup: self => self.keybind("Escape", () => {
        App.closeWindow(APP_WINNAME)
    }),
    visible: false,
    keymode: "exclusive",
    child: Applauncher({
        width: 500,
        height: 500,
        spacing: 12,
    }),
    css: 'border-radius: 10px;'
      + 'background-color: #37393e',
})

