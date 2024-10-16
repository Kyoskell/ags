import { sh, bash, getCurrentTime } from "../utils/main.js";

class ScreenShot extends Service {
  static {
    Service.register(this)
  }

  #screenshots = Utils.HOME + "/Pictures/ScreenShots/";
  async screenshot() {
    const file = `${this.#screenshots}/${getCurrentTime()}_grim.png`;

    await sh(`grim ${file}`);
    bash(`wl-copy < ${file}`);

    Utils.notify({
      image: file,
      summary: "Screenshot",
      body: file,
      actions: {
        "Show in Files": () => sh(`xdg-open ${this.#screenshots}`),
        "View": () => sh(`xdg-open ${file}`),
        "Discard": () => sh(`rm ${file}`),
      },
      timeout: 0,
    })
  }
}

const service = new ScreenShot();

export default service;
