function main_field(fieldInfo) {
  var field_Array = new Array(fieldInfo.height); //세로
  for(var col=0; col<fieldInfo.height;col++){
    field_Array[col] = new Array(fieldInfo.width); //세로칸에 가로배열
    for(var row=0; row<fieldInfo.width; row++){ //0으로 초기화
      field_Array[col][row] = 0;
    }
  }
  return field_Array;

}
module.exports = main_field;