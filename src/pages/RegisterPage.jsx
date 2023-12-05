import React from "react";
import { Button, Table, Form } from "antd";
import { useImmer } from "use-immer";
import RegisterForm from "./components/RegisterForm";
import { mockData, columns } from "./components/config";

export default function RegisterPage() {
  const [isEdit, setIsEdit] = useImmer(true);
  const [isModalOpen, setIsModalOpen] = useImmer(false);
  const [List, setList] = useImmer(mockData);
  const [formValues, setFormValues] = useImmer({});

  const [form] = Form.useForm();

  // 模态框
  const showModal = () => {
    setIsModalOpen(true);
  };

  // 模态框
  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // 模态框
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // 模态框数据处理
  const onFinish = (values) => {
    if (isEdit) {
      // 表单新增逻辑
      setList((draft) => {
        draft.unshift({ id: new Date().getTime(), ...values });
      });
      form.resetFields();
      setIsModalOpen(false);
    } else {
      // 表单编辑逻辑
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

  // 操作编辑逻辑
  const handleEdit = (record) => {
    setIsModalOpen(true);
    setIsEdit(false);
    setFormValues(record);
    form.setFieldsValue(record);
  };

  // 操作删除逻辑
  const handleDelete = (key) => {
    setList((draft) => {
      const index = draft.findIndex((item: FormValuesType) => item.id === key);
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
      <Table
        columns={columns(List, handleEdit, handleDelete)}
        dataSource={List}
        rowKey="id"
      />
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
