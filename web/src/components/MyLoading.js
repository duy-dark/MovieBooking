import React from 'react';

export default function MyLoading({active}) {
  if (active) {
    let body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'hidden'
  } else {
    let body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'auto'

  }
  return (
    <div className={`my-loading ${active ? 'my-loading--show' : ''}`} style={{width: window.innerWidth + 'px', height: window.innerHeight + 'px'}}>
      <img src={`/assets/web-logo.png`} alt=""/>
    </div>
  )
}
