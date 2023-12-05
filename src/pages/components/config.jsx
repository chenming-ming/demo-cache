import { Button, Space, Popconfirm } from "antd";

export const mockData = [
  {
    id: 1,
    username: "嚣张",
    phone: 13762552234,
    password: 12345,
    pwd: 12345,
    sex: "男",
    age: 17,
    intro: "hello react",
  },
  {
    id: 2,
    username: "嚣张2",
    phone: 13762552234,
    password: 12345,
    pwd: 12345,
    sex: "男",
    age: 17,
    intro: "hello react",
  },
  {
    id: 3,
    username: "嚣张3",
    phone: 13762552234,
    password: 12345,
    pwd: 12345,
    sex: "男",
    age: 17,
    intro: "hello react",
  },
];

export const columns = (List, handleEdit, handleDelete) => {
  return [
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
        List.length >= 1 && (
          <Space size="middle">
            <Button
              onClick={() => {
                handleEdit(record);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="是否需要删除?"
              onConfirm={() => handleDelete(record.id)}
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
