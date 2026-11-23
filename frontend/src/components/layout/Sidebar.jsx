import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  FileText,
  ChartColumnIncreasing,
  Settings,
  GraduationCap,
} from "lucide-react";

const navigation = [
  {
    label: "WORKSPACE",
    items: [
      { name: "Overview", icon: LayoutDashboard },
      { name: "Students", icon: Users },
      { name: "Companies", icon: Building2 },
      { name: "Job Drives", icon: BriefcaseBusiness },
      { name: "Applications", icon: FileText },
    ],
  },
  {
    label: "INSIGHTS",
    items: [{ name: "Analytics", icon: ChartColumnIncreasing }],
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">
          <GraduationCap size={23} />
        </div>

        <div className="brand-info">
          <h1>PlaceAI</h1>
          <span>Placement portal</span>
        </div>
      </div>

      <div className="sidebar-navigation">
        {navigation.map((section) => (
          <div className="nav-section" key={section.label}>
            <p className="nav-section-label">{section.label}</p>

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.name === "Overview";

              return (
                <button
                  key={item.name}
                  className={`nav-item ${isActive ? "active" : ""}`}
                  type="button"
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button className="nav-item" type="button">
          <Settings size={18} strokeWidth={1.8} />
          <span>Settings</span>
        </button>

        <div className="sidebar-profile">
          <div className="profile-avatar">A</div>

          <div className="profile-info">
            <strong>Administrator</strong>
            <span>Placement cell</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
