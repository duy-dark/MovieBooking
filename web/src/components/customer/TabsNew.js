import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function TabsNew(props) {
  return (
    <Tabs className="tab-film">
      <TabList className="tab-film__header">
        <Tab className="tab-film__header__item">Tin Tức</Tab>
        <Tab className="tab-film__header__item">Khuyến mãi</Tab>
      </TabList>
      <TabPanel>
        tin tức
      </TabPanel>
      <TabPanel>
        khuyến mãi
      </TabPanel>
    </Tabs>
  )
}
