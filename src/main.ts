import { InitOptionsType, MotionType, ResInfo } from "./lib/type";

export default class MobileDeviceMotion {
  private minResponseMotion = 10; // 当用户的两次加速度差值大于这个幅度，判定用户摇动了设备

  private isStart = false; // 是否已经开始监听运动

  private callback: (motion: MotionType) => void; // 用户的回调函数
  private onChange: (event: DeviceMotionEventAcceleration | null) => void;
  private handleMotion = (event: DeviceMotionEvent) => {};

  constructor(options: InitOptionsType) {
    this.minResponseMotion = options.minResponseMotion;
    this.callback = options.callback;
    this.onChange = options.onChange;
  }

  public init(): ResInfo {
    if (!window.DeviceMotionEvent) {
      console.error(
        "Error: 初始化失败\nTips: \n可以尝试切换到https协议\n或者\n切换到localhost环境."
      );

      return {
        status: 0,
        msg: "设备不支持DeviceMotion或将http切换到https或切换到localhost环境",
      };
    } else {
      if (!this.isStart) {
        this.handleMotion = (event: DeviceMotionEvent) => {
          let motion = event.acceleration;

          this.onChange && this.onChange(motion);

          const { x, y, z } = motion as DeviceMotionEventAcceleration;

          let countMotion = Math.abs(x!) + Math.abs(y!) + Math.abs(z!);

          if (countMotion >= this.minResponseMotion) {
            this.callback({ x, y, z });
          }
        };

        window.addEventListener("devicemotion", this.handleMotion);

        this.isStart = true;

        return {
          status: 1,
          msg: "init success",
        };
      } else {
        console.warn("Warn: 你已初始化，请勿重复触发");
        return {
          status: 0,
          msg: "你已初始化，请勿重复触发",
        };
      }
    }
  }

  public removeEvent() {
    window.removeEventListener("devicemotion", this.handleMotion, false);
    this.isStart = false;
    return {
      status: 1,
      msg: "remove success",
    };
  }
}
