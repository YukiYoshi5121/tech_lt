import _ from 'lodash';

export const get_data_for_graph_CJS: (fdata2: string[][]) => any[][][] = (
  fdata2
) => {
  let fdata3: string[] = [];
  let fdata4A: string[][] = [];
  let fdata4B: string[][] = [];

  let label_year: string[] = [];
  let label_affiliation: string = '';

  // 整形3段階目
  // 年度ごとに、各所属先を列としてデータ分け（全年度で、部署の統一が必要、その年度に存在しなければ空行を置く）
  let prev_y = '';

  for (let i = fdata2.length - 1; i >= 0; i--) {
    let temp = fdata2[i];
    if (prev_y != temp[0]) {
      prev_y = temp[0];

      label_year.push(prev_y);
      let years = _.unzip(
        fdata2.filter((el: any) => {
          return el[0] == prev_y;
        })
      );

      fdata3.push(years);
    }
  }

  // グラフ用にJson整形
  let datasetsA: any = [],
    datasetsB: any = [];
  let seriesColor = [
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
  let gdataA = {
    labels: label_year,
    datasets: datasetsA,
  };
  let gdataB = {
    labels: label_year,
    datasets: datasetsB,
  };
  let set_gdata: any[] = [gdataA, gdataB];

  // データなしなら空データセットを返す
  if (fdata3.length == 0) {
    return set_gdata;
  }

  let count_affiliate = fdata3[0][0].length;
  label_affiliation = fdata3[0][1];
  for (let j = 0; j < count_affiliate; j++) {
    // jigyo
    let data_arrayA: string[] = [],
      data_arrayB: string[] = [];
    for (let i = 0; i < fdata3.length; i++) {
      //year
      data_arrayA.push(fdata3[i][2][j]);
      data_arrayB.push(fdata3[i][3][j]);
    }
    fdata4A.push(data_arrayA);
    fdata4B.push(data_arrayB);
  }

  for (let i = 0; i < count_affiliate; i++) {
    let tcolor = seriesColor[i % seriesColor.length];
    gdataA.datasets.push({
      //type: graphType,
      label: label_affiliation[i],
      data: fdata4A[i], // 年度末所属人数
      backgroundColor: tcolor,
      borderColor: tcolor,
      pointBorderColor: tcolor,
      pointBackgroundColor: tcolor,
      fill: false,
    });
    gdataB.datasets.push({
      //type: graphType,
      label: label_affiliation[i],
      data: fdata4B[i], // 年度内退職者数
      backgroundColor: tcolor,
      borderColor: tcolor,
      pointBorderColor: tcolor,
      pointBackgroundColor: tcolor,
      fill: false,
    });
  }
  set_gdata = [gdataA, gdataB];
  return set_gdata;
};
