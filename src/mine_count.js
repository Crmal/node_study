function mine_count(boom_field) {
  for(var i = 0; i<boom_field.length; i++){
    for(var j = 0; j<boom_field[0].length; j++){
      if(boom_field[i][j] === '*'){
        for (var x = i-1; x <= i +1; x++) {
          for(var y = j-1; y <=j+1; y++){
            if(x>=0 && x<boom_field.length && y >= 0 && y < boom_field[0].length && boom_field[x][y] != "*"){
              boom_field[x][y]++;
            }
          }
        }
      }
    }
  }
  return boom_field;
}

module.exports = mine_count;