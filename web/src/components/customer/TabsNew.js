import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CardNew from './CardNew.js'
import CardLucky from './CardLucky.js'

export default function TabsNew(props) {
  return (
    <Tabs id={props.id ? props.id : ''} className="tab-film">
      <TabList className="tab-film__header">
        <Tab className="tab-film__header__item">Tin Tức</Tab>
        <Tab className="tab-film__header__item">Khuyến mãi</Tab>
      </TabList>
      <TabPanel>
        <CardNew/>
      </TabPanel>
      <TabPanel>
        <CardLucky/>
      </TabPanel>
    </Tabs>
  )
}
