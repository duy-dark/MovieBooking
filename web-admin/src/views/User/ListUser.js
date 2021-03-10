import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import {getListCustomer, updateCustomer} from "../../redux/users/actions"
import { getCustomerChart } from '../../redux/films/actions'

export default function ListUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  let listCustomer = useSelector(state =>state.users.listCustomer)
  useEffect(() => {
    dispatch(getListCustomer())
  }, [])
  const onBannerClick = (user) => {
    dispatch(updateCustomer({id: user._id, is_deleted: !user.is_deleted}))
  }

  const onClickTT = (user) => {
    dispatch(getCustomerChart({id: user._id, type: 1}))
  }
  return (
    <div className="list-customer">
      {
        listCustomer.map(item => (
          <div key={item._id} className="list-customer__item">
            <div className="customer-item-name">
              {item.name}
            </div>
            <div className="customer-item-btns">
              <button onClick={() => onClickTT(item)}>Thống kê</button>
              <button onClick={() => onBannerClick(item)}>{item.is_deleted ? 'Unlock Banner' : 'Banner'}</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}