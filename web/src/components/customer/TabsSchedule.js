import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Collapse } from 'react-collapse';
import * as moment from 'moment';
import CardTime from './CardTime';
import CardComment from './CardComment';
import theater from '../../assets/film/theater1.jpg'
const days = ['chủ nhật', 'thứ 2', 'thứ 3', 'thứ 4', 'thứ 5', 'thứ 6', 'thứ 7']
export default function TabsSchedule(props) {

  const [activeIndex, setActiveIndex] = useState([1, 2, 3]);
  const [listDate, setListDate] = useState([{}, {}, {}, {}, {}, {}, {}])

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
        day: date.format('DD'),
        dayofweek: date.day()
      })
    }

    setListDate(arr)

  }, [])
  const [tabSelect, setTabSelect] = useState(0);

  const showTheater = (item) => {
    if (item.length > 0) {
      return item.map(theater => {
        return (
          <div key={theater._id} className="theater__item">
            <div className="theater__item__header" onClick={() => changeCollapse(1)}>
              <div className="theater__item__image">
                <img src={`${theater.url_image}`} alt=""/>
              </div>
              <div className="theater__item__film">
              <span>{`${theater.name}`}</span>
              <span>{`${theater.address}`}</span>
              </div>
            </div>
            <Collapse className="theater__item__schedule" isOpened={activeIndex.includes(1)}>
              <div className="theater__item__title">2D Digital</div>
              <div className="theater__item__schedules">
               { theater.film_schedules.map(film => <CardTime key={film._id} schedule={film} name={props.detail.name} theater_url_image={theater.url_image} theater_name={theater.name} film={props.detail} />)}
              </div>
            </Collapse>
          </div>
        )
      })
    } else {
      return (<p>Không có lịch chiếu</p>)
    }
  }

  return (
    <Tabs className="tab-detail">
      <TabList className="tab-detail__header">
        {props.future > 0 && (<Tab className="tab-detail__header__item">Lịch Chiếu</Tab>)}
        <Tab className="tab-detail__header__item">Thông Tin</Tab>
        <Tab className="tab-detail__header__item">Đánh Giá</Tab>
      </TabList>
      {props.future > 0 && (
        <TabPanel className="tab-detail__date">
          <Tabs className="tab-detail__date-list" selectedIndex={tabSelect} onSelect={tab => setTabSelect(tab)}>
            <TabList className="date-list">
              {
                listDate.map((item, index) => {
                  return (
                    <Tab key={index} className={`date-list__item ${props.dayOfWeeks[index].length > 0 ? 'date-list__item-show' : ''}`}><span>{item.name}</span><span>{item.day}</span></Tab>
                  )
                })
              }
            </TabList>
            { props.dayOfWeeks.map((item, index) => {
                  return (
                  <TabPanel key={index} className="tab-detail__theater">
                    <div>
                    { showTheater(item) }
                    </div>
                  </TabPanel>
                  )
              })}

          </Tabs>
        </TabPanel>
      )}
      <TabPanel className="detail-tab-info">
        <div className="detail-info__info">
          <table>
            <tbody>
              <tr>
                <th>Ngày công chiếu</th>
                <td>{`${moment(props.detail.start_date).format("MM-DD-  YYYY")}`}</td>
              </tr>
              <tr>
                <th>Đạo diễn</th>
                <td>{`${props.detail.directors}`}</td>
              </tr>
              <tr>
                <th>Diễn viên</th>
                <td>{`${props.detail.actors}`}</td>
              </tr>
              <tr>
                <th>Thể Loại</th>
                <td>{ `${props.detail.actors}` }</td>
              </tr>
              <tr>
                <th>Định dạng</th>
                <td>{ `${props.detail.digitals}` }</td>
              </tr>
              <tr>
                <th>Quốc Gia SX</th>
                <td>{ `${props.detail.countries}` }</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="detail-info__content">
          <p className="detail-info__content__title">Nội dung</p>
          <p>{ `${props.detail.content}` }</p>
        </div>
      </TabPanel>
      <TabPanel className="tab-film__comment">
          <div className="comment-block" onClick={()=> {}}>
            <span className="comment-block__image"><img src="https://tix.vn/app/assets/img/avatar.png" alt="avatar"/></span>
            <input type="text" placeholder="Bạn nghĩ gì về phim này?"/>
            <span className="comment-block__rate"><img src="https://tix.vn/app/assets/img/icons/listStar.png" alt="star"/></span>
          </div>
          { props.comments.map(comment => (<CardComment key={comment._id} username={comment.customers.name} {...comment}/>))}

      </TabPanel>
    </Tabs>
  )
}
