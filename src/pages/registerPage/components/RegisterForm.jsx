import { forwardRef, useImperativeHandle } from "react";
import { Button, Form, Input, Select, InputNumber, Modal, message } from "antd";
import { useImmer } from "use-immer";

function RegisterForm(props, ref) {
  const { isEdit, setList, setIsEdit } = props;
  const [isModalOpen, setIsModalOpen] = useImmer(false);
  const [formValues, setFormValues] = useImmer({});

  const [form] = Form.useForm();

  // 将方法暴露给父组件
  useImperativeHandle(ref, () => ({
    showModal,
    handleEdit,
  }));

  // 模态框显示
  const showModal = () => {
    setIsModalOpen(true);
  };

  // 操作 - 编辑逻辑
  const handleEdit = (record) => {
    setIsModalOpen(true);
    setIsEdit(false);
    setFormValues(record);
    form.setFieldsValue(record);
  };

  // 模态框 - 数据处理
  const onFinish = (values) => {
    if (isEdit) {
      // 表单 - 新增逻辑
      setList((draft) => {
        draft.unshift({ key: new Date().getTime(), ...values });
      });
      message.success("新增成功");
    } else {
      // 表单 - 编辑逻辑
      setList((draft) => {
        const index = draft.findIndex((item) => item.key === formValues.key);
        if (index !== -1) {
          draft.splice(index, 1, values);
        }
      });
      setIsEdit(true);
      message.success("编辑成功");
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  // 模态框 - 隐藏逻辑
  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // 模态框 - 隐藏逻辑
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={isEdit ? "新增" : "编辑"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="昵称"
          name="username"
          tooltip="请输入您的姓名"
          rules={[{ required: true, message: "姓名不能为空" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            {
              required: true,
              message: "手机号格式错误，请重新输入",
              pattern:
                /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "请填写密码",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="性别" name="sex">
          <Select>
            <Select.Option value="男">男</Select.Option>
            <Select.Option value="女">女</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="年龄"
          name="age"
          rules={[
            {
              required: true,
              type: "number",
              min: 9,
              max: 100,
              message: "年龄在9~100之间",
            },
          ]}
        >
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button style={{ marginRight: "20px" }} onClick={handleCancel}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            {isEdit ? "新增提交" : "编辑提交"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default forwardRef(RegisterForm);
