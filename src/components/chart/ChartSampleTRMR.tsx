import { BarChart, Card, Title, Color } from '@tremor/react';
import React from 'react';
import _ from 'lodash';

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
  const catedories: string[] = uniqString(_.unzip(dataForGraph)[2]);
  const col_no = type + 3;
  let chartdata: any = [];
  for (let y = 0; y < fiscal_years.length; y++) {
    let obj: Obj = {};
    obj.fiscal_year = fiscal_years[y];
    for (let i = 0; i < dataForGraph.length; i++) {
      if (
        fiscal_years[y] === dataForGraph[i][0] &&
        dataForGraph[i][col_no].toString() !== '0'
      ) {
        obj = {
          ...obj,
          [dataForGraph[i][2]]: dataForGraph[i][col_no],
        };
      }
    }
    chartdata.push(obj);
  }
  // 年度の昇順にソート
  chartdata.sort((a, b) => (a.fiscal_year < b.fiscal_year ? -1 : 1));

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
            enableLegendSlider={true}
            showAnimation={true}
            allowDecimals={false}
          />
        </div>
      </Card>
    </>
  );
};
