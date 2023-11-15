'use client';

//import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import { MultiSelect, MultiSelectItem } from '@tremor/react';
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
} from '@tremor/react';

//const JandLTable: (dataForTable: any) => JSX.Element = (dataForTable) => {
const JandLTable = ({ dataForTable, fiscalYears }) => {
  console.log('fiscalYears');
  console.log(fiscalYears.slice(0, 1));

  const [selectedFiscalYear, setSelectedFiscalYear] = useState<any[]>([
    //fiscalYears.slice(0, 1),
    'fy23',
  ]);
  //useEffect(() => {
  //  setSelectedFiscalYear(fiscalYears.slice(0, 1));
  //}, [fiscalYears.slice(0, 1)]);

  const isSelected = (item: any) =>
    selectedFiscalYear.includes(item.fiscal_year) ||
    selectedFiscalYear.length === 0;

  console.log('dataForTable');
  console.log(dataForTable);
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
      <Table className='mt-6 rounded-lg'>
        <TableHead className='bg-slate-200'>
          <TableRow>
            <TableHeaderCell>年度</TableHeaderCell>
            <TableHeaderCell className='text-right'>事業本部</TableHeaderCell>
            <TableHeaderCell className='text-right'>部署</TableHeaderCell>
            <TableHeaderCell className='text-right'>
              在籍者(年度末時点)
            </TableHeaderCell>
            <TableHeaderCell className='text-right'>
              退職者(年度末時点)
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataForTable
            .filter((item) => isSelected(item))
            .map((item, i) => (
              <TableRow
                key={item.id}
                className={i % 2 == 0 ? 'bg-slate-50' : 'bg-slate-100'}
              >
                <TableCell>{item.fiscal_year}</TableCell>
                <TableCell className='text-right'>
                  {item.division_name}
                </TableCell>
                <TableCell className='text-right'>
                  {item.department_name}
                </TableCell>
                <TableCell className='text-right'>{item.count_end}</TableCell>
                <TableCell className='text-right'>{item.count_leave}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default JandLTable;
