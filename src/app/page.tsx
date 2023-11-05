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
import AthleteTable from 'components/AthletesTable';

// Main
const App = () => {
  return (
    <>
      <Title>Dashboard</Title>
      <Text>New job: fix Mr. Gluck&#39;s hazy TV, PDQ!</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>BarLineTable</Tab>
          <Tab>JoiningAndLeaving</Tab>
          <Tab>Athletes</Tab>
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


