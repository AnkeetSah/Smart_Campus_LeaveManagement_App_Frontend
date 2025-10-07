import { useReducer, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, Key } from "lucide-react";
import PasswordField from "./PasswordField";
import SecurityTips from "./SecurityTips";
import StrengthGuide from "./StrengthGuide";
import api from "../../services/api";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const initialState = {
  oldPassword: "",
  newPassword: "",
  showOldPassword: false,
  showNewPassword: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_PASSWORD_VISIBILITY":
      return { ...state, [action.field]: !state[action.field] };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

function ChangePassword() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [validationErrors, setValidationErrors] = useState({});

  const getPasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    const strength = Object.values(checks).filter(Boolean).length;
    return { strength, checks };
  };

  const { strength, checks } = getPasswordStrength(state.newPassword);

  const mutation = useMutation({
    mutationFn: ({ oldPassword, newPassword }) =>
      api.post("/api/change/password", { oldPassword, newPassword }),
    onSuccess: () => {
      // Reset form
      dispatch({ type: "RESET" });

      // Update store immediately
      setUser({ ...user, firstLogin: false });

      // Navigate based on role
      if (user.role === "student") navigate("/dashboard/student");
      else if (user.role === "guard") navigate("/dashboard/guard");
      else navigate("/authority/dashboard");
    },
  });

  const handlePasswordChange = () => {
    const errors = {};
    if (!state.oldPassword) errors.oldPassword = "Current password is required";
    if (!state.newPassword) errors.newPassword = "New password is required";
    if (state.newPassword.length < 8)
      errors.newPassword = "Password must be at least 8 characters";
    if (state.oldPassword === state.newPassword)
      errors.newPassword = "New password must be different from current";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    mutation.mutate({
      oldPassword: state.oldPassword,
      newPassword: state.newPassword,
    });
  };

  const getStrengthColor = () => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-emerald-500";
  };

  const getStrengthText = () => {
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength <= 4) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen flex pb-20 items-center justify-center p-4
    bg-gradient-to-br 
from-blue-200 via-sky-200 to-indigo-300 
dark:from-gray-950 dark:via-gray-900 dark:to-indigo-900 
     ">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 w-full max-w-lg animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Change Password
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Keep your account secure with a strong password
          </p>
        </div>

        {(mutation.error || validationErrors.general) && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4 mb-6 flex items-start gap-3 animate-shake">
            <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5" />
            <p className="text-red-700 dark:text-red-300 text-sm">
              {validationErrors.general ||
                mutation.error?.response?.data?.message ||
                "Something went wrong."}
            </p>
          </div>
        )}

        <div className="space-y-6">
          <PasswordField
            label="Current Password"
            value={state.oldPassword}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "oldPassword", value: e.target.value })
            }
            error={validationErrors.oldPassword}
            showPassword={state.showOldPassword}
            setShowPassword={() =>
              dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY", field: "showOldPassword" })
            }
            placeholder="Enter your current password"
          />

          <PasswordField
            label="New Password"
            value={state.newPassword}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "newPassword", value: e.target.value })
            }
            error={validationErrors.newPassword}
            showPassword={state.showNewPassword}
            setShowPassword={() =>
              dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY", field: "showNewPassword" })
            }
            placeholder="Create a new password"
          />

          {state.newPassword && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <span>Password Strength</span>
                <span
                  className={
                    strength <= 2
                      ? "text-red-600"
                      : strength <= 3
                      ? "text-yellow-600"
                      : strength <= 4
                      ? "text-blue-600"
                      : "text-emerald-600"
                  }
                >
                  {getStrengthText()}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getStrengthColor()} transition-all duration-300`}
                  style={{ width: `${(strength / 5) * 100}%` }}
                />
              </div>
              <StrengthGuide checks={checks} />
            </div>
          )}

          <button
            onClick={handlePasswordChange}
            disabled={mutation.isPending || strength < 3}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all ${
              mutation.isLoading || strength < 3
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            }`}
          >
            {mutation.isPending ? "Updating..." : "Update Password"}
          </button>
        </div>

        <SecurityTips className="mt-8" />
      </div>
    </div>
  );
}

export default ChangePassword;
