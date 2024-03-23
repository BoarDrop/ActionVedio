// config.js

let API_URL;
let TOKEN;
TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOjEsImV4cCI6MTcxMjY3MDc3OCwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSIsIk5hbWUiOiJ1c2VyMSJ9.Nig2ZZwwqXdlU_mIRqcMSynV6LdE4_Olu4pARTKC4Kk';
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  API_URL = 'https://www.BoarDrop.com.cn/boardrop';
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  API_URL = 'https://www.BoarDrop.com.cn/boardrop';
} else {
  // 默认或测试环境
  API_URL = 'https://www.BoarDrop.com.cn/boardrop';
}

export const config = {
  API_URL, TOKEN
};
