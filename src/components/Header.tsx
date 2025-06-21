import { Input, Button, Space } from "antd";
import { SearchOutlined, UserOutlined, BellOutlined } from "@ant-design/icons";

interface HeaderProps {
  onSearch: (value: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm py-3 px-6 flex justify-between">
      {/* Thanh tìm kiếm */}
      <div className="flex-1 max-w-xl mr-4">
        <Input
          placeholder="Tìm kiếm công việc..."
          prefix={<SearchOutlined className="text-gray-400" />}
          allowClear
          onChange={(e) => onSearch(e.target.value)}
          className="rounded-full"
        />
      </div>

      {/* Các action */}
      <Space>
        <Button type="text" icon={<BellOutlined />} shape="circle" />
        <Button type="text" icon={<UserOutlined />} shape="circle" />
      </Space>
    </header>
  );
}
