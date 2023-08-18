# mobile-device-motion

能做的事情：监听设备的位置移动，手机摇一摇功能，摇动设备搭配 websocket 和其他设备进行一些有趣的交互等等。

监听设备的位置和方向的改变速度，运行视频 ,效果图如下：

[DeviceMotionEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent) 是一项实验性技术
在将其用于生产之前，请仔细检查浏览器兼容性表格。

由于运行环境的不同，浏览器对 API 的调用是有限制的，比如需要点击触发、需要 localhost 下运行、https 协议等的条件才能获取到设备运动的数据。

# 安装

```js
npm install mobile-device-motion

import MobileDeviceMotion from "mobile-device-motion";

const mobileDeviceMotionObj = new MobileDeviceMotion(option)
```

# 使用 CDN 引用

```js
<script src="./mobileDeviceMotion.umd.js"></script>;

const mobileDeviceMotionObj = new mobileDeviceMotion({
  minResponseMotion: 2,
  callback(motion) {
    console.log("motion:", motion);
    devTest(motion);
  },
  onChange(e) {
    console.log("change:", e);
  },
});

// 开始监听
document.querySelector("#onMotion").onclick = function () {
  mobileDeviceMotionObj.init();
};

// 移除监听
document.querySelector("#removeMotion").onclick = function () {
  mobileDeviceMotionObj.removeEvent();
};
```

# 启动和移除监听

- `init()` 启动监听，返回 `{status: number, msg: string}`
- `removeEvent()` 移除监听函数 `{status: number, msg: string}`

# 参数

## callback(motion) {}

监听到设备运动时的回调函数, `motion` 是一个对象 {x, y, z}

## minResponseMotion: number

最小响应值，内部会判断 `x+y+z >= minResponseMotion`，才会调用 callback 函数

## onChange(e) {}

设备运动的值`(x,y,z)`改变时，都会触发，不会判断`minResponseMotion`

# 疑问

为什么在手机水平放置不动的时候，也会触发 onChange?
`devicemotion` 事件是用于监测设备的运动和方向变化的 JavaScript 事件。它可以用于获取设备的加速度、角速度和倾斜等信息。然而，在某些情况下，即使设备看似静止，`devicemotion` 事件仍然可能会被触发，这可能会导致一些困惑。

这可能是由于以下几个原因导致的：

1. **传感器噪声和精度问题：** 手机内部的传感器（如加速度计和陀螺仪）可能存在噪声和精度问题，导致即使设备静止也会产生微小的变化，从而触发`devicemotion`事件。

2. **软件滤波和校准：** 设备通常会应用软件滤波和校准来提高传感器数据的稳定性和准确性。这些算法可能会导致即使设备静止，传感器数据仍然会发生微小的变化。

3. **硬件特性：** 一些设备可能具有特定的硬件特性，例如温度变化、电磁干扰等，可能会影响传感器数据，即使设备静止。

为了解决这个问题，你可以考虑以下方法：

1. **数据滤波：** 在处理`devicemotion`事件数据时，应用适当的滤波算法来消除噪声，从而提高数据的准确性。

2. **数据阈值：** 设置一个合理的数据阈值，只有当传感器数据超过一定的阈值时才触发事件，从而排除微小变化的影响，`minResponseMotion`就是我们设置的阈值。

3. **多次采样：** 考虑采集多次数据样本并对它们进行平均，以降低单个样本的偶然波动对事件触发的影响。

4. **定期校准：** 可以定期校准传感器，以减少传感器数据的漂移和不准确性。

总之，`devicemotion`事件的触发可能会受到多种因素的影响，包括硬件、软件和环境等。通过适当的数据处理和校准，可以提高事件数据的准确性和可靠性。
