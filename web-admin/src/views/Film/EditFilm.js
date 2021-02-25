import { Table, Input, Button, Popconfirm } from 'antd';
import React from "react";


const data = [{ key: 1,
    name: `Edrward`,
    trailer: 32,
    countries: `London Park `,
    long_time:119,
    start_date:"2021-03-15",
    directors:"Tomohiko Itô",
    url_avatar: "/assets/images/film/sword-art-online-ordinal-scale.png",
    url_background:"/assets/images/film/sword-art-online-ordinal-scale-poster.png"}];


const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: 'trailer',
      dataIndex: 'trailer',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'trailer'),
    }, {
      title: 'countries',
      dataIndex: 'countries',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'countries'),
    }, 
    {
        title: 'long_time',
        dataIndex: 'long_time',
        width: '10%',
        render: (text, record) => this.renderColumns(text, record, 'long_time'),
      },
      {
        title: 'start_date',
        dataIndex: 'start_date',
        width: '20%',
        render: (text, record) => this.renderColumns(text, record, 'start_date'),
      },
      {
        title: 'directors',
        dataIndex: 'directors',
        width: '20%',
        render: (text, record) => this.renderColumns(text, record, 'directors'),
      },
      {
        title: 'url_avatar',
        dataIndex: 'url_avatar',
        width: '20%',
        render: (text, record) => this.renderColumns(text, record, 'url_avatar'),
      },
      {
        title: 'url_background',
        dataIndex: 'url_background',
        width: '20%',
        render: (text, record) => this.renderColumns(text, record, 'start_date'),
      },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : <a onClick={() => this.edit(record.key)}>Edit</a>
            }
          </div>
        );
      },
    }];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  render() {
    return <Table bordered dataSource={this.state.data} columns={this.columns} pagination={{defaultPageSize: 1, hideOnSinglePage: true}} />;
  }
}