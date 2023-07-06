import { AreaMap } from '@ant-design/maps';
import { Column } from '@ant-design/plots';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Center = () => {
  const [centerList, setCenterList] = useState([]);
  const [data, setData] = useState({ type: 'FeatureCollection', features: [] });
  useEffect(() => {
    axios.get('http://www.pudge.wang:3080/api/gdp2').then((res) => {
      setCenterList(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://www.pudge.wang:3080/api/mapdata').then((res) => {
      setData(res.data);
    });
  }, []);

  const config1 = {
    map: {
      type: 'mapbox',
      style: 'blank',
      center: [105.44594648644119, 36.254583237926056],
      zoom: 3,
      pitch: 0,
    },
    source: {
      data: data,
      parser: {
        type: 'geojson',
      },
    },
    autoFit: true,
    color: {
      field: 'value',
      value: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
      scale: {
        type: 'quantile',
      },
    },
    style: {
      opacity: 1,
      stroke: '#fff',
      lineWidth: 0.6,
      lineOpacity: 1,
    },
    state: {
      active: true,
    },
    label: {
      visible: true,
      field: 'name',
      style: {
        fill: '#000',
        opacity: 0.8,
        fontSize: 10,
        stroke: '#fff',
        strokeWidth: 1.5,
        textAllowOverlap: false,
        padding: [8, 8],
      },
    },
    tooltip: {
      items: ['name', 'value'],
    },
    zoom: {
      position: 'bottomright',
    },
    legend: {
      position: 'bottomleft',
    },
  };

  const config2 = {
    data: centerList,
    xField: 'year',
    yField: 'value',
    seriesField: 'province',
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };
  return (
    <div className="mainCenter">
      <div className="centerTop">
        <AreaMap {...config1} />
      </div>

      <div className="centerFooter">
        <Column {...config2} />
      </div>
    </div>
  );
};

export default Center;
