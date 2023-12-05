import { Button, Space, Popconfirm } from "antd";

export const mockData = [
  {
    key: 1,
    username: "测试1",
    phone: 13762552234,
    password: 12345,
    sex: "男",
    age: 17,
    intro: "hello react",
  },
  {
    key: 2,
    username: "测试2",
    phone: 1376255256,
    password: 12234,
    sex: "女",
    age: 27,
    intro: "hello world",
  },
  {
    key: 3,
    username: "测试3",
    phone: 13763552234,
    password: 12145,
    sex: "男",
    age: 37,
    intro: "hello javascript",
  },
  {
    key: 4,
    username: "测试4",
    phone: 13763442234,
    password: 12445,
    sex: "女",
    age: 47,
    intro: "hello javascript1",
  },
  {
    key: 5,
    username: "测试5",
    phone: 13763522234,
    password: 11145,
    sex: "男",
    age: 57,
    intro: "hello javascript2",
  },
  {
    key: 6,
    username: "测试6",
    phone: 13763552244,
    password: 121456,
    sex: "女",
    age: 37,
    intro: "hello man",
  },
];

export const columns = (list, registerFormRef, handleDelete) => {
  return [
    {
      title: "昵称",
      dataIndex: "username",
    },
    {
      title: "手机号",
      dataIndex: "phone",
    },
    {
      title: "密码",
      dataIndex: "password",
    },
    {
      title: "性别",
      dataIndex: "sex",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "个人简介",
      dataIndex: "intro",
    },
    {
      title: "操作",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              registerFormRef.current.handleEdit(record);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="是否需要删除?"
            onConfirm={() => handleDelete(record.key)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
