import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "../../pages/home";
import Quotes from "../../pages/quotes";
import Orders from "../../pages/orders";
import Invoices from "../../pages/invoices";
import Customers from "../../pages/customers";
import Users from "../../pages/users";
import Roles from "../../pages/roles";
import "./index.css";
export default function Main() {
  return (
    <div className="content-main">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/quotes" component={Quotes} />
        <Route path="/orders" component={Orders} />
        <Route path="/invoices" component={Invoices} />
        <Route path="/customers" component={Customers} />
        <Route path="/users" component={Users} />
        <Route path="/roles" component={Roles} />
        <Redirect to="/home"></Redirect>
      </Switch>
    </div>
  );
}
