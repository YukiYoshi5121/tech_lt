// テーブル用
export const get_data_for_table = (gdata: any[][], ori_header: any[]) => {
  let header: any[] = ori_header.slice(6);
  header.push('count_end');
  header.push('count_leave');

  // 年度の降順にソート
  gdata.sort((a, b) => (a[0] > b[0] ? -1 : 1));

  // jsonObject用配列を作成
  let jsonObj: any = [];
  let cnt = 0;

  for (const row of gdata) {
    if (row[5].toString() === '0' && row[6].toString() === '0') {
      continue;
    }

    // 行データをobject化 {"項目名": "値", ... }形式
    const tempObj = {};
    for (const idx in row) {
      tempObj[header[idx]] = row[idx];
    }
    tempObj['key'] = cnt++;
    // 行データobjectを配列に追加
    jsonObj.push(tempObj);
  }

  return jsonObj;
};
