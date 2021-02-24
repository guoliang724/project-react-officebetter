import React, { useEffect, useState } from "react";
import "./index.css";
import { Card, Table, Button, Modal, Form, Input, message, Tree } from "antd";
import { addRole, getRoles } from "../../api/index";
import { manuList } from "../../config/leftnav";
const { Item } = Form;

export default function Roles() {
  //handling datas of role
  const [datas, setDatas] = useState([]);
  //control the adding form status
  const [addingShow, setaddingShow] = useState(false);
  //control the modify tree component status
  const [modifyShow, setmodifyShow] = useState(false);
  const [form] = Form.useForm();
  //handle the selected row
  const [row, setRow] = useState({});
  //handle the menu of the selected row
  const [selectedRowMenu, setselectedRowMenu] = useState([]);
  //the added role name
  const columns = [
    {
      title: "Role Name",
      dataIndex: "rolename",
      key: "rolename",
    },
    {
      title: "Creat Time",
      dataIndex: "createtime",
      key: "createtime",
    },
    {
      title: "Authorized Time",
      dataIndex: "authorizedtime",
      key: "authorizedtime",
    },
    {
      title: "Authorizor",
      dataIndex: "authorizor",
      key: "authorizor",
    },
  ];

  //getting tree nodes
  const getTreeNodes = (array) => {
    return array.map((item, index) => {
      return {
        title: item.content,
        key: item.key,
        children: item.children ? getTreeNodes(item.children) : "",
      };
    });
  };
  //the data format of tree component
  const treeDatas = [
    {
      title: "Authority",
      key: "All",
      children: getTreeNodes(manuList),
    },
  ];

  //handle tree component(settings for role)
  const handleTree = () => {};
  //handle onrow callback function in table settings
  const handleonRow = (record, index) => {
    return {
      onClick: () => {
        setRow(record);
        console.log(row.rolename);
      },
    };
  };
  //handle adding a new role
  const handleAdding = async () => {
    const validResult = await form.validateFields();
    if (validResult.errorFields && validResult.errorFields.length > 0) return;
    const rolename = form.getFieldValue("rolename");
    const result = await addRole(rolename);
    if (result.data.status === 1) {
      message.success("success!");
      setaddingShow(false);
    } else {
      message.warn(result.data.err);
      setaddingShow(false);
    }
    setaddingShow(false);
  };

  //handle all form status being cancel
  const handleCancle = () => {
    setaddingShow(false);
    setmodifyShow(false);
  };

  //the title of card component
  const title = (
    <>
      <Button
        style={{ marginRight: 20 }}
        type="primary"
        onClick={() => {
          setaddingShow(true);
        }}
      >
        Create A Role
      </Button>
      <Button
        type="primary"
        onClick={() => {
          console.log("click");
          setmodifyShow(true);
        }}
        disabled={!row.id}
      >
        Set Roles
      </Button>
    </>
  );

  //handle ajax request side effect
  useEffect(() => {
    getRoles()
      .then((data) => {
        setDatas(data.data.data);
      })
      .catch((err) => {
        message.warn(err);
      });
    console.log("navlist", manuList);
  }, []);

  return (
    <Card title={title} bordered>
      <Table
        rowKey="id"
        columns={columns}
        rowSelection={{
          type: "radio",
          selectedRowKeys: [row.id],
          onChange: (rowkeys, rows) => {
            setRow(rows[0]);
          },
        }}
        onRow={handleonRow}
        dataSource={datas}
      ></Table>
      <Modal
        visible={addingShow}
        onOk={handleAdding}
        onCancel={handleCancle}
        title="Adding a role"
      >
        <Form form={form}>
          <Item
            name="rolename"
            label="role_name"
            rules={[
              {
                required: true,
                message: "Please Input..",
              },
            ]}
          >
            <Input />
          </Item>
        </Form>
      </Modal>
      <Modal
        visible={modifyShow}
        title="set roles"
        onOk={handleTree}
        onCancel={handleCancle}
      >
        <Form>
          <Item label="Role:" wrapperCol={{ span: 18 }}>
            <Input disabled value={row.rolename} />
          </Item>
        </Form>
        <Tree checkable treeData={treeDatas} autoExpandParent={true}></Tree>
      </Modal>
    </Card>
  );
}
