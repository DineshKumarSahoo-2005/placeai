import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children, activePage, onNavigate }) {
  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      <div className="main-area">
        <Header />
        <main className="page-container">{children}</main>
      </div>
    </div>
  );
}
