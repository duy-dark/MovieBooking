import { Table, Input, Button, Popconfirm, Tag, Space } from 'antd';
import React from "react";


const data = [{ key: 1,
    Theater:"Dong Da",
    TimeStart:"9:45 AM",    
    TimeEnd:"11:00 Am",
    Room : "Room 5",
    Date: "30-5-2021"
}];


const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

export default class EditSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Theater',
      dataIndex: 'Theater',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'Theater'),
    },
    {
      title: 'Time Start (24h)',
      dataIndex: 'TimeStart',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'TimeStart'),
    },
    {
      title: 'Time End (24h)',
      dataIndex: 'TimeEnd',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'TimeEnd'),
    },
    {
      title: 'Room',
      dataIndex: 'Room',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'Room'),
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'Date'),
    },

    
    {
      title: 'Action',
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
            <a style={{marginLeft:5+'px'}}>Delete</a>
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