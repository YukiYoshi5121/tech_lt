import { BarChart, Card, Title, Color, Switch } from '@tremor/react';
import React from 'react';
import { useState } from 'react';
import _ from 'lodash';
import { AreaChart, LineChart } from '@tremor/react';

interface Obj {
  [prop: string]: any;
}
function uniqString(array: string[]) {
  return Array.from(new Set(array));
}

//const BarChartSample: (dataForGraph: any, type: number) => JSX.Element = (
//  dataForGraph,
//  type
//) => {
export const BarChartSample = ({ dataForGraph, type, name }) => {
  // 年度s
  const fiscal_years = uniqString(_.unzip(dataForGraph)[0]);
  // 所属先一覧
  const catedories: string[] = uniqString(_.unzip(dataForGraph)[1]);
  const col_no = type + 2;
  let chartdata: any = [];
  for (let y = 0; y < fiscal_years.length; y++) {
    let obj: Obj = {};
    obj.fiscal_year = fiscal_years[y];
    for (let i = 0; i < dataForGraph.length; i++) {
      if (fiscal_years[y] === dataForGraph[i][0]) {
        obj = {
          ...obj,
          [dataForGraph[i][1]]: dataForGraph[i][col_no],
        };
      }
    }
    chartdata.push(obj);
  }
  // 年度の昇順にソート
  chartdata.sort((a, b) => (a.fiscal_year < b.fiscal_year ? -1 : 1));

  console.log('chartdata');
  console.log(chartdata);

  let seriesColor: Color[] = [
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
    'cyan',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
  ];
  const [value, setValue] = useState(true);
  return (
    <>
      <Card decoration='top' decorationColor='indigo'>
        <div className='p-1'>
          <Title>{name}</Title>
          <BarChart
            className='mt-6'
            data={chartdata}
            index='fiscal_year'
            categories={catedories}
            colors={seriesColor}
            yAxisWidth={30}
            enableLegendSlider={value}
            showAnimation={true}
          />
        </div>
        <div className='p-3 bg-gray-50 border-t flex items-center space-x-3 rounded-b-lg'>
          <Switch
            id='switch'
            checked={value}
            onChange={() => setValue(!value)}
          />
          <label className='text-sm text-slate-500' htmlFor='switch'>
            Enable Legend Slider
          </label>
        </div>
      </Card>
    </>
  );
};
