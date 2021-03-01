import React, { useEffect } from "react";
import "../../styles/customers/login/login.scss";
import { useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { Link, useHistory } from "react-router-dom";
import { signIn, updateHeaderFooter } from "../../redux/users/actions";

export default function Login(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const responseFacebook = (response) => {
    const user = {
      facebook_id: response.id,
      name: response.name,
      email: response.email,
      avatar: response.picture.data.url,
      account_type: "facebook",
    };
    dispatch(signIn(user, history));
  };

  const responseGoogle = (response) => {
    const user = {
      google_id: response.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email,
      avatar: response.profileObj.imageUrl,
      account_type: "Google",
    };
    dispatch(signIn(user, history));
  };
  useEffect(() => {
    dispatch(
      updateHeaderFooter({
        header: false,
        footer: false,
      })
    )
  // eslint-disable-next-line
  }, []);
  return (
    <div className="login">
      <div className="login-background">
        <div className="login-form">
          <div className="login-form__logo">
            <img src="/assets/group@2x.png" alt="" />
          </div>
          <div className="login-form__groups">
            <p className="login-form__groups__title">Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!</p>
            <div className="groups-btn">
              <FacebookLogin
                appId="1380395492300580"
                callback={responseFacebook}
                fields="name,email,picture"
                render={(renderProps) => (
                  <button type="button" onClick={renderProps.onClick} className="btn btn-facebook">
                    Đăng nhập với Facebook
                  </button>
                )}
              />
              <GoogleLogin
                clientId="420984700024-mtmtndn31tamjca6g6tuqriveu3afrng.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
                fetchBasicProfile
                render={(renderProps) => (
                  <button
                    type="button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="btn btn-google"
                  >
                    Đằng nhập với Google
                  </button>
                )}
              />
              <Link to="/" className="btn btn-zalo">
                Về Trang Chủ
              </Link>
            </div>
          </div>
        </div>
        <div className="login-animation" />
      </div>
    </div>
  );
}
