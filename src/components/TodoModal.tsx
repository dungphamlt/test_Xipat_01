import { Modal, Form, Input, DatePicker, Select, Radio, Button } from "antd";
import { useAppDispatch } from "../app/hooks";
import { addTodo, editTodo } from "../features/todosSlice";
import type { Todo, TaskType } from "../features/types";
import dayjs from "dayjs";
import { useEffect } from "react";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface TodoModalProps {
  open: boolean;
  onClose: () => void;
  todo?: Todo | null; // Null khi thêm mới, có giá trị khi chỉnh sửa
}

export default function TodoModal({ open, onClose, todo }: TodoModalProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  // Reset form khi todo thay đổi
  useEffect(() => {
    if (todo) {
      form.setFieldsValue({
        text: todo.text,
        timeRange:
          todo.startTime && todo.endTime
            ? [dayjs(todo.startTime), dayjs(todo.endTime)]
            : undefined,
        taskType: todo.taskType,
        priority: todo.priority || "medium",
      });
    } else {
      form.resetFields();
    }
  }, [todo, form]);

  const onFinish = (values: {
    text: string;
    timeRange?: [dayjs.Dayjs, dayjs.Dayjs];
    taskType: TaskType;
    priority: "low" | "medium" | "high";
  }) => {
    if (todo) {
      // Chỉnh sửa công việc hiện có
      dispatch(
        editTodo({
          id: todo.id,
          text: values.text,
          startTime: values.timeRange?.[0]?.valueOf(),
          endTime: values.timeRange?.[1]?.valueOf(),
          taskType: values.taskType,
          priority: values.priority,
        })
      );
    } else {
      // Thêm công việc mới
      dispatch(
        addTodo({
          text: values.text,
          startTime: values.timeRange?.[0]?.valueOf(),
          endTime: values.timeRange?.[1]?.valueOf(),
          taskType: values.taskType,
          priority: values.priority,
        })
      );
    }
    onClose();
  };

  return (
    <Modal
      title={todo ? "Chỉnh sửa công việc" : "Thêm công việc mới"}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          taskType: "work",
          priority: "medium",
        }}
      >
        <Form.Item
          name="text"
          label="Nội dung công việc"
          rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
        >
          <Input placeholder="Nhập công việc..." />
        </Form.Item>

        <Form.Item name="timeRange" label="Thời gian thực hiện">
          <RangePicker showTime format="DD/MM/YYYY HH:mm" className="w-full" />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item name="taskType" label="Loại công việc">
            <Select>
              <Option value="study">Học tập</Option>
              <Option value="sport">Thể thao</Option>
              <Option value="work">Công việc</Option>
              <Option value="personal">Cá nhân</Option>
              <Option value="shopping">Mua sắm</Option>
              <Option value="other">Khác</Option>
            </Select>
          </Form.Item>

          <Form.Item name="priority" label="Độ ưu tiên">
            <Radio.Group>
              <Radio.Button value="low">Thấp</Radio.Button>
              <Radio.Button value="medium">Trung bình</Radio.Button>
              <Radio.Button value="high">Cao</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {todo ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
