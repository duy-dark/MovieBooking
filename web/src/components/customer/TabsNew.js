import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CardNew from './CardNew.js'
import CardLucky from './CardLucky.js'

export default function TabsNew(props) {
  let data = props.listNews.map(item => {
    let arr = item.content.filter(val => val.image)
    return {
      ...item,
      image: arr[0].image,
      subtitle: item.content[0].text
    }
  })
  return (
    <Tabs id={props.id ? props.id : ''} className="tab-film">
      <TabList className="tab-film__header">
        <Tab className="tab-film__header__item">Tin Tức</Tab>
        <Tab className="tab-film__header__item">Khuyến mãi</Tab>
      </TabList>
      <TabPanel>
        <CardNew listNews={data}/>
      </TabPanel>
      <TabPanel>
        <CardLucky/>
      </TabPanel>
    </Tabs>
  )
}
