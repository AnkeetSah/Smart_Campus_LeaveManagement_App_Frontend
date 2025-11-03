import {
  Route
} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import MyProfile from "../pages/profile/studentProfile/MyProfile";
import ApplicationMethodSelector from "../components/StudentLeaveForm/ApplicationMethodSelector";
import CreateLeaveApplication from "../components/CreateLeaveApplication";
import VoiceAgent from "../pages/VoiceAgent/VoiceAgent";
import LeaveStatusTracker from "../components/LeaveStatus/LeaveStatus";
import LeaveHistory from "../components/LeaveHistory";
import Notification from "../pages/notification/Notification";

export function StudentRoutes() {
  return (
    <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
      <Route path="/dashboard/student" element={<StudentDashboard />} />
      <Route path="/dashboard/student/profile" element={<MyProfile />} />
      <Route path="/dashboard/student/apply-leave" element={<ApplicationMethodSelector />} />
      <Route path="/dashboard/student/apply-leave/manual" element={<CreateLeaveApplication />} />
      <Route path="/dashboard/student/apply-leave/voice" element={<VoiceAgent />} />
      <Route path="/dashboard/student/leave-status" element={<LeaveStatusTracker />} />
      <Route path="/dashboard/student/leave-history" element={<LeaveHistory />} />
      <Route path="/dashboard/student/notification" element={<Notification />} />
    </Route>
  );
}
