"use client"

import React, { useState } from "react";

import 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";

import { Card, Metric, Text } from "@tremor/react";
import { Grid, Col, Flex } from "@tremor/react";
import { MultiSelect, MultiSelectItem } from "@tremor/react";

import JandLTable from "./JandLTable";
import CSVReader from "./CSVReader";
import _ from 'lodash';

// Organize
// フィルタリング後のCSVテーブルデータを整形処理
const get_organized = (origin:any[][]) => {

  let fdata:any[][] = [];

  // 整形1段階目
  let prev_y = '', prev_j = '', prev_b = '', prev_s = '', prev_k = '';
  let count_begin = 0, count_end = 0, count_leave = 0;
  for (let i=1; i<origin.length; i++) {
    let temp = origin[i];
    let fdatarow:any[] = [];

    if(temp.length == 1) continue; // データが空の場合
    if(temp[6] == '') continue; // 年度が空の場合
    if(temp[3] == 9) continue; // 過去年度で退職の場合
    if(temp[6] == prev_y && temp[7] == prev_j && temp[9] == prev_b && temp[11] == prev_s && temp[13] == prev_k) continue; // 部署情報が同一の場合

    // 部署情報保存
    prev_y = temp[6], prev_j = temp[7], prev_b = temp[9], prev_s = temp[11], prev_k = temp[13];

    // 事業本部
    // 部、室、課がない最初の行にまとめる
    if( prev_j != '' && prev_b == '' && prev_s == '' && prev_k == ''){
      // 処理行から数え上げ
      count_end   = origin.filter((el:any) => { return ( 
        el[6] == prev_y && el[7] == prev_j && el[3] == 0 ) }).length;
      count_leave = origin.filter((el:any) => { return ( 
        el[6] == prev_y && el[7] == prev_j && el[3] == 1 ) }).length;
    }
    // 事業本部、室
    // 部署、課がない最初の行にまとめる
    else if(prev_j != '' && prev_b == '' && prev_s != '' && prev_k == '') {
      // 処理行から数え上げ
      count_end   = origin.filter((el:any) => { return ( 
        el[6] == prev_y && el[7] == prev_j && el[11] == prev_s && el[3] == 0 ) }).length;
      count_leave = origin.filter((el:any) => { return ( 
        el[6] == prev_y && el[7] == prev_j && el[11] == prev_s && el[3] == 1 ) }).length;
    }
    // 事業本部、部署
    // 室、課がない最初の行にまとめる
    else if(prev_j != '' && prev_b != '' && prev_s == '' && prev_k == '') {
      // 処理行から数え上げ
      count_end   = origin.filter((el:any) => { return ( 
        el[6] == prev_y && el[7] == prev_j && el[9] == prev_b && el[3] == 0 ) }).length;
      count_leave = origin.filter((el:any) => { return ( 
        el[6] == prev_y && el[7] == prev_j && el[9] == prev_b && el[3] == 1 ) }).length;
    }
    // 事業本部、部署、課
    // 室がない最初の行にまとめる
    else if(prev_j != '' && prev_b != '' && prev_s == '' && prev_k != '') {
      // 処理行から数え上げ
      count_end   = origin.filter((el:any) => { return ( 
        el[6] == prev_y && el[7] == prev_j && el[9] == prev_b && el[13] == prev_k && el[3] == 0 ) }).length;
      count_leave = origin.filter((el:any) => { return ( 
        el[6] == prev_y && el[7] == prev_j && el[9] == prev_b && el[13] == prev_k && el[3] == 1 ) }).length;
    }
    // 事業本部、部署、室
    // 課がない最初の行にまとめる
    else if(prev_j != '' && prev_b != '' && prev_s != '' && prev_k == '') {
      // 処理行から数え上げ
      count_end   = origin.filter((el:any) => { return ( 
        el[6] == prev_y && el[7] == prev_j && el[9] == prev_b && el[11] == prev_s && el[3] == 0 ) }).length;
      count_leave = origin.filter((el:any) => { return ( 
        el[6] == prev_y && el[7] == prev_j && el[9] == prev_b && el[11] == prev_s && el[3] == 1 ) }).length;
    }

    fdatarow = origin[i].slice(6, 15);
    fdatarow.push(count_end);     // 年度末の所属人数
    fdatarow.push(count_leave);   // その年度の退職者数

    fdata.push(fdatarow);
  }

  return fdata;
}

