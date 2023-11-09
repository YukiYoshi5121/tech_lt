'use client';

import React from 'react';

import 'chart.js/auto';

import {
  Text,
  Title,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from '@tremor/react';

import BarLineTable from 'components/BarLineTable';
import JoiningAndLeaving from 'components/JoiningAndLeaving';
import JoiningAndLeaving2 from 'components/JoiningAndLeavingTRMR';
import JoiningAndLeaving3 from 'components/JoiningAndLeavingMUI';

// Main
const App = () => {
  return (
    <>
      <Title>Dashboard</Title>
      <Text>New job: fix Mr. Gluck&#39;s hazy TV, PDQ!</Text>
      <Text>
        <a href='https://www.tremor.so/' target='_blank'>
          https://www.tremor.so/
        </a>
      </Text>

      <TabGroup className='mt-6'>
        <TabList>
          <Tab>BarLineTable</Tab>
          <Tab>JoiningAndLeaving</Tab>
          <Tab>JoiningAndLeaving2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BarLineTable />
          </TabPanel>
          <TabPanel>
            <JoiningAndLeaving />
          </TabPanel>
          <TabPanel>
            <JoiningAndLeaving2 />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

export default App;
