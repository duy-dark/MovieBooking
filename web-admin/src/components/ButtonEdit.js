import React from 'react';

export default function ButtonEdit(props) {
  const onEdit = () => {
    props.onEdit()
  }
  return (
    <button className="btn btn--editing" onClick={onEdit}>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
        <path id="ic_mode_edit_48px_1_" data-name="ic_mode_edit_48px (1)"
              d="M6,17.088v2.917H8.917L17.524,11.4,14.607,8.481ZM19.772,9.15a.779.779,0,0,0,0-1.1L17.956,6.233a.779.779,0,0,0-1.1,0L15.432,7.656l2.917,2.917Z"
              transform="translate(-6 -6.005)"/>
      </svg>
      <span>Edit</span>
    </button>
  )
}