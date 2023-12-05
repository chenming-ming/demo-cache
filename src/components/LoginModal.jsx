import React from "react";
import {
  Button,
  Table,
  Form,
  Input,
  Select,
  InputNumber,
  Modal,
  Space,
  Popconfirm,
} from "antd";
import { useImmer } from "use-immer";

export default function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useImmer(false);
  const [List, setList] = useImmer([]);
  const [formValues, setFormValues] = useImmer({});
  const [isEdit, setIsEdit] = useImmer(true);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    //编辑逻辑
    if (!isEdit) {
      setList((draft) => {
        const index = draft.findIndex((item) => item.id === formValues.id);
        if (index !== -1) {
          draft.splice(index, 1, values);
        }
      });
      form.resetFields();
      setIsModalOpen(false);
    }

    //新增逻辑
    setList((draft) => {
      draft.unshift({ id: new Date().getTime(), ...values });
    });
    form.resetFields();
    setIsModalOpen(false);
  };

  // 删除逻辑
  const handleDelete = (key) => {
    setList((draft) => {
      const index = draft.findIndex((item) => item.id === key);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  };

  const columns = [
    {
      title: "昵称",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "密码",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "确认密码",
      key: "pwd",
      dataIndex: "pwd",
    },
    {
      title: "性别",
      key: "sex",
      dataIndex: "sex",
    },
    {
      title: "年龄",
      key: "age",
      sort: (a, b) => a.age - b.age,
      dataIndex: "age",
    },
    {
      title: "个人简介",
      key: "intro",
      dataIndex: "intro",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) =>
        List.length >= 1 ? (
          <Space size="middle">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setIsEdit(false);
                setFormValues(record);
                //! 这边可以拿到值但是，form没有获取到
                console.log(112, record, formValues);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="是否需要删除?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        注册新用户
      </Button>
      <Table columns={columns} dataSource={List} rowKey="id" />
      <Modal title={isEdit ? "新增" : "编辑"} open={isModalOpen} footer={null}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initFormValue={formValues}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="昵称"
            name="username"
            tooltip="留下你的美名流芳百世"
          >
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" hasFeedback>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="pwd"
            dependencies={["password"]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Select>
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="年龄" name="age">
            <InputNumber />
          </Form.Item>
          <Form.Item label="个人简介" name="intro">
            <Input.TextArea
              rows={2}
              showCount
              maxLength={100}
              placeholder="简介"
            />
          </Form.Item>
          <Form.Item>
            <Space size="middle">
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" htmlType="submit">
                {isEdit ? "新增提交" : "编辑提交"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
