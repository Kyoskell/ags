import Config from "../services/configuration.js";
import { setTheme } from "../utils/theme.js";

export const config = {
  dark_theme: Config("dark_theme", setTheme),
  wallpaper: {
    folder: Config("wallpaper.folder", undefined),
    current: Config("wallpaper.current", undefined),
  },
};
