import React, { useState, useEffect } from 'react'
import "antd/dist/antd.css";
import "../../styles/login/login.scss";
import {signIn} from "../../redux/users/actions"
import { useStore, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function Login(props) {

  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();
  const { message = '' } = (location && location.state) || {};
  const [err] = useState('');

  const { handleSubmit, register, errors } = useForm({
    email: '',
    password: ''
  });

  const onSubmitLogin = (values) => {
    dispatch(signIn(values, history))
  }

  useEffect(() => {
    // let token = getToken(users);
    // if (token) {
    //   history.push('/');
    // } 
  }, [])

  // const onFinish = (values) => {
  //   dispatch(signIn({"email":values.username,"password":values.password}, history))
  // };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login-title">
          Admin
        </div>
        <div className="login__success">{message}</div>
        <div className="login__err">{err}</div>
        <form className="login-form" onSubmit={handleSubmit(onSubmitLogin)}>
          <div className="form-group form-group--email">
            <input placeholder="Your email"
              name="email"
              type="email"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              })}
            />
            {errors.email && errors.email.message}
          </div>
          <div className="form-group form-group--pass">
            <input placeholder="Your password"
              name="password"
              type="password"
              ref={register({
                required: "Required",
                minLength: 6
              })}
            />
            {errors.password && errors.password.message}
          </div>
          <div className="form-group--forget-pass"><Link to="/forget_password" className="">Quên mật khẩu</Link></div>
          <div className="form-group group-btns">
            {/* <Link to="/register" className="btn btn-login">Register</Link> */}
            <button className="btn btn-login" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
