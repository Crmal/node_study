import express from 'express';
import { join } from 'path';
import { sequelize } from "./models/index.js";

const app = express();
const port = 3000;
//Api
import authApi from './api/auth.js';
import postsApi from './api/api.js';
//apps
app.use(express.json());
app.set('views', join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

sequelize // 시퀄라이즈 연결
  .sync({ force: false }) // force는 서버 실행시마다 테이블 재생성 여부
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.use('/auth', authApi);
app.use('/api', postsApi);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});