// Filter
const get_filterd = (fdata:any[][], group_j:any[], group_b:any[], group_s:any[], group_k:any[]) => {

  let filterd:any[] = fdata;
  // 事業本部
  if(group_j.length != 0){
    if( group_j.includes('---')){
      filterd = filterd.filter((el:any) => {
        return !( el[2] != '' && el[4] == '' && el[6] == '' && el[8] == '' )
      });
    }
    if( group_j.length > 1 || !group_j.includes('---') ){
      filterd = filterd.filter((el:any) => {
        return ( group_j.includes(el[2]) )
      });
    }
  }
  // 部署
  if(group_b.length != 0){
    if( group_b.includes('---')){
      filterd = filterd.filter((el:any) => {
        return !( el[4] != '' && el[6] == '' && el[8] == '' )
      });
    }
    if( group_b.length > 1 || !group_b.includes('---') ){
      filterd = filterd.filter((el:any) => {
        return ( group_b.includes(el[4]) )
      });
    }
  }
  // 室
  if(group_s.length != 0){
    if( group_s.includes('---')){
      filterd = filterd.filter((el:any) => {
        return !( el[6] != '' && el[8] == '' )
      });
    }
    if( group_s.length > 1 || !group_s.includes('---') ){
      filterd = filterd.filter((el:any) => {
        return ( group_s.includes(el[6]) )
      });
    }
  }
  // 課
  if(group_k.length != 0){
    if( group_k.includes('---')){
      filterd = filterd.filter((el:any) => {
        return !( el[6] == '' && el[8] != '' )
      });
    }
    if( group_k.length > 1 || !group_k.includes('---') ){
      filterd = filterd.filter((el:any) => {
        return ( group_k.includes(el[8]) )
      });
    }
  }

  return filterd.length === 0 ? [] : filterd;
}

// グラフ用
const get_data_for_graph = (fdata:any[][]) => {

  let fdata2:any = [];
  let fdata3:any = [];
  let fdata4A:any = [];
  let fdata4B:any = [];

  let label_year:any = [];
  let label_affiliation:any = [];

  // 整形2段階目
  // 所属名まとめ（第一の中でもいいかも）
  for (let i=0; i<fdata.length; i++) {
    let temp = fdata[i];
    let fdatarow:any[] = [];
    
    fdatarow.push(temp[0]);
    fdatarow.push(get_id(temp));
    fdatarow.push(temp[9]);
    fdatarow.push(temp[10]);

    fdata2.push(fdatarow);
  }

  // 整形3段階目
  // 年度ごとに、各所属先を列としてデータ分け（全年度で、部署の統一が必要、その年度に存在しなければ空行を置く）
  let prev_y = '';

  for (let i=fdata2.length-1; i>=0; i--) {
    let temp = fdata2[i];
    if (prev_y != temp[0]) {
      prev_y = temp[0];

      label_year.push(prev_y);
      let years = _.unzip( fdata2.filter((el:any) => { return ( el[0] == prev_y ) }) );

      fdata3.push(years);
    }
  }

  // グラフ用にJson整形
  let datasetsA:any = [],
      datasetsB:any = [];
  let seriesColor = ['red','orange','yellow','lime','green','teal','cyan',
                  'blue','indigo','violet','purple','fuchsia','pink',];
  let gdataA = {
    labels: label_year,
    datasets: datasetsA
  };
  let gdataB = {
    labels: label_year,
    datasets: datasetsB
  };
  let set_gdata:any[] = [gdataA, gdataB];

  // データなしなら空データセットを返す
  if(fdata3.length == 0 ) { return set_gdata }

  let count_affiliate = fdata3[0][0].length;
  label_affiliation = fdata3[0][1];
  for(let j=0; j<count_affiliate; j++) { // jigyo
    let data_arrayA:any[] = [],
        data_arrayB:any[] = [];
    for (let i=0; i<fdata3.length; i++) { //year
      data_arrayA.push(fdata3[i][2][j]);
      data_arrayB.push(fdata3[i][3][j]);
    }
    fdata4A.push(data_arrayA);
    fdata4B.push(data_arrayB);
  }

  for (let i=0; i<count_affiliate; i++) {
    let tcolor = seriesColor[i%seriesColor.length];
    gdataA.datasets.push(
      {
        //type: graphType,
        label: label_affiliation[i],
        data: fdata4A[i],  // 年度末所属人数
        backgroundColor: tcolor,
        borderColor: tcolor,
        pointBorderColor: tcolor,
        pointBackgroundColor: tcolor,
        fill: false,
      }
    )
    gdataB.datasets.push(
      {
        //type: graphType,
        label: label_affiliation[i],
        data: fdata4B[i],  // 年度内退職者数
        backgroundColor: tcolor,
        borderColor: tcolor,
        pointBorderColor: tcolor,
        pointBackgroundColor: tcolor,
        fill: false,
      }
    )
  }
  set_gdata = [gdataA, gdataB];
  return set_gdata;
}
// 所属先名をマージして取得
const get_id = (array:any[]) => {
  let gid = array[2];
  gid = array[4] != '' ? gid + '_' + array[4] : gid;
  gid = array[6] != '' ? gid + '_' + array[6] : gid;
  gid = array[8] != '' ? gid + '_' + array[8] : gid;

  return gid;
}

