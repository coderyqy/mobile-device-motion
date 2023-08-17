import { InitOptionsType, MotionType, ResInfo } from "./lib/type";

export default class MobileDeviceMotion {
  private minResponseMotion = 10; // 当用户的两次加速度差值大于这个幅度，判定用户摇动了设备

  private readonly lastX = 0;
  private readonly lastY = 0;
  private readonly lastZ = 0;

  private callback: (motion: MotionType) => void; // 用户的回调函数
  private onSourceUpdate: (event: DeviceMotionEventAcceleration | null) => void;
  private handleMotion = (event: DeviceMotionEvent) => {};

  constructor(options: InitOptionsType) {
    this.minResponseMotion = options.minResponseMotion;
    this.callback = options.callback;
    this.onSourceUpdate = options.onSourceUpdate;
  }

  private init(): ResInfo {
    if (!window.DeviceMotionEvent) {
      console.error(
        "Error: 初始化失败\nTips: \n可以尝试切换到https协议\n或者\n切换到localhost环境."
      );

      return {
        status: 0,
        msg: "设备不支持DeviceMotion或将http切换到https或切换到localhost环境",
      };
    } else {
      this.handleMotion = (event: DeviceMotionEvent) => {
        let motion = event.acceleration;

        this.onSourceUpdate && this.onSourceUpdate(motion);

        const { x, y, z } = motion as DeviceMotionEventAcceleration;

        let countMotion =
          Math.abs(x! - this.lastX) +
          Math.abs(y! - this.lastY) +
          Math.abs(z! - this.lastZ);

        if (countMotion >= this.minResponseMotion) {
          this.callback({ x, y, z });
        }
      };

      window.addEventListener("devicemotion", this.handleMotion);

      return {
        status: 1,
        msg: "初始化成功",
      };
    }
  }

  private removeEvent() {
    window.removeEventListener("devicemotion", this.handleMotion, false);
  }
}
