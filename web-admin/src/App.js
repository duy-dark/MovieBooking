import routes from "./router";
import React,{ Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import MenuHome from "./views/home/menu/MenuHome";
import Login from "./views/login/Login"
import "./styles/styles.scss"
import { getUserInfo } from "./redux/users/actions";
import { PrivateRoute } from "./components/PrivateRoute"
import MyLoading from './components/MyLoading'
const { Sider } = Layout; 

class App extends Component {
  constructor(props){
    super(props)
    this.props.getUser()

  }
  render(){
  function showRouteComponent(routes) {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      });
    }
    return result;
  }

  return (
    <>
    <MyLoading active={this.props.isLoading}/>
    <Router>
      <Layout>
      { this.props.isLogin && (<Sider className="left-sidebar"><MenuHome/></Sider>)}
        <Layout>
          <Switch>{showRouteComponent(routes)}</Switch>
        </Layout>
        <Route path='/login' exact={true} component={() => <Login/>} />
      </Layout>
      
    </Router>
    </>
  )}
}

const mapDispatchToProps=(dispatch)=>({
  getUser:()=>{
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    
    if (token && userID) {
      dispatch(getUserInfo({ token, userID }));
    }
  }
})
const mapStateToProps = state => {
  return {
  isLogin: !!state.users.user,
  isLoading: state.users.loading + state.films.loading > 0 ? true : false
}};
export default connect(mapStateToProps,mapDispatchToProps)(App);