// Table
const get_data_for_table = (gdata:any[][], ori_header:any[]) => {
  
  let header:any[] = ori_header.slice(6);
  header.push('count_end');
  header.push('count_leave');

  // jsonObject用配列を作成
  let jsonObj:any = [];
  let cnt = 0;

  for (const row of gdata) {
    // 行データをobject化 {"項目名": "値", ... }形式 
    const tempObj = {};
    for (const idx in row) { 
      tempObj[header[idx]] = row[idx];
    }
    tempObj['id'] = cnt++;
    // 行データobjectを配列に追加
    jsonObj.push(tempObj);
  }

  return jsonObj;
}

// options
const options: {} = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      title: {
        display: false,
        text: '所属'
      },
      labels: {
        tooltip: true
      }
    },
  }
};

// Main
const Graph = () => {

  const [dataOrigin, setDataOrigin] = useState<any[][]>([[]]);

  // CSVReaderに渡す
  const inputDataOrigin = (data) => {
    setDataOrigin(data);
  }
  
  // 絞り込み用
  let temp = JSON.stringify(dataOrigin) !== '[[]]' ? _.unzip(dataOrigin.slice(1)) : [[]];
  const groups_jigyo_all:any[] = Array.from(new Set(temp[8]));    // 事業本部
  const groups_bu_all:any[]    = Array.from(new Set(temp[10]));   // 部署
  const groups_shitu_all:any[] = Array.from(new Set(temp[12]));   // 室
  const groups_ka_all:any[]    = Array.from(new Set(temp[14]));   // 課

  groups_jigyo_all.unshift('---');
  groups_bu_all.unshift('---');
  groups_shitu_all.unshift('---');
  groups_ka_all.unshift('---');

  const [selectedGroupsJ, setSelectedGroupsJ] = useState<any[]>([]);
  const [selectedGroupsB, setSelectedGroupsB] = useState<any[]>(['---']);
  const [selectedGroupsS, setSelectedGroupsS] = useState<any[]>(['---']);
  const [selectedGroupsK, setSelectedGroupsK] = useState<any[]>(['---']);

  // おおまかに調整
  const dataOrganized = get_organized(dataOrigin);

  // フィルタリング
  const dataFiltered = get_filterd(dataOrganized, selectedGroupsJ,selectedGroupsB,selectedGroupsS,selectedGroupsK);

  // グラフ用に整形
  const dataForGraph = get_data_for_graph(dataFiltered);

  // テーブル用にJson形式に変換
  const dataForTable = get_data_for_table(dataFiltered, dataOrigin[0]);
  
  //console.log('dataFor');
  //console.log(dataForGraph);
  //console.log(dataForTable);

  return (
    <>
      <Card className="max-w-screen-2xl mx-auto mt-4 mb-6 bg-blue-100" decoration="top" decorationColor="indigo">

        <Grid numItems={1} numItemsSm={6} numItemsLg={6} className="gap-2 ">

          <Col numColSpan={1} numColSpanLg={6}>
            <Card decoration="top" decorationColor="indigo" className="">
              <Grid numItems={1} numItemsSm={4} numItemsLg={4} className="gap-2 ">
                <Col numColSpan={1} numColSpanLg={1}>
                  <Text className="font-bold">事業本部</Text>
                  <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    value={selectedGroupsJ}
                    onValueChange={setSelectedGroupsJ}
                    placeholder="Select Groups..."
                  >
                    {groups_jigyo_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>{group}</MultiSelectItem>
                    ))}
                  </MultiSelect>
                </Col>
                <Col numColSpan={1} numColSpanLg={1}>
                  <Text className="font-bold">部署</Text>
                  <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    value={selectedGroupsB}
                    onValueChange={setSelectedGroupsB}
                    placeholder="Select Groups..."
                  >
                    {groups_bu_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>{group}</MultiSelectItem>
                    ))}
                  </MultiSelect>
                </Col>
                <Col numColSpan={1} numColSpanLg={1}>
                  <Text className="font-bold">室</Text>
                  <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    value={selectedGroupsS}
                    onValueChange={setSelectedGroupsS}
                    placeholder="Select Groups..."
                  >
                    {groups_shitu_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>{group}</MultiSelectItem>
                    ))}
                  </MultiSelect>
                </Col>
                <Col numColSpan={1} numColSpanLg={1}>
                  <Text className="font-bold">課</Text>
                  <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    value={selectedGroupsK}
                    onValueChange={setSelectedGroupsK}
                    placeholder="Select Groups..."
                  >
                    {groups_ka_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>{group}</MultiSelectItem>
                    ))}
                  </MultiSelect>
                </Col>
              </Grid>
            </Card>
          </Col>


          <Col numColSpan={1} numColSpanLg={6}>
            <Flex flexDirection="col">
              <Card decoration="top" decorationColor="indigo" className="h-20">
                <div className="flex space-x-2">
                  <Text className="font-bold">事業<br/>本部</Text>
                  <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    value={selectedGroupsJ}
                    onValueChange={setSelectedGroupsJ}
                    placeholder="Select Groups..."
                  >
                    {groups_jigyo_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>{group}</MultiSelectItem>
                    ))}
                  </MultiSelect>
                  <Text className="font-bold">部署</Text>
                  <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    value={selectedGroupsB}
                    onValueChange={setSelectedGroupsB}
                    placeholder="Select Groups..."
                  >
                    {groups_bu_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>{group}</MultiSelectItem>
                    ))}
                  </MultiSelect>
                  <Text className="font-bold">室</Text>
                  <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    value={selectedGroupsS}
                    onValueChange={setSelectedGroupsS}
                    placeholder="Select Groups..."
                  >
                    {groups_shitu_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>{group}</MultiSelectItem>
                    ))}
                  </MultiSelect>
                  <Text className="font-bold">課</Text>
                  <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    value={selectedGroupsK}
                    onValueChange={setSelectedGroupsK}
                    placeholder="Select Groups..."
                  >
                    {groups_ka_all.filter(Boolean).map((group, i) => (
                      <MultiSelectItem key={i} value={group}>{group}</MultiSelectItem>
                    ))}
                  </MultiSelect>
                </div>
              </Card>
            </Flex>
          </Col>
          <Col numColSpan={1} numColSpanLg={3}>
            <Card decoration="top" decorationColor="indigo">
              <Text className="font-bold">ChartB</Text>
              <Bar options={options} data={dataForGraph[0]} height={200} />
            </Card>
          </Col>
          <Col numColSpan={1} numColSpanLg={3}>
            <Card decoration="top" decorationColor="indigo">
              <Text className="font-bold">ChartL</Text>
              <Line options={options} data={dataForGraph[0]} height={200} />
            </Card>
          </Col>

          <Col numColSpan={1} numColSpanLg={6}>
            <Card decoration="top" decorationColor="indigo">
              <Text className="font-bold">Table</Text>
              <JandLTable dataForTable={dataForTable} />
            </Card>

            <Card decoration="top" decorationColor="indigo">
              <CSVReader inputDataOrigin={inputDataOrigin} />
            </Card>
          </Col>

        </Grid>
      </Card>
    </>
  )
};

export default Graph;