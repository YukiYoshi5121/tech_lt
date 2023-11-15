'use client';

import React, { useState } from 'react';

import { MultiSelect, MultiSelectItem } from '@tremor/react';
import {
  Icon,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  BadgeDelta,
  Title,
  Flex,
  Select,
  SelectItem,
  DeltaType,
} from '@tremor/react';

type SalesPerson = {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
};

const salesPeople: SalesPerson[] = [
  {
    name: 'Peter Doe',
    leads: 45,
    sales: '1,000,000',
    quota: '1,200,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming',
  },
  {
    name: 'Lena Whitehouse',
    leads: 35,
    sales: '900,000',
    quota: '1,000,000',
    variance: 'low',
    region: 'Region B',
    status: 'average',
  },
  {
    name: 'Phil Less',
    leads: 52,
    sales: '930,000',
    quota: '1,000,000',
    variance: 'medium',
    region: 'Region C',
    status: 'underperforming',
  },
  {
    name: 'John Camper',
    leads: 22,
    sales: '390,000',
    quota: '250,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming',
  },
  {
    name: 'Max Balmoore',
    leads: 49,
    sales: '860,000',
    quota: '750,000',
    variance: 'low',
    region: 'Region B',
    status: 'overperforming',
  },
];

const deltaTypes: { [key: string]: DeltaType } = {
  average: 'unchanged',
  overperforming: 'moderateIncrease',
  underperforming: 'moderateDecrease',
};

const SalesPeopleTable = ({ inputDataTable }) => {
  const [selectedStatusM, setSelectedStatusM] = useState<string[]>([]);

  const isSalesPersonSelected = (salesPerson: SalesPerson) =>
    selectedStatusM.includes(salesPerson.status) ||
    selectedStatusM.length === 0;

  let labels: any = [];
  salesPeople
    .filter((item) => isSalesPersonSelected(item))
    .map((item) => labels.push(item.name));
  let datasets: SalesPerson[] = [];
  salesPeople
    .filter((item) => isSalesPersonSelected(item))
    .map((item) => datasets.push(item));
  let tdata = { labels: labels, datasets: datasets };

  //console.log(inputDataTable);

  return (
    <>
      <div>
        <Flex
          className='space-x-0.5'
          justifyContent='start'
          alignItems='center'
        >
          <Title> Performance History </Title>
        </Flex>
      </div>
      <div className='flex space-x-2'>
        <MultiSelect
          className='max-w-full sm:max-w-xs'
          onValueChange={setSelectedStatusM}
          placeholder='Select Performances...'
        >
          <MultiSelectItem value='overperforming'>
            Overperforming
          </MultiSelectItem>
          <MultiSelectItem value='average'>Average</MultiSelectItem>
          <MultiSelectItem value='underperforming'>
            Underperforming
          </MultiSelectItem>
        </MultiSelect>
      </div>
      <Table className='mt-6'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell className='text-right'>Leads</TableHeaderCell>
            <TableHeaderCell className='text-right'>Sales ($)</TableHeaderCell>
            <TableHeaderCell className='text-right'>Quota ($)</TableHeaderCell>
            <TableHeaderCell className='text-right'>Variance</TableHeaderCell>
            <TableHeaderCell className='text-right'>Region</TableHeaderCell>
            <TableHeaderCell className='text-right'>Status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {salesPeople
            .filter((item) => isSalesPersonSelected(item))
            .map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell className='text-right'>{item.leads}</TableCell>
                <TableCell className='text-right'>{item.sales}</TableCell>
                <TableCell className='text-right'>{item.quota}</TableCell>
                <TableCell className='text-right'>{item.variance}</TableCell>
                <TableCell className='text-right'>{item.region}</TableCell>
                <TableCell className='text-right'>
                  <BadgeDelta deltaType={deltaTypes[item.status]} size='xs'>
                    {item.status}
                  </BadgeDelta>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SalesPeopleTable;
