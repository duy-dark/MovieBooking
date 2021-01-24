import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";

export default class CustomScrollbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Scrollbars
        autoHide={true}
        autoHideTimeout={200}
        autoHideDuration={200}
        autoHeight={true}
        onScrollStart={this.props.onScrollStart}
        onScrollStop={this.props.onScrollStop}
        onScroll={this.props.onScroll}
        onScrollFrame={this.props.onScrollFrame}
      />
    );
  }
}
