import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../styles/customers/news/news.scss"
import CardNew from './CardNew';
import ListCardNew from './ListCardNew';

export default function TabsNew(props) {
  return (
    <Tabs className="tab-film">
      <TabList className="tab-film__header">
        <Tab className="tab-film__header__item">Tin Tức</Tab>
        <Tab className="tab-film__header__item">Khuyến mãi</Tab>
      </TabList>
      <TabPanel>
        <div className="row-1-2">
        <CardNew />
        <CardNew />
        </div>
        <div className="row-1-3">
          <CardNew />
          <CardNew />
          <ListCardNew />
        </div>
      </TabPanel>
      <TabPanel>
        khuyến mãi
      </TabPanel>
    </Tabs>
  )
}
