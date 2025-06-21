import { Radio } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setFilter } from "../features/todosSlice";

export default function TodoFilter() {
  const dispatch = useAppDispatch();
  const { filter, todos } = useAppSelector((state) => state.todos);

  // Đếm số công việc chưa hoàn thành
  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      {/* Hiển thị số công việc còn lại */}
      <div className="text-md text-orange-600">
        {activeCount > 0 && `${activeCount} công việc chưa hoàn thành`}
      </div>

      {/* Bộ lọc trạng thái */}
      <Radio.Group
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        buttonStyle="solid"
      >
        <Radio.Button value="all">Tất cả</Radio.Button>
        <Radio.Button value="active">Chưa hoàn thành</Radio.Button>
        <Radio.Button value="completed">Đã hoàn thành</Radio.Button>
      </Radio.Group>
    </div>
  );
}
