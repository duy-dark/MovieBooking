import { Form, Input, Button ,Upload,message,DatePicker, Space} from 'antd';
import Api from './../../../api/api'
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import { addNewFilm } from "../../../redux/films/actions";
import { Select } from 'antd';
import { useDispatch , useSelector} from "react-redux";
import moment from 'moment'
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const avatar = {
  beforeUpload: file => {
    if (file.type !== 'image/png') {
      message.error(`${file.name} is not a png file`);
    }
    return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
  },
 
};
const background = {
  beforeUpload: file => {
    if (file.type !== 'image/png') {
      message.error(`${file.name} is not a png file`);
    }
    return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
  },
 
};

export default function AddFilm  (props) {
  const [form] = Form.useForm();
  let formDataAvatar = new FormData();
  let formDataBackground = new FormData();
  let selectCategories=[];
  let start_day;
  const dispatch = useDispatch();
  const getTime = (date,dateString)=>{
    start_day=dateString;
    
  }
  const onFinish = async(values) => {
    
    values.film.start_date=new Date(start_day)

    // categories
    selectCategories=props.categories.filter((item,index)=> values.film.category_ids.includes(index.toString())==true?item:null);
    let idCategories=[]
    for(let item of selectCategories)
    idCategories.push(item._id)
    values.film.category_ids=idCategories;
    //save file to db and return url online image
    let file_background = values.film.url_background.file.originFileObj; 
    formDataBackground.append('file', file_background)
    let file_avatar = values.film.url_avatar.file.originFileObj; 
     formDataAvatar.append('file', file_avatar)
  await Api.post(
    '/api/file/upload',
    formDataBackground,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  ).then(res => {
    values.film.url_background=res.data.data
  })
 await Api.post(
    '/api/file/upload',
    formDataAvatar,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  ).then(res => {
    values.film.url_avatar=res.data.data
  })
 
  
 //add new film
    setTimeout( dispatch(addNewFilm(values.film)),2000)
      
    props.onCancel();
   

    
    
  };

  return (
    <Form   form={form} style={{marginLeft:-200,marginRight:50}}{...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['film', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['film', 'long_time']}
        label="Time Long"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['film', 'countries']}
        label="Country"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['film', 'directors']}
        label="Directors"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['film', 'actors']}
        label="Actors"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['film', 'start_date']}
        label="start_date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker onChange={getTime} />
      </Form.Item>
      <Form.Item
        name={['film', 'digitals']}
        label="Digitals"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input /> 
      </Form.Item>
      <Form.Item
        name={['film', 'url_avatar']}
        label="Url_avatar"
        rules={[
          {
            required: true,
          },
        ]}
      >
         <Upload {...avatar}>
      <Button icon={<UploadOutlined />}>Upload</Button>
     
    </Upload>
      </Form.Item>
      <Form.Item
        name={['film', 'category_ids']}
        label="Category"
        rules={[
          {
            required: true,
          },
        ]}
      >
        
        <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="select categories"
    optionLabelProp="label"
   
    onChange={(value2) => {
        let temp=[value2]
    
      }} 
  >
     { props.categories.map((item,index)=>{
       return(
    <Option key={index} value1={item.name} value2={item._id}label={item.name}>
      <div className="demo-option-label-item">
      { `${item.name}` }
    
      </div>
    </Option>)
    })}
    </Select>

      </Form.Item>
      <Form.Item
        name={['film', 'url_background']}
        label="Url_background"
        rules={[
          {
            required: true,
          },
        ]}
      >
   <Upload {...background}>
      <Button icon={<UploadOutlined />}>Upload</Button>
     
    </Upload>
   
      </Form.Item>
      <Form.Item name={['film', 'rates']} label="rates">
        <Input />
      </Form.Item>
      <Form.Item name={['film', 'rate_count']} label="rate_count">
        <Input/>
      </Form.Item>
      <Form.Item name={['film', 'imdb']} label="imdb">
        <Input/>
      </Form.Item>
      <Form.Item name={['film', 'content']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item style={{marginLeft:990+'px'}}wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};