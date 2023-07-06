import { Bar } from '@ant-design/plots';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

const Left = () => {
  const [gdpList, setGdpList] = useState([]);

  const [str2, setStr2] = useState(0);

  const [totalStr, setTotalStr] = useState('');
  useEffect(() => {
    axios.get('http://www.pudge.wang:3080/api/overview').then((res) => {
      setStr2(res.data.data['2020']);
      setTotalStr(
        (
          ((parseFloat(res.data.data['2020']) -
            parseFloat(res.data.data['2019'])) /
            parseFloat(res.data.data['2020'])) *
          100
        ).toFixed(1) + '%',
      );
    });
  }, []);

  useEffect(() => {
    axios.get('http://www.pudge.wang:3080/api/data').then((res) => {
      setGdpList(res.data.data);
    });
  }, []);
  let arr1 = useMemo(() => {
    for (var i = 0; i < gdpList.length; i++) {
      for (var j = i + 1; j < gdpList.length; j++) {
        //如果第一个比第二个小，就交换他们两个位置
        if (gdpList[i]['gdp'] < gdpList[j]['gdp']) {
          var temp = gdpList[i];
          gdpList[i] = gdpList[j];
          gdpList[j] = temp;
        }
      }
    }
    return gdpList.slice(0, 5);
  }, [gdpList]);

  let arr2 = useMemo(() => {
    for (var a = 0; a < gdpList.length; a++) {
      for (var b = a + 1; b < gdpList.length; b++) {
        //如果第一个比第二个小，就交换他们两个位置
        if (gdpList[a]['per'] < gdpList[b]['per']) {
          var temp = gdpList[a];
          gdpList[a] = gdpList[b];
          gdpList[b] = temp;
        }
      }
    }
    return gdpList.slice(0, 5);
  }, [gdpList]);

  const config1 = {
    data: arr1,
    xField: 'gdp',
    yField: 'name',

    color: () => {
      return 'green';
    },
    // legend: true,
    meta: {
      type: {
        alias: '省',
      },
      sales: {
        alias: 'gdp',
      },
    },
    minBarWidth: 10,
    maxBarWidth: 10,
  };
  const config2 = {
    data: arr2,
    xField: 'per',
    yField: 'name',

    color: () => {
      return 'green';
    },
    // legend: true,
    meta: {
      type: {
        alias: '省',
      },
      sales: {
        alias: 'per',
      },
    },
    minBarWidth: 10,
    maxBarWidth: 10,
  };

  return (
    <div className="mainLeft">
      <div className="leftTop">
        <h3>总览</h3>
        <div className="box">
          <p>2020年国内生产总值:{str2}</p>
          {str2 && <span>同比增长：{totalStr}</span>}
        </div>
      </div>
      <div className="leftCenter">
        <h3>各省gdp top5</h3>
        <Bar {...config1} style={{ width: '100%', height: '25vh' }} />
      </div>
      <div className="leftFooter">
        <h3>各省人均gdp top5</h3>
        <Bar {...config2} style={{ width: '100%', height: '25vh' }} />
      </div>
    </div>
  );
};

export default Left;
