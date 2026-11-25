import { useState } from "react";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import StudentProfile from "./pages/student/StudentProfile";
import CompanyProfile from "./pages/company/CompanyProfile";

function App() {
  const [activePage, setActivePage] = useState("Overview");

  const renderPage = () => {
    switch (activePage) {
      case "Company Profile":
        return <CompanyProfile />;

      case "Student Profile":
        return <StudentProfile />;

      default:
        return <StudentProfile />;
    }
  };

  return (
    <AppLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;
