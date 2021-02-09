import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { manuList } from "../../config/leftnav";
import Avatar from "../avatar";
import "./index.css";

const { SubMenu, Item } = Menu;
export default class Leftnav extends Component {
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
    return (
      <div className="sidebar">
        <div className="logo">
          <div className="role">{this.props.role}</div>
          <div className="avatar">
            <Avatar />
          </div>
        </div>
        <Menu
          className="menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys="/home"
        >
          {this.getNodes(manuList)}
        </Menu>
      </div>
    );
  }
}
