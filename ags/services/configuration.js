import GLib from "gi://GLib";
import { Variable as Var } from "resource:///com/github/Aylur/ags/variable.js";

function toEnv (value = "{home}") {
  if (typeof value !== "string") {
    return value;
  }
  value.replace(/\{(\w+)\}/g, (match, envVar) => {
    return GLib.getenv(envVar) || match;
  })
}

function createNestedJSON(keys = "fst.snd", value) {
  const keyArr = keys.split(".");

  if (keyArr.length == 1) {
    return { [keys]: value };
  };

  let result = {};
  let temp = result;
  let lastIndex = keyArr.length - 1;

  for (let i = 0; i < lastIndex; i++) {
    temp[keyArr[i]] = {};
    temp = temp[keyArr[i]];
  };

  temp[keyArr[lastIndex]] = value;
  return result;
}

function accessNestedJSON(keys = "fst.snd", json = {}) {
  if (typeof keys !== "string") {
    print("Key is not a string");
    return
  }

  const keyArr = keys.split(".");
  let result = json;

  for (const key of keyArr) {
    if (key in result) {
      result = result[key];
    } else {
      return null;
    }
  }

  return result;
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, {
            [key]: {},
          });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key],
        });
      }
    }
  }

  return deepMerge(target, ...sources);
}

class Config extends Var {
  static {
    Service.register(this);
  }

  constructor(key = "", callback = () => null) {
    super("");
    
    const configPath = App.configDir + "/config/config.json";
    const config = JSON.parse(Utils.readFile(configPath) || "{}");
    const keyValue = key.includes(".")
      ? accessNestedJSON(key, config)
      : config[key];

    this.key = key;
    this.setValue(toEnv(keyValue))
    this.connect("changed", callback);
  }

  updateValue(value) {
    super.setValue(value);

    let json = createNestedJSON(this.key, value);
    this.#setConfig(json);
  }

  #setConfig(value) {
    const configPath = App.configDir + "/config/config.json";
    const config = JSON.parse(Utils.readFile(configPath) || "{}");

    const updatedConfig = deepMerge(config, value)
    const configStr = JSON.stringify(updatedConfig, null, 2);

    Utils.writeFile(configStr, configPath);
  }
}

export default (key, call) => new Config(key, call);
