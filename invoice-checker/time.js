const week = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat'
};

const month = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
};

module.exports.timereturn = function (datetime, Callback) {

    const weekname = week[datetime.getDay()];
    const monthname = month[datetime.getMonth()];
    const year = datetime.getFullYear();
    let date = datetime.getDate();
    date = date.toString();
    if (date.length == 1) {
        date = '0' + date;
    }
    Callback(weekname, monthname, year, date);
}
