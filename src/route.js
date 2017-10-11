import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RootRoute     from './root.js';
import HomePage      from './Pages/Home/home.js';
import SignInPage    from './Pages/Login/sign-in.js';
import SignUpPage    from './Pages/Login/sign-up.js';
import UserInfoPage  from './Pages/User/info.js';
import PostShow      from './Pages/PostShow/post-show.js';
import DashBoardPage from './Pages/UserDashBoard/dasboard.js';
import Footer        from './Components/footer/index.js';

class RouteCM extends Component{
    render(){
        return(
        <Router>
            <div id="main-layout">
                <Route path='/' exact         component={RootRoute}    />
                <Route path='/home'           component={HomePage}     />
                <Route path='/sign-in'        component={SignInPage}   />
                <Route path='/sign-up'        component={SignUpPage}   />
                <Route path='/a/settings/'    component={DashBoardPage} />
                <Route path='/post/:postId'   component={PostShow}     />
                <Route path='/user/:username' component={UserInfoPage} />
                <Footer />
            </div>
        </Router>
        )
    }
}


export default RouteCM;