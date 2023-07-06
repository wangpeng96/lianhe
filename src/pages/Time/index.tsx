import { useEffect, useState } from 'react';
const getNowTime = (time: any) => {
  // clearTimeout(t); //清除定时器
  var date = new Date();
  //年 getFullYear(): 四位数字返回年份
  var year = date.getFullYear(); //getFullYear()代替getYear()
  //月 getMonth():  ~ 11
  var month = date.getMonth() + 1;
  //日 getDate():(1 ~ 31)
  var day = date.getDate();
  //时 getHours():(  23)
  var hour = date.getHours();
  //分 getMinutes(): (0 ~ 59)
  var minute = date.getMinutes();
  //秒 getSeconds(): ( ~ 59)
  var second = date.getSeconds();
  time =
    year +
    '-' +
    addZero(month) +
    '-' +
    addZero(day) +
    '-' +
    addZero(hour) +
    ':' +
    addZero(minute) +
    ':' +
    addZero(second);

  return time;
};
const addZero = (s: any) => {
  return s < 10 ? '0' + s : s;
};
const Index = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getNowTime(new Date()));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);
  return <>{time}</>;
};

export default Index;
