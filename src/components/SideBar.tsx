import { CalendarOutlined, SettingOutlined } from "@ant-design/icons";

interface SideBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SideBar({ activeTab, onTabChange }: SideBarProps) {
  const menu = [
    {
      icon: <CalendarOutlined className="w-5 h-5" />,
      title: "Công việc hôm nay",
      tab: "daily",
    },
    {
      icon: <SettingOutlined className="w-5 h-5" />,
      title: "Cài đặt",
      tab: "settings",
    },
  ];

  return (
    <div className="bg-[#031f39] px-3 py-4 h-screen w-64 shadow-md">
      {/* Phần tiêu đề ứng dụng */}
      <div className="mb-10 px-2">
        <h1 className="text-orange-500 font-bold text-2xl">Todo App</h1>
        <p className="text-white text-sm">Quản lý công việc</p>
      </div>

      {/* Các mục menu */}
      <div className="flex-1">
        {menu.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 my-2 p-2 rounded-md cursor-pointer hover:bg-gray-200 hover:text-orange-500 ${
              activeTab === item.tab
                ? "bg-gray-200 text-orange-500"
                : "text-white"
            }`}
            onClick={() => onTabChange(item.tab)}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      {/* Phần footer (nếu cần) */}
      <div className="pt-4 border-t border-gray-100">
        <div className="text-gray-500 text-sm px-2">test_Xipat_01</div>
      </div>
    </div>
  );
}
