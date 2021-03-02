
import React, { useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import Api from "./../../../api/api"
import { useDispatch , useSelector} from "react-redux";






const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function EditableTable  (props) {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState('');
//   let data =[]
//  props.filmschedule.map(item=>{
//    const time_start = new Date(item.time_start).getDate;
//    const time_end =item.time_end
//    const room = item.room.name;
//    const theater=item.theater.name;

//  })
 
  useEffect(()=>{
    
   
    setData(data1);
  },[])

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      Theater: '',
      Time_Start: '',
      Time_End: '',
      Room:'',
      Date:'',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const Save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
    
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
       
      }
     
        
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Theater',
      dataIndex: 'Theater',
      width: '25%',
      editable: true,
    },
    {
      title: 'Time_Start (24h)',
      dataIndex: 'Time_Start',
      width: '20%',
      editable: true,
    },
    {
      title: 'Time_End (24h)',
      dataIndex: 'Time_End',
      width: '20',
      editable: true,
    },
    {
      title: 'Room',
      dataIndex: 'Room',
      width: '15%',
      editable: true,
    },
    {
      title: 'Date (ddmmyyyy)',
      dataIndex: 'Date',
      width: '30%',
      editable: true,
    },
  
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => Save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{defaultPageSize: 1, hideOnSinglePage: true}}
      />
    </Form>
  );
};