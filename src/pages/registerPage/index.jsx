import React, { useRef } from "react";
import { Button, Table, message } from "antd";
import { useImmer } from "use-immer";
import RegisterForm from "./components/RegisterForm";
import { mockData, columns } from "./components/config";

export default function RegisterPage() {
  const [isEdit, setIsEdit] = useImmer(true);
  const [list, setList] = useImmer(mockData);
  const registerFormRef = useRef(null);

  // 操作删除逻辑
  const handleDelete = (key) => {
    setList((draft) => {
      return draft.filter((d) => d.key !== key);
    });
    message.success("删除成功");
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 8 }}
        onClick={() => registerFormRef?.current?.showModal()}
      >
        注册新用户
      </Button>
      <Table
        columns={columns(registerFormRef, handleDelete)}
        dataSource={list}
        rowKey="key"
      />
      <RegisterForm
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setList={setList}
        ref={registerFormRef}
      />
    </>
  );
}
