'use client';

import React, { useState } from 'react';

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

function uniqString(array: string[]) {
  return Array.from(new Set(array));
}

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
  const groups_yr_all: any[] = Array.from(new Set(temp[7])); // 年度
  groups_yr_all.sort().reverse();
  const groups_jigyo_all: any[] = Array.from(new Set(temp[9])); // 事業本部
  const groups_bu_all: any[] = Array.from(new Set(temp[11])); // 部署
  console.log('groups_all');
  console.log(groups_yr_all);
  console.log(groups_jigyo_all);
  console.log(groups_bu_all);

  // '---': 選択すると、そのレベルの合算が表示されなくなる
  groups_jigyo_all.unshift('---');
  groups_bu_all.unshift('---');

  const [selectedGroupsY, setSelectedGroupsY] = useState<any[]>([]);
  const [selectedGroupsJ, setSelectedGroupsJ] = useState<any[]>([]);
  const [selectedGroupsB, setSelectedGroupsB] = useState<any[]>(['---']);

  // ファイル入力からおおまかに調整
  const dataOrganized: any[][] = get_organized(dataOrigin);
  console.log('dataOrigin');
  console.log(dataOrigin);
  console.log('dataOrganized');
  console.log(dataOrganized);

  // フィルタリング
  const dataFiltered: any[] = get_filterd(
    dataOrganized,
    selectedGroupsJ,
    selectedGroupsB,
    selectedGroupsY
  );
  console.log('dataFiltered');
  console.log(dataFiltered);

  // グラフ用に整形
  const dataForGraph: any[] = get_data_for_graph(dataFiltered);
  console.log('dataForGraph');
  console.log(dataForGraph);

  // テーブル用にJson形式に変換
  const dataForTable: any = get_data_for_table(dataFiltered, dataOrigin[0]);
  // 年度s
  const fiscal_years: string[] = uniqString(_.unzip(dataForGraph)[0]).reverse();
  console.log('dataForTable');
  console.log(dataForTable);

  return (
    <>
      <Card
        className='max-w-screen-xl mx-auto mt-4 mb-6 bg-blue-100'
        decoration='top'
        decorationColor='indigo'
      >
        <Grid numItems={1} numItemsSm={6} numItemsLg={6} className='gap-2 '>
          <Col numColSpan={1} numColSpanLg={6} className='z-20'>
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
                  <Text className='font-bold'>年度</Text>
                  <MultiSelect
                    className='max-w-full sm:max-w-xs'
                    value={selectedGroupsY}
                    onValueChange={setSelectedGroupsY}
                    placeholder='年度を選択...'
                  >
                    {groups_yr_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>
                        {group}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                </Col>
                <Col numColSpan={1} numColSpanLg={1}>
                  <Text className='font-bold'>事業本部</Text>
                  <MultiSelect
                    className='max-w-full sm:max-w-xs'
                    value={selectedGroupsJ}
                    onValueChange={setSelectedGroupsJ}
                    placeholder='事業本部を選択...'
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
                    placeholder='部署を選択...'
                  >
                    {groups_bu_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>
                        {group}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                </Col>
                <Col numColSpan={1} numColSpanLg={1}>
                  <CSVReader inputDataOrigin={inputDataOrigin} />
                </Col>
              </Grid>
            </Card>
          </Col>

          <Col numColSpan={1} numColSpanLg={3} className='z-10'>
            <BarChartSample
              dataForGraph={dataForGraph}
              type={0}
              name={'在籍者(年度末時点)'}
            />
          </Col>
          <Col numColSpan={1} numColSpanLg={3} className='z-10'>
            <BarChartSample
              dataForGraph={dataForGraph}
              type={1}
              name={'退職者(年度末時点)'}
            />
          </Col>

          <Col numColSpan={1} numColSpanLg={6}>
            <Card decoration='top' decorationColor='indigo'>
              <Text className='font-bold text-tremor-title'>
                データテーブル
              </Text>
              <JandLTable
                dataForTable={dataForTable}
                fiscalYears={fiscal_years}
              />
            </Card>
          </Col>
        </Grid>
      </Card>
    </>
  );
};

export default Graph;
