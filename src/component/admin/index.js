import React from "react";
import { Layout } from "antd";
import Main from "../main";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./index.css";
import Leftnav from "../leftnav";
import Head from "../head";

const { Header, Content, Footer, Sider } = Layout;

export default class Homepage extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Sider>
          <Leftnav></Leftnav>
        </Sider>
        <Layout className="main-layout">
          <Header className="header">
            <Head />
          </Header>
          <Content className="content">
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
