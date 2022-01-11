const { random } = require('lodash');
const main_field = require('./main_field');
const random_boom = require('./random_boom');
const mine_count = require('./mine_count');
function createMineField(fieldInfo) {
  // 원하는 폭탄의 개수가 게임판의 개수보다 많을 경우에 대한 처리
  if(fieldInfo.count > fieldInfo.width * fieldInfo.height) {
    throw new Error('입력값이 잘못되었습니다.');
  }
  // 2차원 배열을 사용자에게 입력받은 숫자에 맞게 생성한다
  const mine_field = main_field(fieldInfo);
  // 폭탄을 2차원 배열에 랜덤하게 넣는다
  const random_main = random_boom(mine_field, fieldInfo);
  // 폭탄이 아닌 자리들에 알맞는 숫자를 채워넣는다
  const count = mine_count(random_main);
  // 2차원 배열을 반환한다
  console.log(count);
}

module.exports = createMineField;
