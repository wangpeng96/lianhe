import { Line, Pie, Radar } from '@ant-design/plots';
import axios from 'axios';
import { useEffect, useState } from 'react';

let label = {
  type: 'inner',
  offset: '-30%',
  content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
  style: {
    fontSize: 14,
    textAlign: 'center',
  },
};

const Right = () => {
  const [allGdp, setAllGdp] = useState([]);
  const [cityGdp, setCityGdp] = useState([]);
  const [gdp, setGdp] = useState([]);

  useEffect(() => {
    axios.get('http://www.pudge.wang:3080/api/gdp').then((res) => {
      setAllGdp(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://www.pudge.wang:3080/api/city').then((res) => {
      setCityGdp(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://www.pudge.wang:3080/api/data').then((res) => {
      setGdp(res.data.data);
    });
  }, []);

  const config1 = {
    data: allGdp,
    padding: 'auto',
    xField: 'year',
    yField: 'value',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
  };

  let newArr = [];
  cityGdp.forEach((item) => {
    for (let i in item['score']) {
      newArr.push({ city: item['city'], item: i, score: item['score'][i] });
    }
  });
  const config2 = {
    data: newArr,
    xField: 'item',
    yField: 'score',
    seriesField: 'city',
    meta: {
      score: {
        alias: 'city',
        min: 0,
        max: 10,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    // 开启面积
    area: {},
    // 开启辅助点
    point: {
      size: 2,
    },
  };

  let obj = {};
  gdp.forEach((item) => {
    if (item.area in obj) {
      obj[item.area] += item.gdp;
    } else {
      obj[item.area] = item.gdp;
    }
  });
  let arr = [];
  for (let item in obj) {
    arr.push({ area: item, gdp: obj[item] });
  }

  const config3 = {
    appendPadding: 10,
    data: arr,
    angleField: 'gdp',
    colorField: 'area',
    radius: 0.8,
    label: label,
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <div className="mainRight">
      <div className="rightTop">
        <h3>过去20年全国GDP变化</h3>
        <Line {...config1} style={{ width: '100%', height: '25vh' }} />
      </div>
      <div className="rightCenter">
        <h3>一线城市对比图</h3>
        <Radar {...config2} style={{ width: '100%', height: '25vh' }} />
      </div>
      <div className="rightFooter">
        <h3>各大区GDP占比图</h3>
        <Pie {...config3} style={{ width: '100%', height: '25vh' }} />
      </div>
    </div>
  );
};

export default Right;
