export function getNowDateString(){
    const nowdate = new Date();
    const y = nowdate.getFullYear();
    const m = nowdate.getMonth()+1;
    const d = nowdate.getDate();
    const h = nowdate.getHours();
    const mn = nowdate.getMinutes();
    return [y,'年',m,'月',d,'日 ',h,':',mn].join('');
}
export function getNowTimestamp(){
    return Date.now();
}
//date 格式为yyyy-mm-dd的日期，如：2022-03-25
export function getPreDate(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}
//date 格式为yyyy-mm-dd的日期，如：2022-03-25
export function getNextDate(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}

export function getPreMonths(Year,Month){
    if(Month>12){
        Month = 12;
    }
    if(Month<0){
        Month = 1;
    }
    if(Month == 1){
        Year = Year - 1;
        Month = 12;
    }else{
        Month = Month - 1;
    }
    return {
        Year:Year,
        Month:Month
    };
}

export function getNextMonths(Year,Month){
    if(Month>12){
        Month = 12;
    }
    if(Month<0){
        Month = 1;
    }
    if(Month == 12){
        Year = Year + 1;
        Month = 1;
    }else{
        Month = Month + 1;
    }
    return {
        Year:Year,
        Month:Month
    };
}