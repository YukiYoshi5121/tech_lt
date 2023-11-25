'use client';

import React, { useState } from 'react';
import { MultiSelect, MultiSelectItem } from '@tremor/react';

import type { SelectProps } from 'antd';
import { Table } from 'antd';
const { Column } = Table;

//const JandLTable: (dataForTable: any) => JSX.Element = (dataForTable) => {
const JandLTable = ({ dataForTable, fiscalYears }) => {
  const [selectedFiscalYear, setSelectedFiscalYear] = useState<any[]>([]);

  const isSelected = (item: any) =>
    selectedFiscalYear.includes(item.fiscal_year_name) ||
    selectedFiscalYear.length === 0;

  const options: SelectProps['options'] = dataForTable;

  // tremor の マルチセレクト、AntDesign のページングテーブルを併用
  return (
    <>
      <div className='flex space-x-2'>
        <MultiSelect
          className='max-w-full sm:max-w-xs'
          value={selectedFiscalYear}
          onValueChange={setSelectedFiscalYear}
          placeholder='Select Groups...'
        >
          {fiscalYears.filter(Boolean).map((group, i) => (
            <MultiSelectItem key={i} value={group}>
              {group}
            </MultiSelectItem>
          ))}
        </MultiSelect>
      </div>

      <Table
        className='mt-6 rounded-lg'
        dataSource={dataForTable.filter((item) => isSelected(item))}
        pagination={{ position: ['topLeft'] }}
        bordered={true}
      >
        <Column
          title='年度'
          dataIndex='fiscal_year_name'
          key='fiscal_year_name'
        />
        <Column
          title='事業本部'
          dataIndex='division_name'
          key='division_name'
        />
        <Column
          title='部署'
          dataIndex='department_name'
          key='department_name'
        />
        <Column
          title='在籍者(年度末時点)'
          dataIndex='count_end'
          key='count_end'
        />
        <Column
          title='退職者(年度末時点)'
          dataIndex='count_leave'
          key='count_leave'
        />
      </Table>
    </>
  );
};

export default JandLTable;
