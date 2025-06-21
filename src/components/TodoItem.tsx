import { useState } from "react";
import { motion } from "framer-motion";
import { Checkbox, Button, Input, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { Todo } from "../features/types";
import { useAppDispatch } from "../app/hooks";
import { toggleTodo, deleteTodo, editTodo } from "../features/todosSlice";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    if (editText.trim()) {
      dispatch(editTodo({ id: todo.id, text: editText }));
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-3 my-2 bg-white rounded-lg shadow"
    >
      <div className="flex items-center flex-1">
        <Checkbox
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
          className="mr-3"
        />

        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onPressEnter={handleEdit}
            autoFocus
            className="flex-1 mr-2"
          />
        ) : (
          <span
            className={`flex-1 ${
              todo.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button
              type="text"
              icon={<CheckOutlined />}
              onClick={handleEdit}
              className="text-green-500"
            />
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => {
                setIsEditing(false);
                setEditText(todo.text);
              }}
              className="text-red-500"
            />
          </>
        ) : (
          <>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
              className="text-blue-500"
            />
            <Popconfirm
              title="Bạn có chắc muốn xóa?"
              onConfirm={() => dispatch(deleteTodo(todo.id))}
              okText="Có"
              cancelText="Không"
            >
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="text-red-500"
              />
            </Popconfirm>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem;
