import React, { useEffect } from 'react';
import CardNew from '../../components/customer/CardNew';
import ListCardNew from '../../components/customer/ListCardNew';
import "../../styles/customers/news/detail.scss"
import { getNewDetail } from "../../redux/films/actions";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

export default function New(props) {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getNewDetail(id))
  }, [])

  let newDetail = useSelector(state=>state.films.newDetail)

  const showContent = () => {

  }
  return (
    <div className="ng-scope">
      <div className="container ng-scope">
        <div className="row">
          <div className="col-sm-12 title">
            <p>{newDetail.title}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 count">
            <div className="wrapIcon wrapIconLike">
              <img alt="" className="icon" src="assets/img/icons/like.png"/>
              <span>2 LIKES</span>
            </div>
            <div className="wrapIcon wrapIconComment">
              <img alt="" className="icon" src="assets/img/icons/comment.png"/>
              <span>0 COMMENT</span>
            </div>
            <div className="wrapIcon wrapIconShare">
              <img alt="" className="icon" src="assets/img/icons/share.png"/>
              <span>0 SHARE</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 content">
            { newDetail.content && newDetail.content.length > 0 && newDetail.content.map((item, index) => (
              <>
              {item.text && (<p >{item.text}</p>)}
              {item.image && (<p><img style={{textAlign: "center"}} src={`${item.image}`} alt=""/></p>)}
              </>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 line">
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="detailReviewer">
              <img alt="" className="imageReviewer" src="https://graph.facebook.com/3396763350429960/picture?type=square"/>
              <input className="inputReviewer" type="text" placeholder="Bạn nghĩ gì về bài viết này?" readOnly  />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 line">
            <hr />
          </div>
        </div>
        {/* <div className="row list">
          <CardNew />
          <CardNew />
          <ListCardNew />
        </div> */}
      </div>
    </div>
  )
}
