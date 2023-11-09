'use client';

import React, { useState } from 'react';

import 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

import { Card, Metric, Text } from '@tremor/react';
import { Grid, Col } from '@tremor/react';
import { MultiSelect, MultiSelectItem } from '@tremor/react';
import { Flex } from '@tremor/react';

import SalesPeopleTable from './SalesPeopleTable';

import CSVReader from './CSVReader';

import _ from 'lodash';

// Graph
//フィルタリング転置＋グラフ用加工　→　フィルタ、転置含むグラフ用加工に分けて、テーブル用加工と並列できるようにする
const get_gdata = (
  filedata: string[][],
  groups: string[],
  subgroups: string[]
) => {
  // 凡例
  let legends = filedata[0];

  // フィルタリング
  let fdata = array_filter(filedata.slice(1), groups, subgroups);
  // 転置
  fdata = _.unzip(fdata);

  console.log('unzip fdara');
  console.log(fdata);

  let datasets: any = [];

  let seriesColor = ['red', 'blue', 'green'];
  let gdata = {
    labels: fdata[0],
    datasets: datasets,
  };
  for (let i = 3; i < fdata.length; i++) {
    gdata.datasets.push({
      //type: graphType,
      label: legends[i],
      data: fdata[i],
      backgroundColor: seriesColor[(i - 3) % 3],
      borderColor: seriesColor[(i - 3) % 3],
      pointBorderColor: seriesColor[(i - 3) % 3],
      pointBackgroundColor: seriesColor[(i - 3) % 3],
      fill: false,
    });
  }
  console.log('data');
  console.log(legends);
  console.log(gdata);

  return gdata;
};
// Table
const get_tdata = (
  filedata: string[][],
  groups: string[],
  subgroups: string[]
) => {};

//
const array_filter = (tdata: any, groups: any, subgroups: any) => {
  let filterd =
    groups.length == 0
      ? tdata
      : tdata.filter((el: any) => {
          return groups.includes(el[1]);
        });

  return filterd.length === 0 ? [] : filterd;
};

// options
const options = {
  responsive: true,
};

// Main
const Graph = () => {
  const [dataForGraph, setDataForGraph] = useState<string[][]>([[]]);

  const inputDataOrigin = (forGraph) => {
    setDataForGraph(forGraph);
  };

  console.log('dataForGraph');
  console.log(dataForGraph);

  // 絞り込み用
  let temp =
    JSON.stringify(dataForGraph) !== '[[]]'
      ? _.unzip(dataForGraph.slice(1))
      : [[]];
  const groups_all: string[] = Array.from(new Set(temp[1])); // 2行目以降の2列目転置
  const subgroups_all: string[] = Array.from(new Set(temp[2])); // 2行目以降の3列目転置
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const gdata = get_gdata(dataForGraph, selectedGroups, subgroups_all);

  return (
    <>
      <Card
        className='max-w-7xl mx-auto mt-4 mb-6 bg-blue-100'
        decoration='top'
        decorationColor='indigo'
      >
        <Grid numItems={1} numItemsSm={5} numItemsLg={5} className='gap-2 '>
          <Col numColSpan={1} numColSpanLg={2}>
            <Card decoration='top' decorationColor='indigo'>
              <Text className='font-bold'>ChartBar</Text>
              <Bar options={options} data={gdata} height={330} />
            </Card>
          </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Card decoration='top' decorationColor='indigo'>
              <Text className='font-bold'>ChartLine</Text>
              <Line options={options} data={gdata} height={330} />
            </Card>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Flex flexDirection='col'>
              <Card decoration='top' decorationColor='indigo' className='h-80'>
                <Text className='font-bold'>Groups</Text>
                <MultiSelect
                  className='max-w-full sm:max-w-xs'
                  value={selectedGroups}
                  onValueChange={setSelectedGroups}
                  placeholder='Select Groups...'
                >
                  {groups_all.map((group, i) => (
                    <MultiSelectItem key={i} value={group}>
                      {group}
                    </MultiSelectItem>
                  ))}
                </MultiSelect>
              </Card>

              <Card decoration='top' decorationColor='indigo' className='mt-4'>
                <CSVReader inputDataOrigin={inputDataOrigin} />
              </Card>
            </Flex>
          </Col>

          <Col numColSpan={1} numColSpanLg={5}>
            <Card decoration='top' decorationColor='indigo'>
              <Text className='font-bold'>Sales</Text>
              <SalesPeopleTable inputDataTable={gdata} />
            </Card>
          </Col>
        </Grid>
      </Card>
    </>
  );
};

export default Graph;
