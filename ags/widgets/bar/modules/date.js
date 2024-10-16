const date = Variable("", {
    poll: [1000, 'date "+%H:%M"'],
})

export const TimeWidget = Widget.Label({
  class_name: 'time',
  label: date.bind(),
})
