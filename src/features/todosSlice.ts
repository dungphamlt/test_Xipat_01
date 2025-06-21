import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo, FilterType, TodoState } from "./types";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/storage";

const initialState: TodoState = {
  todos: loadFromLocalStorage("todos") || [],
  filter: "all",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Thêm todo mới
    addTodo: (
      state,
      action: PayloadAction<{
        text: string;
        startTime?: number;
        endTime?: number;
        taskType:
          | "study"
          | "work"
          | "personal"
          | "shopping"
          | "sport"
          | "other";
        priority?: "low" | "medium" | "high";
      }>
    ) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        createdAt: Date.now(),
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        taskType: action.payload.taskType,
        priority: action.payload.priority || "medium",
      };
      state.todos.push(newTodo);
      saveToLocalStorage("todos", state.todos);
    },

    // Toggle trạng thái completed
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage("todos", state.todos);
      }
    },

    // Xóa todo
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveToLocalStorage("todos", state.todos);
    },

    // Chỉnh sửa todo
    editTodo: (
      state,
      action: PayloadAction<{
        id: string;
        text?: string;
        startTime?: number | null;
        endTime?: number | null;
        taskType?:
          | "study"
          | "work"
          | "personal"
          | "shopping"
          | "sport"
          | "other";
        priority?: "low" | "medium" | "high";
      }>
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        if (action.payload.text !== undefined) {
          todo.text = action.payload.text;
        }
        if (action.payload.startTime !== undefined) {
          todo.startTime =
            action.payload.startTime === null
              ? undefined
              : action.payload.startTime;
        }
        if (action.payload.endTime !== undefined) {
          todo.endTime =
            action.payload.endTime === null
              ? undefined
              : action.payload.endTime;
        }
        if (action.payload.taskType !== undefined) {
          todo.taskType = action.payload.taskType;
        }
        if (action.payload.priority !== undefined) {
          todo.priority = action.payload.priority;
        }
        saveToLocalStorage("todos", state.todos);
      }
    },

    // Thay đổi filter
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, setFilter } =
  todoSlice.actions;

export default todoSlice.reducer;
