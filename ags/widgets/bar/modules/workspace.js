const Sway = await Service.import('sway');

function range(n = 9) {
    return Array.from({ length: n }, (_, i) => i + 1);
}

function dispatch(workspace = 1) {
  Utils.execAsync(`swaymsg workspace ${workspace}`);
}

export const WSWidget = Widget.Box({
  class_name: 'workspace',
  spacing: 20,
  children: range(9).map( (index) =>
    Widget.Button({
      on_clicked: () => dispatch(index),
      class_name: 'workspace-button',
      child: Widget.Icon({
        class_name: "workspace-icon"
      }).hook(Sway.active.workspace, (self) => {
        let i = `${index}`;
        self.icon = 
          `radio-button-${Sway.active.workspace.name == i ? 'checked' : 'unchecked'}-symbolic`;
      })
    })
  )
})
