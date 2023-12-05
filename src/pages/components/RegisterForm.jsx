import { Button, Form, Input, Select, InputNumber, Modal } from "antd";

export default function RegisterForm(props) {
  const {
    isEdit,
    isModalOpen,
    formValues,
    form,
    onFinish,
    handleCancel,
    handleOk,
  } = props;
  return (
    <>
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
          <Form.Item
            label="确认密码"
            name="pwd"
            dependencies={["password"]}
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
          <Form.Item
            label="性别"
            name="sex"
            rules={[
              {
                required: true,
                message: "请选择性别",
              },
            ]}
          >
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
                min: 0,
                max: 150,
                message: "请填写适当的年龄",
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
    </>
  );
}
