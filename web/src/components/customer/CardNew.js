import React from 'react';
import '../../styles/customers/news/news.scss';
import { useHistory } from "react-router-dom";

export default function CardNew(props) {
  let history = useHistory();
  const goNew = (id) => {
    history.push(`/new/${id}`);
  }

  return (
    <div className="card-new">
      { props.listNews.length > 0 && props.listNews[0].image && (
        <>
          <div onClick={() => goNew(props.listNews[0]._id)} className="card-new__thumbnail">
            <div className="thumbnail__image">
              <img src={`${props.listNews[0].image}`} alt=""/>
            </div>
            <div className="thumbnail__title">{props.listNews[0].title}</div>
            <div className="thumbnail__content">
              {props.listNews[0].subtitle}
            </div>
          </div>
          <div onClick={() => goNew(props.listNews[1]._id)} className="card-new__thumbnail">
            <div className="thumbnail__image">
              <img src={`${props.listNews[1].image}`} alt=""/>
            </div>
            <div className="thumbnail__title">{props.listNews[1].title}</div>
            <div className="thumbnail__content">
              {props.listNews[1].subtitle}
            </div>
          </div>
          <div onClick={() => goNew(props.listNews[2]._id)} className="card-new__thumbnail">
            <div className="thumbnail__image">
              <img src={`${props.listNews[2].image}`} alt=""/>
            </div>
            <div className="thumbnail__title">{props.listNews[2].title}</div>
            <div className="thumbnail__content">
              {props.listNews[2].subtitle}
            </div>
          </div>
          <div onClick={() => goNew(props.listNews[3]._id)} className="card-new__thumbnail">
            <div className="thumbnail__image">
              <img src={`${props.listNews[3].image}`} alt=""/>
            </div>
            <div className="thumbnail__title">{props.listNews[3].title}</div>
            <div className="thumbnail__content">
              {props.listNews[3].subtitle}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
