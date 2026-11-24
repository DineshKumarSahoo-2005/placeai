import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import StudentProfile from "./pages/student/StudentProfile";

function App() {
  return (
    <AppLayout>
      <StudentProfile />
    </AppLayout>
  );
}

export default App;