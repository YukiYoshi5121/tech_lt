"use client"

import 'chart.js/auto';

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
} from "@tremor/react";

const JandLTable = ({dataForTable}) => {

  return (
    <>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>年度</TableHeaderCell>
            <TableHeaderCell className="text-right">事業本部名</TableHeaderCell>
            <TableHeaderCell className="text-right">部署名</TableHeaderCell>
            <TableHeaderCell className="text-right">室名</TableHeaderCell>
            <TableHeaderCell className="text-right">課名</TableHeaderCell>
            <TableHeaderCell className="text-right">年度末の所属人数</TableHeaderCell>
            <TableHeaderCell className="text-right">その年度の退職者数</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataForTable
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fiscal_year}</TableCell>
                <TableCell className="text-right">{item.division_name}</TableCell>
                <TableCell className="text-right">{item.department_name}</TableCell>
                <TableCell className="text-right">{item.office_name}</TableCell>
                <TableCell className="text-right">{item.section_name}</TableCell>
                <TableCell className="text-right">{item.count_end}</TableCell>
                <TableCell className="text-right">{item.count_leave}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default JandLTable;