  import React, { useEffect, useState } from 'react';
  import { Table, Input, InputNumber, Image, Form, Typography } from 'antd';

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

  export default function EditableTable (props) {
    const [form] = Form.useForm();
    const [data, setData] = useState();
    const [editingKey, setEditingKey] = useState('');
    const  dispatch = useDispatch();
    useEffect(()=>{
      let arr=[];
      arr.push(props.detail);
      setData(arr);
    },[])

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
      form.setFieldsValue({
        name: '',
        trailer: '',
        long_time: '',
        url_avatar:'',
        url_background:'',
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
        title: 'name',
        dataIndex: 'name',
        width: 300,
        
      },
      {
        title: 'trailer',
        dataIndex: 'trailer',
        width: '15%',
    
      },
      {
        title: 'long_time',
        dataIndex: 'long_time',
        width: 50,
      
      },
      {
        title: 'url_avatar',
        dataIndex: 'url_avatar',
        width: 100,
        render: (text)=> <Image width={100} height={50} src={text}/>
      },
      {
        title: 'url_background',
        dataIndex: 'url_background',
        width: 100,
        render: (text)=> <Image width={100}  height={50} src={text}/>
      },
    
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
        
            <Typography.Link >
              Edit
            </Typography.Link>
          
        },
      },
    ];
    
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
          columns={columns}
          rowClassName="editable-row"
          pagination={{defaultPageSize: 1, hideOnSinglePage: true}}
        />
      </Form>
    );
  };