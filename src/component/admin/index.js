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
import { getRoles } from "../../api/index";
const { Header, Content, Footer, Sider } = Layout;

export default class Homepage extends React.Component {
  state = {
    //recieve menus information
    menus: [],
  };

  componentDidMount = async () => {
    const result = await getRoles();
    //match out the menus based on its role
    const filterd = result.data.data.filter(
      (item) => item.rolename === this.user.role
    );
    if (filterd[0]) {
      this.setState({
        menus: filterd[0].menus,
      });
    }
  };

  render() {
    const { menus } = this.state;
    this.user = getUser();
    this.user = jwt.decode(this.user);
    console.log("this.user", this.user);
    if (!this.user) return <Redirect to="/login" />;
    const { role, username, imgUrl } = this.user;
    return (
      <Layout className="layout">
        <Sider>
          <Leftnav role={role} menus={menus} imgUrl={imgUrl}></Leftnav>
        </Sider>
        <Layout className="main-layout">
          <Header className="header">
            <Head username={username} />
          </Header>

          <Content className="content">
            <Searchbar />
            <Main role={role} />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2021 Created by Team Explorers
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
