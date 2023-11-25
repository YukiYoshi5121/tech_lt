// フィルタリング
export const get_filterd = (
  fdata: any[][],
  group_j: any[],
  group_b: any[],
  group_y: any[]
) => {
  let filterd: any[] = fdata;

  // 年度
  if (group_y.length > 0) {
    filterd = filterd.filter((el: any) => {
      return group_y.includes(el[1]);
    });
  }

  // 事業本部
  if (group_j.length != 0) {
    if (group_j.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return !(el[3] != '' && el[5] == '');
      });
    }
    if (group_j.length > 1 || !group_j.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return group_j.includes(el[3]);
      });
    }
  }
  // 部署
  if (group_b.length != 0) {
    if (group_b.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return !(el[5] != '');
      });
    }
    if (group_b.length > 1 || !group_b.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return group_b.includes(el[5]);
      });
    }
  }

  return filterd.length === 0 ? [] : filterd;
};
