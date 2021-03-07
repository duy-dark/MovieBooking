  import React, { useEffect, useState } from 'react';
  import { Table, Input, InputNumber, Image, Form, Typography ,Button,Modal} from 'antd';
  import moment from 'moment'
  import { useDispatch , useSelector} from "react-redux";
import Trailer from './trailer'
import EditPopUp from './EditPopup'
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
 
  export default function Detail (props) {
    const [form] = Form.useForm();
  //   const [data, setData] = useState([props.detail]);
  //   useEffect(()=>{
  //     let arr=[];
  //     arr.push(props.detail);
  //     setData(arr);
  //   },[])

  //  console.log(data)

  console.log(props.detail)


  
    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: 280,
        
      },
      {
        title: 'categories',
        dataIndex: 'categories',
        width: 280,
        render: (record)=> {let category="";record.map(item=>category+=item.name+", ")
         
      return <a>{category.slice(0,category.length-2)}</a>
        }
      },
      {
        title: 'trailer',
        dataIndex: 'trailer',
        width: 100,
        height:100,
        render: (text)=> <Trailer ifr={text}/>
      },
      {
        title: 'long_time',
        dataIndex: 'long_time',
        width: 30,
      
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
        title: 'content',
        dataIndex: 'content',
        width: 500,
        render: (text)=> text.slice(0,100)+"..."
      },
      {
        title: 'countries',
        dataIndex: 'countries',
        width: 50,
      
      },
      {
        title: 'digitals',
        dataIndex: 'digitals',
        width: 50,
      
      },
      {
        title: 'directors',
        dataIndex: 'directors',
        width: 50,
      
      },
      {
        title: 'imdb',
        dataIndex: 'imdb',
        width: 40,
      
      },
      {
        title: 'start_date',
        dataIndex: 'start_date',
        width: 100,
        render : (text)=>moment(text).format('YYYY-MM-DD')
      },
      {
        title: 'Edit',
        dataIndex: 'operation',
        render: (text,record) => 
        
        <EditPopUp categories={props.categories} detail={[props.detail]} onCancel={props.onCancel}/>
        
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
          dataSource={[props.detail]}
          columns={columns}
          rowClassName="editable-row"
          pagination={{defaultPageSize: 1, hideOnSinglePage: true}}
        />
      </Form>
    );
  };