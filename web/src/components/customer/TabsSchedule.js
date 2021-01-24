import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Collapse } from 'react-collapse';
import * as moment from 'moment';
import CardTime from './CardTime';
import CardComment from './CardComment';

const days = ['chủ nhật', 'thứ 2', 'thứ 3', 'thứ 4', 'thứ 5', 'thứ 6', 'thứ 7']
export default function TabsSchedule(props) {

  const [activeIndex, setActiveIndex] = useState([1, 2, 3]);
  const [listDate, setListDate] = useState([])
  const changeCollapse = (index) => {
    let arr = [...activeIndex]
    if (activeIndex.includes(index)) {
      let i = arr.indexOf(index);
      arr.splice(i, 1)
      setActiveIndex(arr)
    } else {
      setActiveIndex([...arr, index])
    }
  }

  useEffect(() => {
    let arr = []
    for(let i = 0; i < 7; i++) {
      let date = moment().add(i, 'day')
      arr.push({
        name: days[date.day()],
        date: date.format('DD-MM-YYYY'),
        day: date.format('DD')
      })
    }

    setListDate(arr)

  }, [])

  return (
    <Tabs className="tab-film">
      <TabList className="tab-film__header">
        <Tab className="tab-film__header__item">Lịch Chiếu</Tab>
        <Tab className="tab-film__header__item">Thông Tin</Tab>
        <Tab className="tab-film__header__item">Đánh Giá</Tab>
      </TabList>
      <TabPanel className="tab-film__date">
        <Tabs>
          <TabList className="date-list">
            {/* { listDate.map((item, index) => {
              return (
                <Tab key={index} className="date-list__item"><span>{item.name}</span><span>{item.day}</span></Tab>
              )
            })} */}
            <Tab className="date-list__item"><span>chủ nhật</span><span>25</span></Tab>
          </TabList>
          <TabPanel className="tab-film__theater">
            <div className="theater__item">
              <div className="theater__item__header" onClick={() => changeCollapse(1)}>
                <div className="theater__item__image">
                  <img src={`/assets/film/theater1.jpg`} alt=""/>
                </div>
                <div className="theater__item__film">
                  <span>BHD Star - Bitexco</span>
                  <span>L3-Bitexco Icon 68, 2 Hải Triều, Q.1</span>
                </div>
              </div>
              <Collapse className="theater__item__schedule" isOpened={activeIndex.includes(1)}>
                <div className="theater__item__title">2D Digital</div>
                <div className="theater__item__schedules">
                  <CardTime />
                  <CardTime />
                </div>
              </Collapse>
            </div>
          </TabPanel>
        </Tabs>
      </TabPanel>
      <TabPanel className="detail-tab-info">
        <div className="detail-info__info">
          <table>
            <tbody>
              <tr>
                <th>Ngày công chiếu</th>
                <td>{ moment('24/01/2021').format('DD/MM/YYYY')}</td>
              </tr>
              <tr>
                <th>Đạo diễn</th>
                <td>{`duy`}</td>
              </tr>
              <tr>
                <th>Diễn viên</th>
                <td>{`duy`}</td>
              </tr>
              <tr>
                <th>Thể Loại</th>
                <td>{ `duy` }</td>
              </tr>
              <tr>
                <th>Định dạng</th>
                <td>{ `duy` }</td>
              </tr>
              <tr>
                <th>Quốc Gia SX</th>
                <td>{ `duy` }</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="detail-info__content">
          <p className="detail-info__content__title">Nội dung</p>
          <p>{ `duy` }</p>
        </div>
      </TabPanel>
      <TabPanel className="tab-film__comment">
          <div className="comment-block" onClick={()=> {}}>
            <span className="comment-block__image"><img src="https://tix.vn/app/assets/img/avatar.png" alt="avatar"/></span>
            <input type="text" placeholder="Bạn nghĩ gì về phim này?"/>
            <span class="comment-block__rate"><img src="https://tix.vn/app/assets/img/icons/listStar.png" alt="star"/></span>
          </div>
          <CardComment/>
      </TabPanel>
    </Tabs>
  )
}