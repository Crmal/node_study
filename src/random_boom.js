const { random } = require("lodash");

function random_boom(mine_field, fieldInfo) {
  for(i = 0; i<fieldInfo.count; i++){
    while (true) {
      if(mine_field[random(0,fieldInfo.height-1)][random(0,fieldInfo.width-1)] !== '*'){
        mine_field[random(0,fieldInfo.height-1)][random(0,fieldInfo.width-1)] = '*';
        break;
      }
    }
  }
  return mine_field;
}
module.exports = random_boom;