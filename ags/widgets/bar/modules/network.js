const Network = await Service.import('network');

export const WifiWidget = Widget.Icon({
  class_name: 'wifi-icon',
  icon: Network.wifi.bind('icon_name'),
  tooltipText: Network.wifi.bind('ssid').as(ssid => `${ssid}` ?? ''),
})
