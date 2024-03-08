// 导入 React 的 useMemo 和 useState 钩子函数，以及 react-native-ble-plx 中的 BleManager
import { useEffect, useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import base64 from 'react-native-base64';
import useParseImu from "./useParse_imu";

// 导入 NativeModules，它是一个 JavaScript 对象，它的属性是原生模块的名称，它的值是原生模块的实例
import { NativeModules } from 'react-native';
const { IMUParser } = NativeModules;
type IMUData = {
    RotationQuat_X: number;
    RotationQuat_Y: number;
    RotationQuat_Z: number;
    RotationQuat_W: number;
    Height: number;
    // 如果有其他属性，请在此处添加
};
// 禁用 ESLint 的 no-bitwise 规则（这段代码中并没有用到位操作，可能是为了其他地方的代码）
/* eslint-disable no-bitwise */

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
}

// 定义 useBLE 函数，它返回 BluetoothLowEnergyApi 接口的实例
function useBLE(): BluetoothLowEnergyApi {
    // 使用 useMemo 钩子来创建 BleManager 实例，确保 BleManager 只被创建一次，而不是每次组件重新渲染时都创建
    // 为什么要确保BlendManager只被创建一次呢？因为每次重新渲染时，函数组件内部的所有变量都会被重新声明，如果每次重新渲染时都创建一个新的BleManager实例，那么每次重新渲染时都会创建一个新的BleManager实例，这样会导致BleManager实例中的一些状态丢失，比如已经连接的设备，已经扫描到的设备等等，所以我们需要确保BleManager只被创建一次，这样才能保证BleManager实例中的状态不会丢失。
    // 简单介绍一下useMemo,主要功能，为什么使用它，如何使用它，以实际案例为例子，详细介绍useMemo的使用方法。
    // useMemo的主要功能是用来缓存计算结果，它的作用是避免每次重新渲染时都进行高开销的计算，它只有在依赖的值改变时才重新计算。
    // 为什么使用useMemo，因为在函数组件中，每次重新渲染时，函数组件内部的所有变量都会被重新声明，如果在函数组件中有一个高开销的计算，那么每次重新渲染时都会进行这个高开销的计算，这样会影响性能，所以我们可以使用useMemo来缓存计算结果，这样只有在依赖的值改变时才会重新计算。
    // 如何使用useMemo，useMemo接收两个参数，第一个参数是一个函数，第二个参数是一个数组，useMemo会返回第一个参数函数的返回值，useMemo会缓存第一个参数函数的返回值，只有当第二个参数数组中的值发生改变时，useMemo才会重新计算第一个参数函数的返回值。
    const bleManager = useMemo(() => new BleManager(), []);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
    // 使用 useState 钩子来存储所有的设备，并初始化为空数组
    const [allDevices, setAllDevices] = useState<Device[]>([]);
    // 电量
    const [battery, setBattery] = useState<number>(0);
    // 使用 useParseImu 钩子来解析imu数据
    const { parse_imu } = useParseImu();
    // 旋转四元数
    const [quaternion, setQuaternion] = useState<{ Quaternion_X: number, Quaternion_Y: number, Quaternion_Z: number, Quaternion_W: number }>({ Quaternion_X: 0, Quaternion_Y: 0, Quaternion_Z: 0, Quaternion_W: 0 });
    // const [RA, setRA] = useState<{ RotationAngle_X: number, RotationAngle_Y: number, RotationAngle_Z: number }>({ RotationAngle_X: 0, RotationAngle_Y: 0, RotationAngle_Z: 0 });
    const [height, setHeight] = useState<number | null>(null);
    // 定义 requestAndroid31Permissions 函数，用于请求 Android 31及其以上平台的权限
    const requestAndroid31Permissions = async () => {
        // 请求 BLUETOOTH_SCAN 权限
        const bluetoothScanPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "Bluetooth Scan Permission", // 请求权限的标题
                message: "Bluetooth Low Energy requires Bluetooth Scan permission", // 请求权限的信息
                buttonPositive: "OK", // 确认按钮的文字
            }
        );

        // 请求 BLUETOOTH_CONNECT 权限
        const bluetoothConnectPermission = await PermissionsAndroid.request(

            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Bluetooth Connect Permission",
                message: "Bluetooth Low Energy requires Bluetooth Connect permission",
                buttonPositive: "OK",
            }
        );

        // 请求 ACCESS_FINE_LOCATION 权限
        const fineLocationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message: "Bluetooth Low Energy requires Location",
                buttonPositive: "OK",
            }
        );


        // 如果所有的权限都被授予，返回 true，否则返回 false
        return (
            bluetoothScanPermission === "granted" &&
            bluetoothConnectPermission === "granted" &&
            fineLocationPermission === "granted"
        );
    };


    // 定义 requestPermissions 函数，这个函数的目的是根据不同的平台和版本请求相应的权限
    const requestPermissions = async (): Promise<boolean> => {
        console.log("Requesting permissions");
        // 检查当前设备是否是 Android
        if (Platform.OS === "android") {
            // 如果 Android 的平台 API 等级小于 31 , 我们只请求 ACCESS_FINE_LOCATION 权限
            if (Platform.OS === 'android' && Platform.Version < 31) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "Bluetooth Low Energy requires Location",
                        buttonPositive: "OK",
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                // 如果 Android 的平台 API 等级大于或等于 31
                // 我们使用之前定义的 requestAndroid31Permissions 函数
                const isAndroid31PermissionsGranted =
                    await requestAndroid31Permissions();

                return isAndroid31PermissionsGranted;
            }
        } else {
            // 对于 iOS，我们直接返回 true
            // 这是因为 iOS 会自动请求权限，不需要我们手动操作
            return true;
        }
    };

    // // 断开蓝牙
    const disconnectDevice = async () => {
        console.log("断开蓝牙连接...");
        try {
            if (connectedDevice) {
                await connectedDevice.cancelConnection();
                setConnectedDevice(null);
                setAllDevices([]);
                console.log("蓝牙连接已断开");
            } else {
                console.log("没有蓝牙连接");
            }
            return true;
        } catch (error) {
            console.error("Error disconnecting:", error);
            return false;
        }
    }

    // 定义 isDuplicteDevice 函数，用于检查设备是否已经存在于 allDevices 数组中
    const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
        devices.findIndex((device) => nextDevice.id === device.id) > -1;

    // 定义 scanForPeripherals 函数，用于扫描外围设备
    const scanForPeripherals = () => {
        console.log("Scanning for peripherals");
        // 调用 BleManager 的 startDeviceScan 方法，开始扫描外围设备
        bleManager.startDeviceScan(null, null, async (error, device) => {
            if (error) return console.error(error);
            // 打印设备名称
            // console.log("Scanning...");
            // console.log(device);// 打印设备名称
            if (device && device.name?.includes("im948")) {
                console.log("Found a im948 device:", device.name);
                // 如果设备不为空，且设备名称包含 im948
                setAllDevices((prevState: Device[]) => {
                    // 如果设备不在 allDevices 数组中，将设备添加到 allDevices 数组中
                    console.log("将设备", device.id, "添加到 allDevices 数组中");
                    if (!isDuplicteDevice(prevState, device)) {
                        return [...prevState, device];
                    }
                    return prevState;
                });
            }
        });
    };

    // 检测蓝牙是否打开
    const Open_BleState = async (): Promise<boolean> => {
        console.log("检测蓝牙是否打开");
        return new Promise((resolve) => {
            bleManager.state().then((state) => {
                // console.log(state)
                if (state === "PoweredOn") {
                    // 如果蓝牙已经打开，则返回蓝牙状态
                    console.log("蓝牙已经打开");
                    resolve(true);
                } else if (state === "PoweredOff") {
                    // 如果蓝牙未打开，打开蓝牙
                    resolve(false);
                } else {
                    // 如果蓝牙状态未知，打印错误信息
                    console.log("蓝牙状态未知，请重试");
                    resolve(false);
                }
            });
        })
    };


    // 获取蓝牙设备的服务和特征
    const getServicesAndCharacteristicsForDevice = async (device: Device | null) => {
        try {
            if (!device) {
                console.log("Device is null");
                return;
            }
            if (!device) {
                console.log("Device is null");
                return;
            }
            // 获取设备的服务
            // const services = await device.services();
            // console.log("Services for device:", services);
            console.log("\n");
            // 获取设备的特征（请务必先查看设备所有的服务信息，再选取你需要的服务进行特征提取）
            // 这里我们只需要关注两个服务：
            // 1、双向数据传输服务 - 服务UUID：0000ae30-0000-1000-8000-00805f9b34fb
            // 2、标准的电量指示服务 - 服务UUID：0000180f-0000-1000-8000-00805f9b34fb

            // // 订阅设备的电量指示服务
            // await subscribeToNotificationsForDevice(
            //     device,
            //     "0000180f-0000-1000-8000-00805f9b34fb",
            //     "00002a19-0000-1000-8000-00805f9b34fb"
            // );

            // 订阅设备的双向数据传输服务
            await subscribeToNotificationsForDevice(
                device,
                "0000ae30-0000-1000-8000-00805f9b34fb",
                "0000ae02-0000-1000-8000-00805f9b34fb"
            );

        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };


    // 订阅设备的通知（传入设备，服务ID，特征ID）
    const subscribeToNotificationsForDevice = async (
        device: Device,
        serviceUUID: string,
        characteristicUUID: string
    ) => {
        try {
            // 订阅设备的通知
            console.log("Subscribing to notifications");

            // 使用 monitorCharacteristicForService 替代 subscribeToCharacteristic。有时，某些设备或特征可能不支持订阅。
            await device.monitorCharacteristicForService(
                serviceUUID,
                characteristicUUID,
                (error, characteristic) => {
                    if (error) {
                        console.error("Error monitoring:", error);
                        return;
                    }

                    // // 使用IMUParser原生模块解析数据
                    // if (characteristic?.value) {
                    //     // console.log("开始使用IMUParser原生模块解析数据")
                    //     // console.log(characteristic?.value)
                    //     IMUParser.parseData(characteristic.value, (err: Error | null, parsedData: IMUData) => {
                    //         // console.log("使用IMUParser原生模块解析数据完成")
                    //         if (err) {
                    //             console.error("Error parsing data with IMUParser:", err);
                    //             return;
                    //         }

                    //         // console.log(parsedData);

                    //         // 这里，parsedData包含解析后的数据。
                    //         // 您可以根据需要更新状态或执行其他操作。
                    //         // 例如：setQuaternion(parsedData.quaternion);

                    //         // // 定义一个函数，四舍五入到指定的小数位数
                    //         // const roundTo = (number: number, decimalPlaces: number) => {
                    //         //     const factor = Math.pow(10, decimalPlaces);
                    //         //     return Math.round(number * factor) / factor;
                    //         // };

                    //         setQuaternion({
                    //             Quaternion_X: parsedData.RotationQuat_X,
                    //             Quaternion_Y: parsedData.RotationQuat_Y,
                    //             Quaternion_Z: parsedData.RotationQuat_Z,
                    //             Quaternion_W: parsedData.RotationQuat_W
                    //         });
                    //         // setRA({ RotationAngle_X: parse_imu_data.RotationAngle_X, RotationAngle_Y: parse_imu_data.RotationAngle_Y, RotationAngle_Z: parse_imu_data.RotationAngle_Z });
                    //         // console.log("解析后的imu数据：", parse_imu_data);
                    //         setHeight(parsedData.Height);
                    //     });
                    // }

                    const parse_imu_data = parse_imu(characteristic?.value);

                    // 定义一个函数，四舍五入到指定的小数位数
                    const roundTo = (number: number, decimalPlaces: number) => {
                        const factor = Math.pow(10, decimalPlaces);
                        return Math.round(number * factor) / factor;
                    };

                    setQuaternion({
                        Quaternion_X: roundTo(parse_imu_data.RotationQuat_X, 2),
                        Quaternion_Y: roundTo(parse_imu_data.RotationQuat_Y, 2),
                        Quaternion_Z: roundTo(parse_imu_data.RotationQuat_Z, 2),
                        Quaternion_W: roundTo(parse_imu_data.RotationQuat_W, 2)
                    });
                    // setRA({ RotationAngle_X: parse_imu_data.RotationAngle_X, RotationAngle_Y: parse_imu_data.RotationAngle_Y, RotationAngle_Z: parse_imu_data.RotationAngle_Z });
                    // console.log("解析后的imu数据：", parse_imu_data);
                    setHeight(roundTo(parse_imu_data.Height, 3));
                }
            );
        } catch (error) {
            console.error("Error subscribing to notifications:", error);
        }
    };

    // 连接蓝牙并保持连接
    const connectAndKeepAlive = async (device: Device) => {
        try {
            const deviceConnection = await bleManager.connectToDevice(device.id);   // 连接设备
            const isDeviceConnected = await deviceConnection.isConnected();         // 检查设备是否已连接
            // Ensure we're connected before proceeding
            if (isDeviceConnected) {
                console.log("Connected to device, sending keep alive command");
                // 在你尝试写入特征之前，确保你对设备进行了服务和特征的发现。当你连接到一个BLE设备后，通常需要发现它提供的所有服务和特征，这样你才能与它们互动。
                await deviceConnection.discoverAllServicesAndCharacteristics(); // 查询所有的服务和特征
                // Assuming you know the serviceUUID and characteristicUUID for the IM948 device
                const serviceUUID = "0000ae30-0000-1000-8000-00805f9b34fb";
                const characteristicUUID = "0000ae01-0000-1000-8000-00805f9b34fb";

                // 注意：每次连接模块后，要尽快发送1次保持蓝牙连接指令(即0x29指令)
                // 保持蓝牙连接指令(即0x29指令)
                // 保持蓝牙连接指令(即0x29指令)
                const keepAliveCommandArray = Array.from(new Uint8Array([0x29]));

                // Convert the keepAliveCommandArray to Base64 encoded string
                const base64EncodedCommand = base64.encode(String.fromCharCode.apply(null, keepAliveCommandArray));
                console.log("base64编码的保持连接的命令：", base64EncodedCommand);


                // Writing the "keep alive" command to the device
                // 使用 writeCharacteristicWithoutResponseForService 替代 writeCharacteristicWithResponseForService。有时，某些设备或特征可能不支持带响应的写入。
                await deviceConnection.writeCharacteristicWithoutResponseForService(
                    serviceUUID,
                    characteristicUUID,
                    base64EncodedCommand
                ).catch((error) => {
                    console.log("error", error);
                })

                const isConnected = await device.isConnected(); // 检查设备是否已连接

                if (isConnected) {
                    console.log("Device is connected");
                    // 监听设备的断开连接事件
                    device.onDisconnected((error, disconnectedDevice) => {
                        if (error) {
                            console.error("Disconnect error:", error);
                        } else {
                            console.log(`Device ${disconnectedDevice.id} is disconnected`);
                            // Handle the disconnection logic here
                            setConnectedDevice(null);
                            // 卸载监听器
                            device.cancelConnection();
                            // 设置设备数组为空
                            setAllDevices([]);
                        }
                    });
                }

                console.log("Keep alive command sent successfully!");
                return deviceConnection;
            } else {
                console.log("Failed to connect to device");
                return null;
            }
        } catch (error) {
            console.error("Error in connecting or sending command:", error);
            return null;
        }
    }


    // 连接蓝牙设备
    const connectToDevice = async (device: Device | null) => {
        try {
            if (!device) {
                console.log("Device is null");
                return;
            }
            if (!device) {
                console.log("Device is null");
                return;
            }
            // 连接设备并保持连接
            const deviceConnection = await connectAndKeepAlive(device);
            console.log("The DeviceID is", deviceConnection?.id);
            // 设置已连接的设备
            setConnectedDevice(deviceConnection);
            // // 查询所有的服务和特征
            // await deviceConnection.discoverAllServicesAndCharacteristics();
            // console.log("Services and characteristics discovered successfully");
            getServicesAndCharacteristicsForDevice(deviceConnection);


            // 停止扫描
            bleManager.stopDeviceScan();
            console.log("Scanning stopped");
        } catch (e) {
            console.log("FAILED TO CONNECT", e);
        }
    };

    // 返回一个对象，这个对象实现了 BluetoothLowEnergyApi 接口
    return {
        scanForPeripherals,  // 扫描外围设备
        requestPermissions,  // 请求权限
        Open_BleState,      // 检测蓝牙是否打开
        connectToDevice,    // 连接设备
        connectedDevice,    // 已连接的设备
        disconnectDevice,   // 断开蓝牙
        allDevices,         // 所有设备
        quaternion,        // 旋转四元数
        height             // 高度
    }
}

// 导出 useBLE 函数，这样其他模块也可以使用它
export default useBLE;