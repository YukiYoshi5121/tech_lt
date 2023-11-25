// チャート用
//export const get_data_for_graph = (fdata: string[][]) => {
export const get_data_for_graph: (fdata: string[][]) => any[][] = (fdata) => {
  let fdata2: string[][] = [];

  // 整形2段階目
  // 所属名まとめ
  for (let i = 0; i < fdata.length; i++) {
    let temp = fdata[i];
    let fdatarow: string[] = [];

    fdatarow.push(temp[1]);
    fdatarow.push(get_id(temp));
    fdatarow.push(get_name(temp));
    fdatarow.push(temp[6]);
    fdatarow.push(temp[7]);

    fdata2.push(fdatarow);
  }
  return fdata2;
};
// 所属先名をマージして取得
const get_id = (array: any[]) => {
  let gid = array[2];
  gid = array[4] != '' ? gid + '_' + array[4] : gid;

  return gid;
};
// 所属先名をマージして取得
const get_name = (array: any[]) => {
  let gname = array[3];
  gname = array[5] != '' ? gname + '_' + array[5] : gname;

  return gname;
};
