import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User_Login from "./Components/User_Login";
import User_Registration from "./Components/User_Registration";
import User_Dashboard from "./Components/User_Dashboard";
import User_category from "./Components/User_category";
import User_blog from "./Components/User_blog";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={User_Login} />
          <Route exact path="/signup" component={User_Registration} />
          <Route exact path="/user/dashboard" component={User_Dashboard} />
          <Route exact path="/user/category" component={User_category} />
          <Route exact path="/user/blog" component={User_blog} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
