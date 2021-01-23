import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function TabsSchedule(props) {
  return (
    <Tabs className="tab-film">
      <TabList className="tab-film__header">
        <Tab className="tab-film__header__item">Lịch Chiếu</Tab>
        <Tab className="tab-film__header__item">Thông Tin</Tab>
        <Tab className="tab-film__header__item">Đánh Giá</Tab>
      </TabList>
      <TabPanel>
        Lịch Chiếu
      </TabPanel>
      <TabPanel>
        thông tin
      </TabPanel>
      <TabPanel>
        đánh giá
      </TabPanel>
    </Tabs>
  )
}
