export interface ResInfo {
  status: number;
  msg: string;
}

export interface InitOptionsType {
  minResponseMotion: number;
  callback: (motion: MotionType) => void;
  onSourceUpdate: (event: DeviceMotionEventAcceleration | null) => void;
}

export interface MotionType {
  x: number | null;
  y: number | null;
  z: number | null;
}
