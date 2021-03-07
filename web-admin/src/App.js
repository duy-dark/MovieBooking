import routes from "./router";
import React,{ Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import { connect } from 'react-redux';
import MenuHome from "./views/home/menu/MenuHome";
import Login from "./views/login/Login"
import "./styles/styles.scss"
import { getUserInfo } from "./redux/users/actions";

const { Sider } = Layout; 

class App extends Component {
  constructor(props){
    super(props)
    this.props.getUser()
  }
 // const { history } = this.props;
  render(){
  function showRouteComponent(routes) {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
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
    <Router>
       <Route
            path='/login'
            exact={true}
            component={() =><Login/>}
          />
      <Layout>
        <Sider className="left-sidebar"><MenuHome/></Sider>
     
        <Layout>
          <Switch>{showRouteComponent(routes)}</Switch>
        </Layout>
      </Layout>
    </Router>
  );}
}

const mapDispatchToProps=(dispatch)=>({
  getUser:()=>{
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    
    if (token && userID) {
      dispatch(getUserInfo({ token, userID }));
    }
    else {
      dispatch(push('/login'))
    }
  }
})
const mapStateToProps = state => {
  return {
  header: !!state.users.header,
  footer: !!state.users.footer
}};
export default connect(mapStateToProps,mapDispatchToProps)(App);
