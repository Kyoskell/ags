const GLib = imports.gi.GLib;

export async function sh(cmd) {
  return Utils.execAsync(cmd).catch((err) => {
    console.error(typeof cmd === "string" ? cmd : cmd.join(" "), err);
    return "";
  });
}

export async function bash(strings, ...values) {
  const cmd =
      typeof strings === "string"
        ? strings
        : strings.flatMap((str, i) => str + `${values[i] ?? ""}`).join("");

    return Utils.execAsync(["bash", "-c", cmd]).catch((err) => {
      console.error(cmd, err);
      return "";
    });
}

export function getCurrentTime(fmt = "") {
  return GLib.DateTime.new_now_local().format(fmt)
}
