import { useNavigate } from "react-router-dom";

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  productsCount,
  usersCount,
  ordersCount,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const tabs = [
    {
      id: "products",
      label: "Hockey Gear",
      icon: "🏑",
      count: productsCount,
    },
    {
      id: "users",
      label: "Players",
      icon: "👥",
      count: usersCount,
    },
    {
      id: "orders",
      label: "Orders",
      icon: "📋",
      count: ordersCount,
    },
  ];

  return (
    <div className="w-64 bg-white min-h-screen p-4 border-r fixed flex flex-col justify-between">
      <div>
        <div className="mb-6 pb-3 border-b">
          <h2 className="text-xl font-bold text-black">
            🏑 Hockey Admin Panel
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Hockey Store Control Dashboard
          </p>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-md transition flex items-center justify-between border ${
                activeTab === tab.id
                  ? "bg-black text-white border-black"
                  : "bg-gray-100 text-black hover:bg-gray-200 border-gray-200"
              }`}
            >
              <span>
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "bg-gray-300 text-black"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="border-t pt-4 mt-4">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-md text-red-500 hover:bg-red-100 transition flex items-center gap-2 border border-red-200"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;