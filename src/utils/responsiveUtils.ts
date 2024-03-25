import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// // 设计基准
// const baseWidth = 320;     // 设计基准宽度
// const baseHeight = 60;     // 设计基准高度
// const baseFontSize = 20;  // 设计基准字体

// // 转换宽度到屏幕的百分比
// export const widthPercent = (width: number): string => `${wp((width / baseWidth) * 89)}%`;

// // 转换高度到屏幕的百分比
// export const heightPercent = (height: number): string => `${hp((height / baseHeight) * 8)}%`;

// // 转换字体大小到适应屏幕的百分比
// export const fontSizePercent = (fontSize: number): string => `${hp((fontSize / baseFontSize) * 5.6)}%`;

// 直接使用 wp 和 hp 函数，而不是返回字符串
export const widthPercent = (width: number): number => wp((width / 320) * 89);
export const heightPercent = (height: number): number => hp((height / 60) * 8);
export const fontSizePercent = (fontSize: number): number => wp((fontSize / 16) * 4.4);
export const marginTopPercent = (marginTop: number): number => hp((marginTop / 5) * 0.66);
export const marginBottomPercent = (marginBottom: number): number => hp((marginBottom / 5) * 0.66);
