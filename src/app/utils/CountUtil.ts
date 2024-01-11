// NOTE(hajae): 3자리 수마다 ','를 넣어서 문자열로 반환
const addCommasToNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default addCommasToNumber;