import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";

export default function CustomScrollbar(props) {

  return (
    <Scrollbars
      onScroll={props.handleScroll}
      onScrollFrame={props.handleScrollFrame}
      onScrollStart={props.handleScrollStart}
      onScrollStop={props.handleScrollStop}
      onUpdate={props.handleUpdate}
      renderView={props.renderView}
      renderTrackHorizontal={props.renderTrackHorizontal}
      renderTrackVertical={props.renderTrackVertical}
      renderThumbHorizontal={props.renderThumbHorizontal}
      renderThumbVertical={props.renderThumbVertical}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMin={0}
      autoHeightMax={200}
      thumbMinSize={30}
      universal={true}
      {...props}
    />
  );
}
