// フィルタリング
export const get_filterd = (
  fdata: any[][],
  group_j: any[],
  group_b: any[],
  group_s: any[],
  group_k: any[]
) => {
  let filterd: any[] = fdata;
  // 事業本部
  if (group_j.length != 0) {
    if (group_j.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return !(el[2] != '' && el[4] == '' && el[6] == '' && el[8] == '');
      });
    }
    if (group_j.length > 1 || !group_j.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return group_j.includes(el[2]);
      });
    }
  }
  // 部署
  if (group_b.length != 0) {
    if (group_b.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return !(el[4] != '' && el[6] == '' && el[8] == '');
      });
    }
    if (group_b.length > 1 || !group_b.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return group_b.includes(el[4]);
      });
    }
  }
  // 室
  if (group_s.length != 0) {
    if (group_s.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return !(el[6] != '' && el[8] == '');
      });
    }
    if (group_s.length > 1 || !group_s.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return group_s.includes(el[6]);
      });
    }
  }
  // 課
  if (group_k.length != 0) {
    if (group_k.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return !(el[6] == '' && el[8] != '');
      });
    }
    if (group_k.length > 1 || !group_k.includes('---')) {
      filterd = filterd.filter((el: any) => {
        return group_k.includes(el[8]);
      });
    }
  }

  return filterd.length === 0 ? [] : filterd;
};
