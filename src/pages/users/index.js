import React, { useState, useEffect } from "react";
import "./index.css";
import { Card, Table, Button, Modal, Form, Input, message } from "antd";
import { addUser, getUsers } from "../../api/index";
const { Item } = Form;

export default function Users() {
  const [form] = Form.useForm();
  const [addShow, setAddShow] = useState(false);
  const [datas, setDatas] = useState([]);
  const title = (
    <Button
      onClick={() => {
        form.resetFields();
        setAddShow(true);
      }}
      type="primary"
    >
      New User{" "}
    </Button>
  );

  const columns = [
    {
      title: "LoginId",
      dataIndex: "loginId",
      key: "loginId",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Operate",
      dataIndex: "operate",

      render: () => (
        <div className="operate-button">
          <Button type="primary">Modify</Button>
          <Button type="primary"> Delete</Button>
        </div>
      ),
    },
  ];

  const handleAdd = async () => {
    const validResult = await form.validateFields();
    if (validResult.errorFields && validResult.errorFields.length > 0) return;
    const value = form.getFieldsValue();
    const { loginId, loginPwd, email, role } = value;
    const result = await addUser({ loginId, loginPwd, email, role });
    if (result.data.status === 1) {
      message.success("Success!");
      setDatas([...datas, result.data.data]);
    }
  };
  const handleCancel = () => {
    setAddShow(false);
  };

  useEffect(() => {
    getUsers()
      .then((data) => {
        const datas = data.data.data.map((item) => {
          return {
            key: item.id,
            loginId: item.loginId,
            email: item.email,
            role: item.role,
          };
        });
        setDatas(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [datas]);
  return (
    <div className="settings-user">
      <Card title={title} bordered>
        <Table
          style={{ width: "80%", margin: "0 auto" }}
          bordered
          dataSource={datas}
          columns={columns}
          tableLayout="auto"
        ></Table>
        <Modal
          visible={addShow}
          title="Create A New User"
          onOk={handleAdd}
          onCancel={handleCancel}
        >
          <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <Item
              label="LoginId"
              name="loginId"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="loginPwd"
              name="loginPwd"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input.Password />
            </Item>
            <Item
              label="email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input />
            </Item>

            <Item
              label="role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input />
            </Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
