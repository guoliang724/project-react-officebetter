import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import { manuList } from "../../config/leftnav";
import Avatar from "../avatar";
import "./index.css";

const { SubMenu, Item } = Menu;
class Leftnav extends Component {
  //iterate the manulist to get item nodes
  getNodes = (items) => {
    return items.map((item) => {
      if (!item.children) {
        return (
          <Item key={item.key} title={item.content} icon={item.icon}>
            <Link to={item.path}> {item.content}</Link>
          </Item>
        );
      } else {
        return (
          <SubMenu key={item.key} title={item.content} icon={item.icon}>
            {this.getNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };
  render() {
    const imageUrl = this.props.imgUrl;
    const { pathname } = this.props.location;

    return (
      <div className="sidebar">
        <div className="logo">
          <div className="role">{this.props.role}</div>
          <div className="avatar">
            <Avatar imageUrl={imageUrl} />
          </div>
        </div>
        <Menu
          className="menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys="/home"
          selectedKeys={pathname}
        >
          {this.getNodes(manuList)}
        </Menu>
      </div>
    );
  }
}

export default withRouter(Leftnav);
