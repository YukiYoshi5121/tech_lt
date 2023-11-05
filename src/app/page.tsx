"use client";

import React from "react";

import 'chart.js/auto';

import {
  Text,
  Title,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

import JoiningAndLeaving from 'components/JoiningAndLeaving';
import BarLineTable from 'components/BarLineTable';

// Main
const App = () => {
  return (
    <>
      <Title>Dashboard</Title>
      <Text>New job: fix Mr. Gluck&#39;s hazy TV, PDQ!</Text>
      <Text><a href='https://www.tremor.so/' target='_blank'>https://www.tremor.so/</a></Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>BarLineTable</Tab>
          <Tab>JoiningAndLeaving</Tab>
          <Tab>Tes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BarLineTable />
          </TabPanel>
          <TabPanel>
            <JoiningAndLeaving />
          </TabPanel>
          <TabPanel>

          </TabPanel>

        </TabPanels>
      </TabGroup>
    </>
  )
};

export default App;


