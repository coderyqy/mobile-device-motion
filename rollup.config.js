import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/main.ts",
  output: [
    {
      file: "dist/mobileDeviceMotion.umd.js",
      format: "umd",
      name: "mobileDeviceMotion",
    },
    {
      file: "dist/mobileDeviceMotion.esm.js",
      format: "es",
      name: "mobileDeviceMotion",
    },
    {
      file: "dist/mobileDeviceMotion.common.js",
      format: "cjs",
      name: "mobileDeviceMotion",
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: "tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          // 指定编译环境为es5
          target: "es5",
        },
      },
      clean: true,
    }),
    // 利用babel转换成es5代码
    babel(),
    // 压缩代码
    terser(),
  ],
};
