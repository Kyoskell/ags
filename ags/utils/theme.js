import { config } from "../config/var.js";

function setScssVars(theme) {
  Utils.writeFileSync(
    JSONStringify("${{key}}: {{value}};", theme),
    App.configDir + "/style/_colors.scss"
  );
}

function JSONStringify(format, json) {
  let result = "";

  for (let key in json) {
    let value = json[key];
    result += format.replace("{{key}}", key).replace("{{value}}", value) + "\n";
  }

  return result;
}


export function setTheme() {
  let colors = Utils.readFile(App.configDir + "/config/colors.json");

  let themeJSON = JSON.parse(colors || "{}");
  let themeMode = config.dark_theme.value ? "dark" : "light";
  let theme = themeJSON["colors"][themeMode];

  setScssVars(theme);
}
