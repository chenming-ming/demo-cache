import React from "react";
import { Button, Table, Form, Space, Popconfirm } from "antd";
import { useImmer } from "use-immer";
import RegisterForm from "./components/RegisterForm";
import { columnsList } from "./components/config";
import { mockData } from "../mock";

export default function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useImmer(false);
  // const [List, setList] = useImmer([]);
  const [List, setList] = useImmer(mockData);
  const [formValues, setFormValues] = useImmer({});
  const [isEdit, setIsEdit] = useImmer(true);

  const [form] = Form.useForm();

  const columns = [
    ...columnsList,
    {
      title: "操作",
      key: "action",
      render: (_, record) =>
        List.length >= 1 && (
          <Space size="middle">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setIsEdit(false);
                setFormValues(record);
                form.setFieldsValue(record);
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
        ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    if (isEdit) {
      //新增逻辑
      setList((draft) => {
        draft.unshift({ id: new Date().getTime(), ...values });
      });
      form.resetFields();
      setIsModalOpen(false);
    } else {
      //编辑逻辑
      setList((draft) => {
        const index = draft.findIndex((item) => item.id === formValues.id);
        if (index !== -1) {
          draft.splice(index, 1, values);
        }
      });
      form.resetFields();
      setIsModalOpen(false);
    }
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

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        注册新用户
      </Button>
      <Table columns={columns} dataSource={List} rowKey="id" />
      <RegisterForm
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onFinish={onFinish}
        isEdit={isEdit}
        formValues={formValues}
        form={form}
        handleOk={handleOk}
      />
    </div>
  );
}
