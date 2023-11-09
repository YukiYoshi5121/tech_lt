// CSVテーブルデータを整形処理
export const get_organized = (origin: any[][]) => {
  let fdata: any[][] = [];

  // 整形1段階目
  let prev_y = '',
    prev_j = '',
    prev_b = '',
    prev_s = '',
    prev_k = '';
  let count_begin = 0,
    count_end = 0,
    count_leave = 0;
  for (let i = 1; i < origin.length; i++) {
    let temp = origin[i];
    let fdatarow: any[] = [];

    if (temp.length == 1) continue; // データが空の場合
    if (temp[6] == '') continue; // 年度が空の場合
    if (temp[3] == 9) continue; // 過去年度で退職の場合
    if (
      temp[6] == prev_y &&
      temp[7] == prev_j &&
      temp[9] == prev_b &&
      temp[11] == prev_s &&
      temp[13] == prev_k
    )
      continue; // 部署情報が同一の場合

    // 部署情報保存
    (prev_y = temp[6]),
      (prev_j = temp[7]),
      (prev_b = temp[9]),
      (prev_s = temp[11]),
      (prev_k = temp[13]);

    // 事業本部
    // 部、室、課がない最初の行にまとめる
    if (prev_j != '' && prev_b == '' && prev_s == '' && prev_k == '') {
      // 処理行から数え上げ
      count_end = origin.filter((el: any) => {
        return el[6] == prev_y && el[7] == prev_j && el[3] == 0;
      }).length;
      count_leave = origin.filter((el: any) => {
        return el[6] == prev_y && el[7] == prev_j && el[3] == 1;
      }).length;
    }
    // 事業本部、室
    // 部署、課がない最初の行にまとめる
    else if (prev_j != '' && prev_b == '' && prev_s != '' && prev_k == '') {
      // 処理行から数え上げ
      count_end = origin.filter((el: any) => {
        return (
          el[6] == prev_y && el[7] == prev_j && el[11] == prev_s && el[3] == 0
        );
      }).length;
      count_leave = origin.filter((el: any) => {
        return (
          el[6] == prev_y && el[7] == prev_j && el[11] == prev_s && el[3] == 1
        );
      }).length;
    }
    // 事業本部、部署
    // 室、課がない最初の行にまとめる
    else if (prev_j != '' && prev_b != '' && prev_s == '' && prev_k == '') {
      // 処理行から数え上げ
      count_end = origin.filter((el: any) => {
        return (
          el[6] == prev_y && el[7] == prev_j && el[9] == prev_b && el[3] == 0
        );
      }).length;
      count_leave = origin.filter((el: any) => {
        return (
          el[6] == prev_y && el[7] == prev_j && el[9] == prev_b && el[3] == 1
        );
      }).length;
    }
    // 事業本部、部署、課
    // 室がない最初の行にまとめる
    else if (prev_j != '' && prev_b != '' && prev_s == '' && prev_k != '') {
      // 処理行から数え上げ
      count_end = origin.filter((el: any) => {
        return (
          el[6] == prev_y &&
          el[7] == prev_j &&
          el[9] == prev_b &&
          el[13] == prev_k &&
          el[3] == 0
        );
      }).length;
      count_leave = origin.filter((el: any) => {
        return (
          el[6] == prev_y &&
          el[7] == prev_j &&
          el[9] == prev_b &&
          el[13] == prev_k &&
          el[3] == 1
        );
      }).length;
    }
    // 事業本部、部署、室
    // 課がない最初の行にまとめる
    else if (prev_j != '' && prev_b != '' && prev_s != '' && prev_k == '') {
      // 処理行から数え上げ
      count_end = origin.filter((el: any) => {
        return (
          el[6] == prev_y &&
          el[7] == prev_j &&
          el[9] == prev_b &&
          el[11] == prev_s &&
          el[3] == 0
        );
      }).length;
      count_leave = origin.filter((el: any) => {
        return (
          el[6] == prev_y &&
          el[7] == prev_j &&
          el[9] == prev_b &&
          el[11] == prev_s &&
          el[3] == 1
        );
      }).length;
    }

    fdatarow = origin[i].slice(6, 15);
    fdatarow.push(count_end); // 年度末の所属人数
    fdatarow.push(count_leave); // その年度の退職者数

    fdata.push(fdatarow);
  }

  return fdata;
};
