import DashboardComponent from "../src/components/DashboardComponent";
import LoginComponent from "../src/components/LoginComponent";
import MyAccount from "../src/components/MyAccount";
import RegisterComponent from "../src/components/RegisterComponent";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ForgotPassComponent from "../src/components/ForgotPassComponent";
//import ShareButton from "../src/components/usefulComponents/ShareButton"
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Homepage from "./components/Homepage";
import ErrorPage from "./components/usefulComponents/MissingRouteError";
import "./index.css";
import ConcertComponent from "./components/ConcertComponent";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/concert" component={ConcertComponent} />
          <PrivateRoute
            exact
            path="/dashboard"
            component={DashboardComponent}
          />
          <Route path="/login" component={LoginComponent} />
          <PrivateRoute path="/account" component={MyAccount} />
          <PublicRoute path="/register" component={RegisterComponent} />
          <Route path="/ChangePassword" component={ForgotPassComponent} />
          <PublicRoute exact path="/" component={LoginComponent} />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
