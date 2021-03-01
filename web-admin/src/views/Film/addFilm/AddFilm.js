import { Form, Input, Button } from 'antd';
import React from 'react';

import { Select } from 'antd';

import { useDispatch , useSelector} from "react-redux";
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

export default function AddFilm  (props) {
  let selectCategories=[];
  
  const onFinish = (values) => {
    selectCategories=props.categories.filter((item,index)=> values.film.category_ids.includes(index.toString())==true?item:null);
    let idCategories=[]
    for(let item of selectCategories)
    idCategories.push(item._id)
    values.film.category_ids=idCategories;
    console.log(values)
  };

  return (
    <Form style={{marginLeft:-200,marginRight:50}}{...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
        name={['film', 'TimeLong']}
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
        name={['film', 'country']}
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
        <Input /> 
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
        name={['film', 'Url_background']}
        label="Url_background"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input /> 
      </Form.Item>
      <Form.Item name={['film', 'introduction']} label="Introduction">
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