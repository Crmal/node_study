const express = require("express");
const morgan = require("morgan");

const { sequelize } = require("./models");
const apiRouter = require("./api");
const app = express();
const port = 3000;
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use('/', apiRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});