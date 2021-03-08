import { Form, Input, Button ,Upload,message,DatePicker,Select} from 'antd';
import Api from './../../../api/api'
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import { updateFilmDetail } from "../../../redux/films/actions";

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
  let start_day=props.detail[0].start_date;

  const dispatch = useDispatch();
  const getTime = (date,dateString)=>{
    start_day=dateString;
    
  }
  const onFinish = async(values) => {

  for (let item in values.film)  {
    
    if(values.film[item]==undefined) {
      values.film[item]=props.detail[0][item]
     }
  }

   values.film.start_date=moment(start_day)

    // categories
   selectCategories=props.categories.filter((item,index)=> values.film.category_ids.includes(index.toString())==true?item:null);
    let idCategories=[]
    for(let item of selectCategories)
    idCategories.push(item._id)
    values.film.category_ids=idCategories;
   
    //save file to db and return url online image
    if(typeof(values.film.url_background)!=="string"){
      console.log(values.film.url_background)
        let file_background = values.film.url_background.file.originFileObj; 
        formDataBackground.append('file', file_background)
       await Api.post(
        '/api/file/upload',
        formDataBackground,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      ).then(res => {
        values.film.url_background=res.data.data
      })
    }
  if(typeof(values.film.url_avatar)!=="string"){
    console.log(values.film.url_avatar)
    let file_avatar = values.film.url_avatar.file.originFileObj; 
     formDataAvatar.append('file', file_avatar)
      await Api.post(
        '/api/file/upload',
        formDataAvatar,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      ).then(res => {
        values.film.url_avatar=res.data.data
      })
  }    
 //add new film
   dispatch(updateFilmDetail(props.detail[0]._id,values.film))
   props.onCancel();
   props.onCancelDetail();
   

    
    
  };

  return (
    <Form   form={form} style={{marginLeft:-200,marginRight:50}}{...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['film', 'name']}
        label="Name"
        
      >
        <Input defaultValue={props.detail[0].name}/>
      </Form.Item>
      <Form.Item
        name={['film', 'long_time']}
        label="Time Long"
       
      >
        <Input defaultValue={props.detail[0].long_time}/>
      </Form.Item>
      <Form.Item
        name={['film', 'countries']}
        label="Country"
        
      >
        <Input defaultValue={props.detail[0].countries}/>
      </Form.Item>
      <Form.Item
        name={['film', 'directors']}
        label="Directors"
        
      >
        <Input defaultValue={props.detail[0].directors} />
      </Form.Item>
      <Form.Item
        name={['film', 'actors']}
        label="Actors"
       
      >
        <Input defaultValue={props.detail[0].actors} />
      </Form.Item>
      <Form.Item
        name={['film', 'start_date']}
        label="start_date"
       
      >
        <DatePicker defaultValue={moment(props.detail[0].start_date)} onChange={getTime} />
      </Form.Item>
      <Form.Item
        name={['film', 'digitals']}
        label="Digitals"
       
      >
        <Input defaultValue={props.detail[0].digitals}/> 
      </Form.Item>
      <Form.Item
        name={['film', 'url_avatar']}
        label="Url_avatar"
       
      >
         <Upload {...avatar}>
      <Button icon={<UploadOutlined />}>Upload</Button>
     
    </Upload>
      </Form.Item>
      <Form.Item
        name={['film', 'category_ids']}
        label="Category"
        rules={[{ required: true }]}
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
    <Option key={index} value1={item.name} value2={item._id} label={item.name}  >
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
      >
   <Upload {...background}>
      <Button icon={<UploadOutlined />}>Upload</Button>
     
    </Upload>
   
      </Form.Item>
  
      <Form.Item name={['film', 'rate_count']} label="rate_count">
        <Input defaultValue={props.detail[0].rate_count}/>
      </Form.Item>
      <Form.Item name={['film', 'imdb']} label="imdb">
        <Input defaultValue={props.detail[0].imdb}/>
      </Form.Item>
      <Form.Item name={['film', 'content']} label="Introduction">
        <Input.TextArea defaultValue={props.detail[0].content}/>
      </Form.Item>
      <Form.Item style={{marginLeft:915+'px'}}wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};