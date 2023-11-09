'use client';

import React, { useState } from 'react';

import 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

import { Card, Metric, Text } from '@tremor/react';
import { Grid, Col, Flex } from '@tremor/react';
import { MultiSelect, MultiSelectItem } from '@tremor/react';

import JandLTable from './JandLTable';
import CSVReader from './CSVReader';
import _ from 'lodash';

// CSVテーブルデータを整形処理
import { get_organized } from './utils/GetOrganized';
// フィルタリング
import { get_filterd } from './utils/GetFilterd';
// チャート用
import { get_data_for_graph } from './utils/GetDataForGraph';
// ChartJSチャート用
import { get_data_for_graph_CJS } from './utils/GetDataForGraphCJS';
// Table
import { get_data_for_table } from './utils/GetDataForTable';

// options
const options: {} = {
  responsive: true,
  scales: {
    y: {
      suggestedMin: 0,
      ticks: {
        stepSize: 1,
      },
    },
  },
  plugins: {
    legend: {
      position: 'right',
      title: {
        display: false,
        text: '所属',
      },
      labels: {
        tooltip: true,
      },
    },
  },
};

// Main
const Graph = () => {
  const [dataOrigin, setDataOrigin] = useState<any[][]>([[]]);

  // CSVReaderに渡す
  const inputDataOrigin = (data) => {
    setDataOrigin(data);
  };

  // 絞り込み用
  let temp =
    JSON.stringify(dataOrigin) !== '[[]]' ? _.unzip(dataOrigin.slice(1)) : [[]];
  const groups_jigyo_all: any[] = Array.from(new Set(temp[8])); // 事業本部
  const groups_bu_all: any[] = Array.from(new Set(temp[10])); // 部署
  const groups_shitu_all: any[] = Array.from(new Set(temp[12])); // 室
  const groups_ka_all: any[] = Array.from(new Set(temp[14])); // 課

  // '---': 選択すると、そのレベルの合算が表示されなくなる
  groups_jigyo_all.unshift('---');
  groups_bu_all.unshift('---');
  groups_shitu_all.unshift('---');
  groups_ka_all.unshift('---');

  const [selectedGroupsJ, setSelectedGroupsJ] = useState<any[]>([]);
  const [selectedGroupsB, setSelectedGroupsB] = useState<any[]>(['---']);
  const [selectedGroupsS, setSelectedGroupsS] = useState<any[]>(['---']);
  const [selectedGroupsK, setSelectedGroupsK] = useState<any[]>(['---']);

  // ファイル入力からおおまかに調整
  const dataOrganized: any[][] = get_organized(dataOrigin);

  // フィルタリング
  const dataFiltered: any[] = get_filterd(
    dataOrganized,
    selectedGroupsJ,
    selectedGroupsB,
    selectedGroupsS,
    selectedGroupsK
  );

  // グラフ用に整形
  const dataForGraph: any[] = get_data_for_graph(dataFiltered);
  const dataForGraphChartJS: any[] = get_data_for_graph_CJS(dataForGraph);

  // テーブル用にJson形式に変換
  const dataForTable: any = get_data_for_table(dataFiltered, dataOrigin[0]);

  //console.log('dataFor');
  //console.log(dataForGraphChartJS);
  //console.log(dataForTable);

  return (
    <>
      <Card
        className='max-w-screen-2xl mx-auto mt-4 mb-6 bg-blue-100'
        decoration='top'
        decorationColor='indigo'
      >
        <Grid numItems={1} numItemsSm={6} numItemsLg={6} className='gap-2 '>
          <Col numColSpan={1} numColSpanLg={6}>
            <Card decoration='top' decorationColor='indigo' className=''>
              <Grid
                numItems={1}
                numItemsSm={4}
                numItemsLg={4}
                className='gap-2 '
              >
                <Col numColSpan={1} numColSpanLg={1}>
                  <Text className='font-bold'>事業本部</Text>
                  <MultiSelect
                    className='max-w-full sm:max-w-xs'
                    value={selectedGroupsJ}
                    onValueChange={setSelectedGroupsJ}
                    placeholder='Select Groups...'
                  >
                    {groups_jigyo_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>
                        {group}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                </Col>
                <Col numColSpan={1} numColSpanLg={1}>
                  <Text className='font-bold'>部署</Text>
                  <MultiSelect
                    className='max-w-full sm:max-w-xs'
                    value={selectedGroupsB}
                    onValueChange={setSelectedGroupsB}
                    placeholder='Select Groups...'
                  >
                    {groups_bu_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>
                        {group}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                </Col>
                <Col numColSpan={1} numColSpanLg={1}>
                  <Text className='font-bold'>室</Text>
                  <MultiSelect
                    className='max-w-full sm:max-w-xs'
                    value={selectedGroupsS}
                    onValueChange={setSelectedGroupsS}
                    placeholder='Select Groups...'
                  >
                    {groups_shitu_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>
                        {group}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                </Col>
                <Col numColSpan={1} numColSpanLg={1}>
                  <Text className='font-bold'>課</Text>
                  <MultiSelect
                    className='max-w-full sm:max-w-xs'
                    value={selectedGroupsK}
                    onValueChange={setSelectedGroupsK}
                    placeholder='Select Groups...'
                  >
                    {groups_ka_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>
                        {group}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                </Col>
              </Grid>
            </Card>
          </Col>

          <Col numColSpan={1} numColSpanLg={6}>
            <Flex flexDirection='col'>
              <Card decoration='top' decorationColor='indigo' className='h-20'>
                <div className='flex space-x-2'>
                  <Text className='font-bold'>
                    事業
                    <br />
                    本部
                  </Text>
                  <MultiSelect
                    className='max-w-full sm:max-w-xs'
                    value={selectedGroupsJ}
                    onValueChange={setSelectedGroupsJ}
                    placeholder='Select Groups...'
                  >
                    {groups_jigyo_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>
                        {group}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                  <Text className='font-bold'>部署</Text>
                  <MultiSelect
                    className='max-w-full sm:max-w-xs'
                    value={selectedGroupsB}
                    onValueChange={setSelectedGroupsB}
                    placeholder='Select Groups...'
                  >
                    {groups_bu_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>
                        {group}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                  <Text className='font-bold'>室</Text>
                  <MultiSelect
                    className='max-w-full sm:max-w-xs'
                    value={selectedGroupsS}
                    onValueChange={setSelectedGroupsS}
                    placeholder='Select Groups...'
                  >
                    {groups_shitu_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>
                        {group}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                  <Text className='font-bold'>課</Text>
                  <MultiSelect
                    className='max-w-full sm:max-w-xs'
                    value={selectedGroupsK}
                    onValueChange={setSelectedGroupsK}
                    placeholder='Select Groups...'
                  >
                    {groups_ka_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>
                        {group}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                </div>
              </Card>
            </Flex>
          </Col>

          <Col numColSpan={1} numColSpanLg={6}>
            <Text className='font-bold'>所属別の年度末在籍者数</Text>
          </Col>
          <Col numColSpan={1} numColSpanLg={3}>
            <Card decoration='top' decorationColor='indigo'>
              <Bar
                options={options}
                data={dataForGraphChartJS[0]}
                height={200}
              />
            </Card>
          </Col>
          <Col numColSpan={1} numColSpanLg={3}>
            <Card decoration='top' decorationColor='indigo'>
              <Line
                options={options}
                data={dataForGraphChartJS[0]}
                height={200}
              />
            </Card>
          </Col>

          <Col numColSpan={1} numColSpanLg={6}>
            <Text className='font-bold'>所属別の年度内退職者数</Text>
          </Col>
          <Col numColSpan={1} numColSpanLg={3}>
            <Card decoration='top' decorationColor='indigo'>
              <Bar
                options={options}
                data={dataForGraphChartJS[1]}
                height={100}
              />
            </Card>
          </Col>
          <Col numColSpan={1} numColSpanLg={3}>
            <Card decoration='top' decorationColor='indigo'>
              <Line
                options={options}
                data={dataForGraphChartJS[1]}
                height={100}
              />
            </Card>
          </Col>

          <Col numColSpan={1} numColSpanLg={6}>
            <Text className='font-bold'>データテーブル</Text>
          </Col>
          <Col numColSpan={1} numColSpanLg={6}>
            <Card decoration='top' decorationColor='indigo'>
              <Text className='font-bold'>Table</Text>
              <JandLTable dataForTable={dataForTable} />
            </Card>

            <Card decoration='top' decorationColor='indigo'>
              <CSVReader inputDataOrigin={inputDataOrigin} />
            </Card>
          </Col>
        </Grid>
      </Card>
    </>
  );
};

export default Graph;
