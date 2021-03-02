import React, { useEffect, useState, useContext } from "react";
import "./index.css";
import { Card, Table, Button, Modal, Form, Input, message, Tree } from "antd";
import { addRole, getRoles, updateRoles } from "../../api/index";
import { manuList } from "../../config/leftnav";
import moment from "moment";
const { Item } = Form;

export default function Roles(props) {
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
  const [onSelected, setonSelected] = useState([]);
  //the added role name
  const columns = [
    {
      title: "Role Name",
      dataIndex: "rolename",
      key: "rolename",
    },
    {
      title: "Creat Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (time) => {
        return moment(time).format("YYYY-MM-DD");
      },
    },
    {
      title: "Authorized Time",
      dataIndex: "authTime",
      key: "authTime",
      render: (time) => {
        return time ? moment(time).format("YYYY-MM-DD") : "";
      },
    },
    {
      title: "Authorizor",
      dataIndex: "authAuthor",
      key: "authAuthor",
    },
  ];

  //getting tree nodes
  const getTreeNodes = (array) => {
    return array.map((item, index) => {
      return {
        title: item.content,
        key: item.key,
        children: item.children ? getTreeNodes(item.children) : [],
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
  const handleTree = async () => {
    const validResult = await form.validateFields();
    if (validResult.errorFields && validResult.errorFields.length > 0) return;
    const id = row.id;
    const menus = onSelected;
    const authTime = moment().format("YYYY-MM-DD ");
    const authAuthor = props.role;
    const result = await updateRoles(id, menus, authTime, authAuthor);
    if (result.data.status === 1) {
      message.success("success!");
      setmodifyShow(false);
    }
  };
  //handle onrow callback function in table settings
  const handleonRow = (record, index) => {
    return {
      onClick: () => {
        setRow(record);

        var filteredRow = datas.filter((item) => item.id === record.id);

        setonSelected(filteredRow[0].menus);
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

  const handleOnselected = (checkedKeys) => {
    setonSelected(checkedKeys);
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
    console.log("sxx");
  }, [datas.length]);

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
            var filteredRow = datas.filter((item) => item.id === rows[0].id);
            setonSelected(filteredRow[0].menus);
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
        <Form form={form}>
          <Item label="Role:" wrapperCol={{ span: 18 }}>
            <Input disabled value={row.rolename} />
          </Item>
        </Form>
        <Tree
          checkable
          treeData={treeDatas}
          checkedKeys={onSelected}
          onCheck={handleOnselected}
          defaultExpandAll={true}
        ></Tree>
      </Modal>
    </Card>
  );
}
