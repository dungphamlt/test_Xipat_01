export type TaskType =
  | "study"
  | "work"
  | "personal"
  | "shopping"
  | "sport"
  | "other";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  startTime?: number; // Thời gian bắt đầu (timestamp)
  endTime?: number; // Thời gian kết thúc (timestamp)
  taskType: TaskType; // Loại công việc
  priority?: "low" | "medium" | "high"; // Độ ưu tiên
}

export type FilterType = "all" | "completed" | "active";

export interface TodoState {
  todos: Todo[];
  filter: FilterType;
}
