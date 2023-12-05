export const columnsList = [
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
];
