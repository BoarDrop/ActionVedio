// config.js

let API_URL;
let TOKEN;
TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOjQsImV4cCI6MTcxMTEyMzM0NywiZW1haWwiOiIxMjMiLCJOYW1lIjoiYm9zcyJ9.gNq_HfokOUNn4SEHL4uLiqAvrrVsCcZCDrE1UlK_lBM';
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
