// config.js

let API_URL;

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  API_URL = 'https://www.tgt8.xyz/boardrop';
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  API_URL = 'http://www.BoarDrop.com.cn/boardrop';
} else {
  // 默认或测试环境
  API_URL = 'https://www.tgt8.xyz/boardrop';
}

export const config = {
  API_URL,
};