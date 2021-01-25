import {
  DollarCircleOutlined,
  TeamOutlined,
  SnippetsOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import React from "react";
export const manuList = [
  {
    key: "/home",
    icon: <HomeOutlined />,
    path: "/home",
    content: "Home",
    isPublic: true,
  },
  {
    key: "/quotes",
    icon: <DollarCircleOutlined />,
    path: "/quotes",
    content: "Quotes",
  },
  {
    key: "/orders",
    icon: <SnippetsOutlined />,
    path: "/orders",
    content: "Orders",
  },
  {
    key: "/invoices",
    icon: <ShoppingCartOutlined />,
    path: "/invoices",
    content: "Invoices",
  },
  {
    key: "/customers",
    icon: <TeamOutlined />,
    path: "/customers",
    content: "Customers",
  },
  {
    key: "/settings",
    icon: <SettingOutlined />,
    content: "Settings",
    children: [
      {
        key: "/users",
        icon: <UserOutlined />,
        path: "/users",
        content: "Users",
      },
      {
        key: "/roles",
        icon: <KeyOutlined />,
        path: "/roles",
        content: "Roles",
      },
    ],
  },
];
