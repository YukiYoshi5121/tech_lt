'use client';

import React, { useState } from 'react';

import 'chart.js/auto';

import { Card, Text } from '@tremor/react';
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

// tremorのBarChartSample
import { BarChartSample } from './chart/ChartSampleTRMR';

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
        className='max-w-screen-xl mx-auto mt-4 mb-6 bg-blue-100'
        decoration='top'
        decorationColor='indigo'
      >
        <Grid numItems={1} numItemsSm={6} numItemsLg={6} className='gap-2 '>
          <Col numColSpan={1} numColSpanLg={6}>
            <Card
              decoration='top'
              decorationColor='indigo'
              className='h-24 p-3'
            >
              <Grid
                numItems={1}
                numItemsSm={4}
                numItemsLg={4}
                className='gap-2 '
              >
                <Col numColSpan={1} numColSpanLg={1}>
                  <Text className='font-bold'>事業 本部</Text>
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
                <Col numColSpan={1} numColSpanLg={1}></Col>
                <Col numColSpan={1} numColSpanLg={1}>
                  <CSVReader inputDataOrigin={inputDataOrigin} />
                </Col>
              </Grid>
            </Card>
          </Col>

          <Col numColSpan={1} numColSpanLg={3}>
            <BarChartSample
              dataForGraph={dataForGraph}
              type={0}
              name={'年度末の在籍者数'}
            />
          </Col>
          <Col numColSpan={1} numColSpanLg={3}>
            <BarChartSample
              dataForGraph={dataForGraph}
              type={1}
              name={'年度内の退職者数'}
            />
          </Col>

          <Col numColSpan={1} numColSpanLg={6}>
            <Card decoration='top' decorationColor='indigo'>
              <Text className='font-bold text-tremor-title'>
                データテーブル
              </Text>
              <JandLTable dataForTable={dataForTable} />
            </Card>
          </Col>
        </Grid>
      </Card>
    </>
  );
};

export default Graph;
