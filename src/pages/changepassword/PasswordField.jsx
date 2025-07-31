import { Eye, EyeOff, Lock, X } from "lucide-react";

export default function PasswordField({
  label,
  value,
  onChange,
  error,
  showPassword,
  setShowPassword,
  placeholder = "Enter your password",
}) {
  const inputId = label.toLowerCase().replace(/\s+/g, "-") + "-password";

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" strokeWidth={2} />
        </div>
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all duration-200 ${
            error
              ? "border-red-300 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 bg-red-50 dark:bg-red-900/20"
              : "border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Eye className="h-5 w-5" strokeWidth={2} />
          )}
        </button>
      </div>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm flex items-center gap-1.5">
          <X className="w-4 h-4" strokeWidth={2.5} />
          {error}
        </p>
      )}
    </div>
  );
}
