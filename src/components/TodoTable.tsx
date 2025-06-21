import { Table, Tag, Button, Popconfirm, Switch, Space, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleTodo, deleteTodo } from "../features/todosSlice";
import type { Todo } from "../features/types";
import dayjs from "dayjs";
import { useState } from "react";
import TodoModal from "./TodoModal";

// Mapping màu sắc cho các loại công việc và độ ưu tiên
const taskTypeColors: Record<string, string> = {
  study: "purple",
  sport: "volcano",
  work: "blue",
  personal: "green",
  shopping: "orange",
  other: "gray",
};

const priorityColors: Record<string, string> = {
  low: "green",
  medium: "orange",
  high: "red",
};

export default function TodoTable() {
  const dispatch = useAppDispatch();
  const { todos, filter } = useAppSelector((state) => state.todos);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  // Xử lý dữ liệu cho bảng
  const processedData = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  // Cấu hình các cột cho bảng
  const columns = [
    {
      title: "Trạng thái",
      dataIndex: "completed",
      key: "completed",
      width: 100,
      render: (completed: boolean, record: Todo) => (
        <Tooltip title={completed ? "Đã hoàn thành" : "Đang thực hiện"}>
          <Switch
            checked={completed}
            onChange={() => dispatch(toggleTodo(record.id))}
            checkedChildren={<CheckCircleOutlined />}
            unCheckedChildren={<ClockCircleOutlined />}
          />
        </Tooltip>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "text",
      key: "text",
      render: (text: string, record: Todo) => (
        <span
          className={`font-semibold ${record.completed ? "text-blue-600" : ""}`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Thời gian",
      key: "time",
      // sorter: true,
      render: (_: any, record: Todo) => (
        <div className="text-sm">
          {record.startTime && (
            <span>{dayjs(record.startTime).format("DD/MM/YY HH:mm")} - </span>
          )}
          {record.endTime && (
            <span>{dayjs(record.endTime).format("HH:mm")}</span>
          )}
        </div>
      ),
    },
    {
      title: "Loại",
      dataIndex: "taskType",
      key: "taskType",
      render: (taskType: string) => (
        <Tag color={taskTypeColors[taskType]}>
          {taskType === "study" && "Học tập"}
          {taskType === "sport" && "Thể thao"}
          {taskType === "work" && "Công việc"}
          {taskType === "personal" && "Cá nhân"}
          {taskType === "shopping" && "Mua sắm"}
          {taskType === "other" && "Khác"}
        </Tag>
      ),
    },
    {
      title: "Ưu tiên",
      dataIndex: "priority",
      key: "priority",
      // sorter: true,
      render: (priority: string) => (
        <Tag color={priorityColors[priority]}>
          {priority === "high" && "Cao"}
          {priority === "medium" && "Trung bình"}
          {priority === "low" && "Thấp"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      render: (_: any, record: Todo) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setCurrentTodo(record);
                setModalVisible(true);
              }}
            />
          </Tooltip>
          <Popconfirm
            title="Bạn có chắc muốn xóa công việc này?"
            onConfirm={() => dispatch(deleteTodo(record.id))}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Tooltip title="Xóa">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Danh sách công việc</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setCurrentTodo(null);
            setModalVisible(true);
          }}
        >
          Thêm công việc
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={processedData}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showTotal: (total) => `Tổng ${total} công việc`,
        }}
        scroll={{ x: true }}
        locale={{
          emptyText: "Không có công việc nào",
        }}
      />

      <TodoModal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        todo={currentTodo}
      />
    </>
  );
}
