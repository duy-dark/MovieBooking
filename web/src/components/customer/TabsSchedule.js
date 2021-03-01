import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Collapse } from 'react-collapse';
import * as moment from 'moment';
import CardTime from './CardTime';
import CardComment from './CardComment';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createComment } from "../../redux/films/actions";
import { useSelector, useDispatch } from "react-redux"


const days = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
export default function TabsSchedule(props) {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState([1, 2, 3]);
  const [listDate, setListDate] = useState([{}, {}, {}, {}, {}, {}, {}])
  const user = useSelector(state => state.users.user)


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

  const [rated, setRated] = useState(5);
  const [commentText, setCommentText] = useState('')
  const [ratedHover, setRatedHover] = useState(5);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showblockComment = () => {
    if (user) {
      handleShow()
    } else {
      alert("bạn chưa đăng nhập")
    }
  }
  const sumitComment = () => {
    dispatch(createComment({
      film_id: props.detail._id,
      customer_id: user._id,
      content: commentText,
      rate: rated,
    }))
    handleClose()
  }

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
    <>
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
        <TabPanel className="tab-detail__comment">
            <div className="comment-block" onClick={showblockComment}>
              <span className="comment-block__image"><img src={`${user && user.avatar ? user.avatar : '/assets/avatar.png'}`} alt="avatar"/></span>
              <input type="text" placeholder="Bạn nghĩ gì về phim này?"/>
              <span className="comment-block__rate"><img src="https://tix.vn/app/assets/img/icons/listStar.png" alt="star"/></span>
            </div>
            { props.comments.map(comment => (<CardComment key={comment._id} username={comment.customers.name} {...comment}/>))}

        </TabPanel>
      </Tabs>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="modal-comment__header">
            Comment
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-comment">
            <div className="modal-comment__number">
              <p>{rated}</p>
            </div>
            <div className="modal-comment__select">
              <img onClick={() => setRated(1)} onMouseOver={() => setRatedHover(1)} onMouseOut={() => setRatedHover(0)} className={`star ${rated >= 1 || ratedHover >= 1 ? 'star--selected' : ''}`} src={`https://tix.vn/app/assets/img/icons/star1.png`} alt=""/>
              <img onClick={() => setRated(2)} onMouseOver={() => setRatedHover(2)} onMouseOut={() => setRatedHover(0)} className={`star ${rated >= 2 || ratedHover >= 2 ? 'star--selected' : ''}`} src={`https://tix.vn/app/assets/img/icons/star1.png`} alt=""/>
              <img onClick={() => setRated(3)} onMouseOver={() => setRatedHover(3)} onMouseOut={() => setRatedHover(0)} className={`star ${rated >= 3 || ratedHover >= 3 ? 'star--selected' : ''}`} src={`https://tix.vn/app/assets/img/icons/star1.png`} alt=""/>
              <img onClick={() => setRated(4)} onMouseOver={() => setRatedHover(4)} onMouseOut={() => setRatedHover(0)} className={`star ${rated >= 4 || ratedHover >= 4 ? 'star--selected' : ''}`} src={`https://tix.vn/app/assets/img/icons/star1.png`} alt=""/>
              <img onClick={() => setRated(5)} onMouseOver={() => setRatedHover(5)} onMouseOut={() => setRatedHover(0)} className={`star ${rated >= 5 || ratedHover >= 5 ? 'star--selected' : ''}`} src={`https://tix.vn/app/assets/img/icons/star1.png`} alt=""/>
              <img onClick={() => setRated(6)} onMouseOver={() => setRatedHover(6)} onMouseOut={() => setRatedHover(0)} className={`star ${rated >= 6 || ratedHover >= 6 ? 'star--selected' : ''}`} src={`https://tix.vn/app/assets/img/icons/star1.png`} alt=""/>
              <img onClick={() => setRated(7)} onMouseOver={() => setRatedHover(7)} onMouseOut={() => setRatedHover(0)} className={`star ${rated >= 7 || ratedHover >= 7 ? 'star--selected' : ''}`} src={`https://tix.vn/app/assets/img/icons/star1.png`} alt=""/>
              <img onClick={() => setRated(8)} onMouseOver={() => setRatedHover(8)} onMouseOut={() => setRatedHover(0)} className={`star ${rated >= 8 || ratedHover >= 8 ? 'star--selected' : ''}`} src={`https://tix.vn/app/assets/img/icons/star1.png`} alt=""/>
              <img onClick={() => setRated(9)} onMouseOver={() => setRatedHover(9)} onMouseOut={() => setRatedHover(0)} className={`star ${rated >= 9 || ratedHover >= 9 ? 'star--selected' : ''}`} src={`https://tix.vn/app/assets/img/icons/star1.png`} alt=""/>
              <img onClick={() => setRated(10)} onMouseOver={() => setRatedHover(10)} onMouseOut={() => setRatedHover(0)} className={`star ${rated === 10 || ratedHover === 10 ? 'star--selected' : ''}`} src={`https://tix.vn/app/assets/img/icons/star1.png`} alt=""/>
            </div>
            <div className="modal-comment__content">
              <textarea name="commentText" id="" cols="10" onChange={e => setCommentText(e.target.value)}rows="6"></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary modal-comment__button" onClick={sumitComment}>
            Đăng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
