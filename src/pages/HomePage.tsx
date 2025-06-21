import { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import TodoTable from "../components/TodoTable";
import TodoFilter from "../components/TodoFilter";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("daily");
  //   const [searchText, setSearchText] = useState('');

  //   const handleSearch = (value: string) => {
  //     setSearchText(value);
  //   };

  return (
    <div className="h-screen overflow-hidden flex justify-between">
      <SideBar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 bg-gray-100">
        <Header onSearch={() => {}} />
        <div className="p-6 overflow-y-auto h-screen">
          <div className="">
            <div className="bg-white p-6 rounded-lg shadow">
              <h1 className="text-2xl font-bold mb-6">
                {activeTab === "daily" ? "Công Việc Hôm Nay" : "Cài Đặt"}
              </h1>

              {activeTab === "daily" && (
                <>
                  <TodoFilter />
                  <TodoTable />
                </>
              )}

              {activeTab === "settings" && <div>Settings</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
