import React, { useState, useEffect } from "react";
import "./index.css";
import { Card, Table, Button, Modal, Form, Input, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { addUser, getUsers, updateUser, deleteUser } from "../../api/index";
const { Item } = Form;
const { confirm } = Modal;
export default function Users() {
  //form ref to control the adding form
  const [form] = Form.useForm();
  //form ref to control the updating form
  const [form1] = Form.useForm();
  //control the status of adding form modal
  const [addShow, setAddShow] = useState(false);
  //control the status of updating form modal
  const [updateShow, setupdateShow] = useState(false);
  //control the status of the deleting form modal
  const [deleteShow, setdeleteShow] = useState(false);
  //the data of users list
  const [datas, setDatas] = useState([]);
  //the selected to be updated or deleted data
  const [selectedData, setselectedData] = useState({});
  const title = (
    <Button
      onClick={() => {
        form.resetFields();
        setAddShow(true);
      }}
      type="primary"
    >
      New User
    </Button>
  );

  //for table coloums
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
      key: "operate",
      render: (data) => (
        <div className="operate-button">
          <Button
            type="primary"
            onClick={() => {
              setselectedData(data);
              setupdateShow(true);
              form1.setFieldsValue({
                loginId: data.loginId,
                loginPwd: data.loginPwd,
                email: data.email,
                role: data.role,
              });
            }}
          >
            Modify
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setselectedData(data);
              console.log(selectedData);
              console.log(data);
              showDeleteConfirm(selectedData.key);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  //handle adding form
  const handleAdd = async () => {
    const validResult = await form.validateFields();
    if (validResult.errorFields && validResult.errorFields.length > 0) return;
    const value = form.getFieldsValue();
    const { loginId, loginPwd, email, role } = value;
    const result = await addUser({ loginId, loginPwd, email, role });
    if (result.data.status === 1) {
      message.success("Success!");
      setDatas([...datas, result.data.data]);
      setAddShow(false);
    }
  };
  //handle updating form
  const handleUpdate = async () => {
    //validate first
    const validResult = await form1.validateFields();
    if (validResult.errorFields && validResult.errorFields.length > 0) return;
    const value = form1.getFieldsValue();
    const { loginId, loginPwd, email, role } = value;
    const id = selectedData.key;

    //update data in the backend
    const result = await updateUser(id, loginId, loginPwd, email, role);
    setupdateShow(false);
    if (result.data.status === 1) {
      message.success("success!");
    }
  };

  const handleCancel = () => {
    setAddShow(false);
    setupdateShow(false);
  };
  //handle delete user function
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this user?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const result = await deleteUser(id);
          if (result.data.status === 1) message.success("success!");
          else {
            message.warn("failed");
          }
        } catch (err) {
          message.error(err);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  //handle ajax side effect
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
          rowKey="id"
          bordered
          dataSource={datas}
          columns={columns}
          tableLayout="auto"
          pagination={{ pageSize: 3 }}
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
        <Modal
          visible={updateShow}
          title="Update"
          onOk={handleUpdate}
          onCancel={handleCancel}
        >
          <Form form={form1} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
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
