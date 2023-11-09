// チャート用
//export const get_data_for_graph = (fdata: string[][]) => {
export const get_data_for_graph: (fdata: string[][]) => any[][] = (fdata) => {
  let fdata2: string[][] = [];

  // 整形2段階目
  // 所属名まとめ
  for (let i = 0; i < fdata.length; i++) {
    let temp = fdata[i];
    let fdatarow: string[] = [];

    fdatarow.push(temp[0]);
    fdatarow.push(get_id(temp));
    fdatarow.push(temp[9]);
    fdatarow.push(temp[10]);

    fdata2.push(fdatarow);
  }
  console.log('fdata2fdata2fdata2');
  console.log(fdata2);
  return fdata2;
};
// 所属先名をマージして取得
const get_id = (array: any[]) => {
  let gid = array[2];
  gid = array[4] != '' ? gid + '_' + array[4] : gid;
  gid = array[6] != '' ? gid + '_' + array[6] : gid;
  gid = array[8] != '' ? gid + '_' + array[8] : gid;

  return gid;
};
