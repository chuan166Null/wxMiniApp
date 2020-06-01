const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const month = a => {
  const date = new Date().getMonth() + 1;
  return date
};

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// var year = new Date().getFullYear();
// var month1 = new Date().getMonth() + 1;
const calDate = function (year, month1, setD) {

  let nowTime = formatTime(new Date());
  nowTime = Date.parse(nowTime);
  let item = [year, month1, setD];
  let endTime = formatTime(new Date(item));
  endTime = Date.parse(endTime);
  let endDate = Math.floor((endTime - nowTime) / (1000 * 60 * 60 * 24)) + 1;
  console.log(endDate)
  if (endDate === 0) {
    let cals = { calD: endDate, month: month1, info: '今', t: '天' };
    return cals
  } else if (endDate === 1) {
    let cals = { calD: endDate, month: month1, info: '明', t: '天' };
    return cals
  } else if (endDate === 2) {
    let cals = { calD: endDate, month: month1, info: '后', t: '天' };
    return cals
  } else if (endDate > 0 && endDate !== 0 && endDate !== 1 && endDate !== 2) {
    let cals = { calD: endDate, month: month1, info: '天后' };
    return cals
  } else if (endDate < 0) {
    month1++;
    console.log(endDate)
    // let endD = Math.abs(endDate);
    let endDate = calDate(year, month1, setD);
    let cals = { calD: endDate, month: month1, info: '天后' };
    return cals
    // return endDate
  };

  return endDate
};
// calDate(year, month1, 12)

module.exports = {
  formatTime: formatTime,
  month: month,
  calDate: calDate,
}
