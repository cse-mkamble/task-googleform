import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Home from './Screens/Home';
// import auth from './services/authService';
// import EditForm from './Components/Form/EditForm';
// import Login from './Components/Login';
// import PrivateRoute from './Components/util/PrivateRoute';
// import UserView from './Components/Responding/UserView';
// import RadioCheck from './Components/Responding/RadioCheck';

function Main() {
  return (<Router>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/login" component={Login} /> */}
      {/* <PrivateRoute path="/form/:formId" component={EditForm} />
      <Route exact path="/s/:formId" component={UserView} />
      <Route exact path="/fuck" component={RadioCheck} /> */}
    </Switch>
  </Router>);
}

ReactDOM.render(<Main />, document.getElementById('root'));