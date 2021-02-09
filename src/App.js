import React from "react";
import Homepage from "./component/admin";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/login";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
