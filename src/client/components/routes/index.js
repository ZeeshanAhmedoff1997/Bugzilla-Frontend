import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
//import { browserHistory } from 'react-router';
import Home from '../layout/Home';
import Login from '../authentication/SignInUser';
import Register from '../authentication/RegisterUser';
import SignOut from '../authentication/signOut';
import store from '../../redux/Store'
import Bug from '../layout/bug'
import Project from '../layout/project';
import ViewBugs from '../layout/ViewBugs';
import showDeveloper from '../layout/developers'
import addResource from '../layout/addResource'
import { stat } from 'fs';

class RenderRoutes extends React.Component {
   state = {
  };
  componentDidMount() {
   const currentState= store.getState();
    console.log("store data",currentState);
  }
  renderRoutes = () => {
    return (
      <Router /*history={browserHistory}*/>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/Home" component={Home} />
          <AppLayoutRoute path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/signout" component={SignOut} />
          <Route path="/bug/new" component={Bug} />
           <Route path="/project/new" component={Project} /> 
          <Route path="/bugs/index" component={ViewBugs} />
          <Route path="/developers" component={showDeveloper} />
          <Route path="/addResource" component={addResource} />
        </Switch>
      </Router>
    );
  }
  render() {
    return (
       this.renderRoutes()
    );
  }
};


const AppLayoutRoute = ({ component: Component, ...rest}) => {
  const state= store.getState();
  console.log('state',state)
  console.log('state.reduxTokenAuth.currentUser.isSignedIn',state.reduxTokenAuth.currentUser.isSignedIn)
  const isLogin=state.reduxTokenAuth.currentUser.isSignedIn

  const redirectToRelativePage = () => {
    if (!isLogin ) {
      return (<Redirect to='/login' />);
    } else if (isLogin) {
        return (<Redirect to='/home' />);
    }
    return ('');
  }
  console.log('is login',isLogin)
  let showLayout = true;
  if (!isLogin ) {
    showLayout = false;
  }
  console.log("hye from applayout ");
  return (
    <Route {...rest} render={matchProps => (
      console.log(showLayout),
      showLayout
      ? redirectToRelativePage()
      : (<Login>
        <Component {...matchProps} />
      </Login>)
    )} />
  )
};
 const MangerRoute = ({ component: Component, ...rest}) => {
   const state= store.getState();
   console.log('maanger route',state.reduxTokenAuth.currentUser.attributes.type)
//   console.log('state.reduxTokenAuth.currentUser.isSignedIn',state.reduxTokenAuth.currentUser.isSignedIn)
//   const type=state.reduxTokenAuth.currentUser.isSignedIn

//   const redirectToRelativePage = () => {
//     if (!isLogin ) {
//       return (<Redirect to='/login' />);
//     } else if (isLogin) {
//         return (<Redirect to='/home' />);
//     }
//     return ('');
//   }
//   console.log('is login',isLogin)
//   let showLayout = true;
//   if (!isLogin ) {
//     showLayout = false;
//   }
//   console.log("hye from applayout ");
//   return (
//     <Route {...rest} render={matchProps => (
//       console.log(showLayout),
//       showLayout
//       ? redirectToRelativePage()
//       : (<Login>
//         <Component {...matchProps} />
//       </Login>)
//     )} />
//   )
};

export default RenderRoutes;


