import { Bell, Search, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="topbar">
      <button
        className="mobile-menu-button"
        type="button"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="topbar-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search students, companies, drives..."
          aria-label="Search PlaceAI"
        />

        <kbd>⌘ K</kbd>
      </div>

      <div className="topbar-actions">
        <button
          className="notification-button"
          type="button"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <div className="topbar-divider" />

        <div className="topbar-user">
          <div className="profile-avatar topbar-avatar">A</div>

          <div className="topbar-user-info">
            <strong>Administrator</strong>
            <span>Placement cell</span>
          </div>
        </div>
      </div>
    </header>
  );
}
