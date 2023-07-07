import { Button, Form, Input, Select, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";
import { axiosAPI } from "../config/axios.interceptors";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosAPI.get("/api/categories").then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  function onSubmit(data) {
    setLoading(true);
    axiosAPI
      .post("/api/tasks", data)
      .then((res) => {
        message.success("Task created successfull! ");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        message.error("Error , plase try again!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <h1 className="heading">Create any tasks....</h1>

      <Form layout="vertical" onFinish={onSubmit}>
        <FormItem label="Enter title for task" name="task">
          <Input required />
        </FormItem>
        <FormItem label="Choose category" name="category_id">
          <Select
            required
            options={categories.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </FormItem>

        <FormItem label="Description" name="description">
          <TextArea required />
        </FormItem>
        <Button
          loading={loading}
          htmlType="submit"
          type="primary"
          className="bg-blue-500">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateTask;
