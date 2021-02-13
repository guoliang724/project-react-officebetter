import React from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import Main from "../main";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./index.css";
import Leftnav from "../leftnav";
import Head from "../head";
import { getUser } from "../../util/storage";
import jwt from "jsonwebtoken";
import Searchbar from "../searchbar";
const { Header, Content, Footer, Sider } = Layout;

export default class Homepage extends React.Component {
  render() {
    var user = getUser();
    user = jwt.decode(user);
    console.log("user", user);
    if (!user) return <Redirect to="/login" />;
    const { role, username, imgUrl } = user;
    return (
      <Layout className="layout">
        <Sider>
          <Leftnav role={role} imgUrl={imgUrl}></Leftnav>
        </Sider>
        <Layout className="main-layout">
          <Header className="header">
            <Head username={username} />
          </Header>

          <Content className="content">
            <Searchbar />
            <Main />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2021 Created by Team Explorers
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
