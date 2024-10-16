const Audio = await Service.import('audio');

const VolumeLabel = Widget.Label({
  class_name: 'volume-label',
  setup: self => self.hook(Audio.speaker, self => {
    const volume = Audio.speaker.volume * 100;
    if (Audio.speaker.is_muted) {
      self.label = "muted"
    };
    self.label = `${Math.floor(volume)}%`;
  })
})

const VolumeIcon = Widget.Icon().hook(Audio.speaker, self => {
    const vol = Audio.speaker.volume * 100;
    const icon = [
      [101, 'overamplified'],
      [67, 'high'],
      [34, 'medium'],
      [1, 'low'],
      [0, 'muted'],
    // @ts-ignore
    ].find(([threshould]) => threshould <= vol)?.[1];
    
    if (Audio.speaker.is_muted) {
      self.icon = "audio-volume-muted-symbolic";
    };
    self.icon = `audio-volume-${icon}-symbolic`;
    self.class_name = 'volume-icon';
})

const VolumeWidget = Widget.Box({
    class_name: 'volume',
    spacing: 2,
    children: [
      VolumeIcon,
      VolumeLabel
    ]
})

export const VolEvBox = Widget.EventBox({
  on_scroll_up: () => (Audio.speaker.volume += 0.02),
  on_scroll_down: () => (Audio.speaker.volume -= 0.02),
  on_primary_click: () => (Audio.speaker.is_muted = !Audio.speaker.is_muted), 
  child: VolumeWidget
})
