'use client';

import React from 'react';

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
import JoiningAndLeaving2 from 'components/JoiningAndLeavingTRMR';

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
      <Text>
        <a href='https://ant.design/' target='_blank'>
          https://ant.design/
        </a>
      </Text>

      <TabGroup className='mt-6'>
        <TabList>
          <Tab>BarLineTable</Tab>
          <Tab>Joining and Leaving</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BarLineTable />
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
