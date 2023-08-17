# mobile-device-motion

监听设备的位置和方向的改变速度，运行视频 ,效果图如下：

# 插件安装

```js
npm install mobile-device-motion

import MobileDeviceMotion from "mobile-device-motion";

new MobileDeviceMotion()
```

# cdn 形式使用插件

```js
<script src="./mobileDeviceMotion.umd.js"></script>;

const mobileDeviceMotionObj = new mobileDeviceMotion({
  minResponseMotion: 10,
  callback(motion) {
    console.log("motion:", motion);
    devTest(motion);
  },
  onSourceUpdate(e) {
    console.log("update:", e);
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
