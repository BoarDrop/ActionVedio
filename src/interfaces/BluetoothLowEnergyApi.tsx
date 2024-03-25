import { Device } from "react-native-ble-plx";
// 定义 BluetoothLowEnergyApi 接口，它有两个方法：
// 1. requestPermissions，请求权限并返回一个 Promise，resolve 的值是一个布尔值
// 在 Android 上，打开蓝牙需要请求权限，然后启用蓝牙适配器。在 iOS 上，打开蓝牙不需要请求权限，只需要启用蓝牙适配器即可。
// 2. scanForPeripherals，扫描外围设备（但这个方法在提供的代码中还没有实现）
interface BluetoothLowEnergyApi {
    requestPermissions(): Promise<boolean>;  // 请求权限
    scanForPeripherals(): void;  // 扫描外围设备
    Open_BleState(): Promise<boolean>;  // 检测蓝牙是否打开
    disconnectDevice(): Promise<boolean>;  // 断开蓝牙
    allDevices: Device[];  // 所有设备
    connectToDevice: (device: Device) => Promise<void>;  // 连接设备
    connectedDevice: Device | null;  // 已连接的设备
    // 旋转角度
    // RA: { RotationAngle_X: number, RotationAngle_Y: number, RotationAngle_Z: number };
    // 旋转四元数
    quaternion: { Quaternion_X: number, Quaternion_Y: number, Quaternion_Z: number, Quaternion_W: number };
    // 高度
    height: number | null;
    // 原始数据
    originalData: string | null;
}

export default BluetoothLowEnergyApi;