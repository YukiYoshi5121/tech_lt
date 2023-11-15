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
    fdatarow.push(get_name(temp));
    fdatarow.push(temp[5]);
    fdatarow.push(temp[6]);

    fdata2.push(fdatarow);
  }
  return fdata2;
};
// 所属先名をマージして取得
const get_id = (array: any[]) => {
  let gid = array[1];
  gid = array[3] != '' ? gid + '_' + array[3] : gid;

  return gid;
};
// 所属先名をマージして取得
const get_name = (array: any[]) => {
  let gname = array[2];
  gname = array[4] != '' ? gname + '_' + array[4] : gname;

  return gname;
};
