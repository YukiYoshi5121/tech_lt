// CSVテーブルデータを整形処理
export const get_organized = (origin: any[][]) => {
  let fdata: any[][] = [];

  // データを年度昇順、部署/室ID昇順でソート
  const sorted = origin.sort((a, b) => {
    if (a[6] < b[6]) return -1;
    if (a[6] > b[6]) return 1;
    if (a[8] < b[8]) return -1;
    if (a[8] > b[8]) return 1;
    if (a[10] < b[10]) return -1;
    if (a[10] > b[10]) return 1;
    return 0;
  });

  // 整形1段階目
  let prev_y = '',
    prev_j = '',
    prev_b = '';
  let count_end = 0,
    count_leave = 0;
  for (let i = 1; i < sorted.length; i++) {
    let temp = sorted[i];
    let fdatarow: any[] = [];

    if (temp.length == 1) continue; // データが空の場合
    if (temp[6] == '') continue; // 年度が空の場合
    if (temp[3] == 9) continue; // 過去年度で退職の場合

    // 年度の変換
    //temp[6] = temp[6].replace(/fy(\d{2})/, '20$1年度');

    if (temp[6] == prev_y && temp[8] == prev_j && temp[10] == prev_b) continue; // 部署情報が同一の場合

    // 部署情報保存
    (prev_y = temp[6]), (prev_j = temp[8]), (prev_b = temp[10]);

    // 事業本部
    // 部/室がない最初の行にまとめる
    if (prev_j != '' && prev_b == '') {
      // 処理行から数え上げ
      count_end = sorted.filter((el: any) => {
        return el[6] == prev_y && el[8] == prev_j && el[3] == 0;
      }).length;
      count_leave = sorted.filter((el: any) => {
        return el[6] == prev_y && el[8] == prev_j && el[3] == 1;
      }).length;
    }
    // 事業本部、部/室
    // 最初の行にまとめる
    else if (prev_j != '' && prev_b != '') {
      // 処理行から数え上げ
      count_end = sorted.filter((el: any) => {
        return (
          el[6] == prev_y && el[8] == prev_j && el[10] == prev_b && el[3] == 0
        );
      }).length;
      count_leave = sorted.filter((el: any) => {
        return (
          el[6] == prev_y && el[8] == prev_j && el[10] == prev_b && el[3] == 1
        );
      }).length;
    }

    fdatarow = sorted[i].slice(6);
    fdatarow.push(count_end); // 年度末の所属人数
    fdatarow.push(count_leave); // その年度の退職者数

    fdata.push(fdatarow);
  }

  return fdata;
};
