const NotificationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "all", label: "All", count: 10 },
    { id: "shared", label: "Shared Post", count: 1 },
    { id: "group", label: "Group", count: 2 },
    { id: "system", label: "System", count: 3 },
    { id: "more", label: "More", count: 4 },
  ];
  /*  <input type="radio" name="my_tabs_1" className="tab" aria-label="Tab 1" />
  <input type="radio" name="my_tabs_1" className="tab" aria-label="Tab 2" defaultChecked />
  <input type="radio" name="my_tabs_1" className="tab" aria-label="Tab 3" />*/
  return (
    <div className="flex justify-center">
      <div className="tabs tabs-box">
        {tabs.map((tab) => (
          <input
            type="radio"
            name="notification_tabs"
            className="tab"
            onClick={() => setActiveTab(tab.id)}
            aria-label={tab.label}
            defaultChecked={activeTab === tab.id}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationTabs;
