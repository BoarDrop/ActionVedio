import base64 from 'react-native-base64';

interface IUseParseImu {
    parse_imu: (imu_data: any) => { RotationQuat_W: number, RotationQuat_X: number, RotationQuat_Y: number, RotationQuat_Z: number , Height: number}
}

function useParseImu(): IUseParseImu {

    function base64ToUint8Array(base64Str: string): Uint8Array {
        const binary_string = base64.decode(base64Str);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
    }

    // parse_imu函数的功能在于解析imu数据，不在于更新imu数据，在被调用的时候会接受一个参数，这个参数是imu数据
    function parse_imu(imu_data: any) {
        // 使用base64ToUint8Array函数将imu_data转换为字节数组
        let imu_data_array = base64ToUint8Array(imu_data);
        // console.log('imu_data_array: ', imu_data_array);

        // 转换常
        const scaleAccel = 0.00478515625; // 加速度 [-16g~+16g]    9.8*16/32768
        const scaleQuat = 0.000030517578125; // 四元数 [-1~+1]         1/32768
        const scaleAngle = 0.0054931640625; // 角度   [-180~+180]     180/32768
        const scaleAngleSpeed = 0.06103515625; // 角速度 [-2000~+2000]    2000/32768
        const scaleMag = 0.15106201171875; // 磁场 [-4950~+4950]   4950/32768
        const scaleTemperature = 0.01; // 温度
        const scaleAirPressure = 0.0002384185791; // 气压 [-2000~+2000]    2000/8388608
        const scaleHeight = 0.0010728836; // 高度 [-9000~+9000]    9000/8388608

        // Initialize an array to store IMU data
        let imu_dat = new Float32Array(34);
        // console.log("=============================================================")
        // Parse IMU data
        // Check the first byte
        if (imu_data_array[0] === 0x11) {
            const ctl = (imu_data_array[2] << 8) | imu_data_array[1];
            // console.log("\n subscribe tag: 0x" + ctl.toString(16));
            // console.log(" ms: ", ((imu_data_array[6] << 24) | (imu_data_array[5] << 16) | (imu_data_array[4] << 8) | imu_data_array[3]));

            let L = 7;  // Start from the 7th byte 订阅标识tag来解析剩下的数据

            function toSigned16Bit(num: number) {
                /**
                 *  在Python代码中，使用了np.short()来确保数据是短整型。这意味着数据是有符号的，所以当最高位为1时，它会被解释为负数。
                    在JavaScript代码中，没有明确的数据类型转换。因此，如 果最高位为1，它可能会被解释为一个正整数。
                 */
                // Convert to a signed 16-bit number
                return num > 0x7FFF ? num - 0x10000 : num;
            }

            // 无重力的加速度
            if ((ctl & 0x0001) !== 0) {
                const rawX = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpX = toSigned16Bit(rawX) * scaleAccel;
                L += 2;
                // console.log("\taX: " + tmpX.toFixed(3));

                const rawY = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpY = toSigned16Bit(rawY) * scaleAccel;
                L += 2;
                // console.log("\taY: " + tmpY.toFixed(3));

                const rawZ = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpZ = toSigned16Bit(rawZ) * scaleAccel;
                L += 2;
                // console.log("\taZ: " + tmpZ.toFixed(3));

                imu_dat[0] = tmpX;
                imu_dat[1] = tmpY;
                imu_dat[2] = tmpZ;
            }

            // 含重力的加速度
            if ((ctl & 0x0002) !== 0) {
                const rawX = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                let tmpX = toSigned16Bit(rawX) * scaleAccel;
                L += 2;
                // console.log("\tAX: " + tmpX.toFixed(3));

                const rawY = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                let tmpY = toSigned16Bit(rawY) * scaleAccel;
                L += 2;
                // console.log("\tAY: " + tmpY.toFixed(3));

                const rawZ = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                let tmpZ = toSigned16Bit(rawZ) * scaleAccel;
                L += 2;
                // console.log("\tAZ: " + tmpZ.toFixed(3));

                imu_dat[3] = tmpX;
                imu_dat[4] = tmpY;
                imu_dat[5] = tmpZ;
            }
            // 角速度
            if ((ctl & 0x0004) !== 0) {
                const rawGX = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpX = toSigned16Bit(rawGX) * scaleAngleSpeed;
                L += 2;
                // console.log("\tGX: " + tmpX.toFixed(3));

                const rawGY = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpY = toSigned16Bit(rawGY) * scaleAngleSpeed;
                L += 2;
                // console.log("\tGY: " + tmpY.toFixed(3));

                const rawGZ = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpZ = toSigned16Bit(rawGZ) * scaleAngleSpeed;
                L += 2;
                // console.log("\tGZ: " + tmpZ.toFixed(3));

                imu_dat[6] = tmpX;
                imu_dat[7] = tmpY;
                imu_dat[8] = tmpZ;
            }
            // 磁场
            if ((ctl & 0x0008) !== 0) {
                const rawX = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpX = toSigned16Bit(rawX) * scaleMag;
                L += 2;
                // console.log("\tCX: " + tmpX.toFixed(3));

                const rawY = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpY = toSigned16Bit(rawY) * scaleMag;
                L += 2;
                // console.log("\tCY: " + tmpY.toFixed(3));

                const rawZ = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpZ = toSigned16Bit(rawZ) * scaleMag;
                L += 2;
                // console.log("\tCZ: " + tmpZ.toFixed(3));

                imu_dat[9] = tmpX;
                imu_dat[10] = tmpY;
                imu_dat[11] = tmpZ;
            }
            // 温度、气压、高度
            if ((ctl & 0x0010) !== 0) {
                let tmpX = (imu_data_array[L] | (imu_data_array[L + 1] << 8)) * scaleTemperature; L += 2;
                // console.log("\ttemperature: " + tmpX.toFixed(2));

                let tmpU32 = ((imu_data_array[L + 2] << 16) | (imu_data_array[L + 1] << 8) | imu_data_array[L]);
                if ((tmpU32 & 0x800000) === 0x800000) {
                    tmpU32 = (tmpU32 | 0xff000000);
                }
                let tmpY = tmpU32 * scaleAirPressure; L += 3;
                // console.log("\tairPressure: " + tmpY.toFixed(3));

                tmpU32 = ((imu_data_array[L + 2] << 16) | (imu_data_array[L + 1] << 8) | imu_data_array[L]);
                if ((tmpU32 & 0x800000) === 0x800000) {
                    tmpU32 = (tmpU32 | 0xff000000);
                }
                let tmpZ = tmpU32 * scaleHeight; L += 3;
                // console.log("\theight: " + tmpZ.toFixed(3));

                imu_dat[12] = tmpX;
                imu_dat[13] = tmpY;
                imu_dat[14] = tmpZ;
            }

            // 四元数
            if ((ctl & 0x0020) !== 0) {
                const rawAbs = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpAbs = toSigned16Bit(rawAbs) * scaleQuat;
                L += 2;
                // console.log("\tw: " + tmpAbs.toFixed(3));

                const rawX = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpX = toSigned16Bit(rawX) * scaleQuat;
                L += 2;
                // console.log("\tx: " + tmpX.toFixed(3));

                const rawY = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpY = toSigned16Bit(rawY) * scaleQuat;
                L += 2;
                // console.log("\ty: " + tmpY.toFixed(3));

                const rawZ = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpZ = toSigned16Bit(rawZ) * scaleQuat;
                L += 2;
                // console.log("\tz: " + tmpZ.toFixed(3));

                imu_dat[15] = tmpAbs;
                imu_dat[16] = tmpX;
                imu_dat[17] = tmpY;
                imu_dat[18] = tmpZ;
            }

            // 角度
            if ((ctl & 0x0040) !== 0) {
                const rawX = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpX = toSigned16Bit(rawX) * scaleAngle;
                L += 2;
                // console.log("\tangleX: " + tmpX.toFixed(3));

                const rawY = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpY = toSigned16Bit(rawY) * scaleAngle;
                L += 2;
                // console.log("\tangleY: " + tmpY.toFixed(3));

                const rawZ = imu_data_array[L] | (imu_data_array[L + 1] << 8);
                const tmpZ = toSigned16Bit(rawZ) * scaleAngle;
                L += 2;
                // console.log("\tangleZ: " + tmpZ.toFixed(3));

                imu_dat[19] = tmpX;
                imu_dat[20] = tmpY;
                imu_dat[21] = tmpZ;
            }
            // 惯导三维位置
            if ((ctl & 0x0080) !== 0) {
                let tmpX = (imu_data_array[L] | (imu_data_array[L + 1] << 8)) / 1000.0; L += 2;
                // console.log("\toffsetX: " + tmpX.toFixed(3));
                let tmpY = (imu_data_array[L] | (imu_data_array[L + 1] << 8)) / 1000.0; L += 2;
                // console.log("\toffsetY: " + tmpY.toFixed(3));
                let tmpZ = (imu_data_array[L] | (imu_data_array[L + 1] << 8)) / 1000.0; L += 2;
                // console.log("\toffsetZ: " + tmpZ.toFixed(3));

                imu_dat[22] = tmpX;
                imu_dat[23] = tmpY;
                imu_dat[24] = tmpZ;
            }
            // 活动检测 - 步数 - 是否活动
            if ((ctl & 0x0100) !== 0) {
                let tmpU32 = ((imu_data_array[L + 3] << 24) | (imu_data_array[L + 2] << 16) | (imu_data_array[L + 1] << 8) | imu_data_array[L]); L += 4;
                // console.log("\tsteps: " + tmpU32);
                let tmpU8 = imu_data_array[L]; L += 1;
                if (tmpU8 & 0x01) {
                    // console.log("\t walking yes");
                    imu_dat[25] = 100;
                } else {
                    // console.log("\t walking no");
                    imu_dat[25] = 0;
                }
                if (tmpU8 & 0x02) {
                    // console.log("\t running yes");
                    imu_dat[26] = 100;
                } else {
                    // console.log("\t running no");
                    imu_dat[26] = 0;
                }
                if (tmpU8 & 0x04) {
                    // console.log("\t biking yes");
                    imu_dat[27] = 100;
                } else {
                    // console.log("\t biking no");
                    imu_dat[27] = 0;
                }
                if (tmpU8 & 0x08) {
                    // console.log("\t driving yes");
                    imu_dat[28] = 100;
                } else {
                    // console.log("\t driving no");
                    imu_dat[28] = 0;
                }
            }
            // console.log("imu_dat: ", imu_dat);


            // // 只需要返回json格式，只包含角度
            // return {
            //     "RotationAngle_X": Math.floor(imu_dat[19]),
            //     "RotationAngle_Y": Math.floor(imu_dat[20]),
            //     "RotationAngle_Z": Math.floor(imu_dat[21]),
            // }
            // 只需要返回json格式，只包含四元数
            return {
                "RotationQuat_W": imu_dat[15],
                "RotationQuat_X": imu_dat[16],
                "RotationQuat_Y": imu_dat[17],
                "RotationQuat_Z": imu_dat[18],
                // 返回高度
                "Height": imu_dat[14],
            }

        }
        // console.log("=============================================================")

        // 默认返回值
        return {
            "RotationQuat_W": 0,
            "RotationQuat_X": 0,
            "RotationQuat_Y": 0,
            "RotationQuat_Z": 0,
            "Height": 0,
        }
    }

    return {
        parse_imu,              // parse_imu: 解析imu数据
    }
}

export default useParseImu;