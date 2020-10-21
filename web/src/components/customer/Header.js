import React, { Component } from 'react'
import '../../styles/customers/header.scss';
import Navbar from './Navbar';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="header">
        <div className="header__icon">
          <img src="" alt=""/>
        </div>
        <Navbar/>
        <div className="header__info">
          <div className="header__customer"></div>
          <div className="header__position"></div>
        </div>
      </div>
    )
  }
}
