import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../store/useAuthStore";

/**
 * PublicRoute
 * - Shows children for public routes
 * - Shows GeometricLoadingScreen while auth is loading
 * - Redirects authenticated users by role
 *
 * This version includes a crisp SVG grid in the background (high-contrast,
 * scalable, and performant) so all objects remain clearly visible.
 */

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <GeometricLoadingScreen />;
  }

  if (!user) return <>{children}</>;

  switch (user.role) {
    case "student":
      return <Navigate to="/dashboard/student" replace />;
    case "faculty":
    case "hod":
    case "warden":
      return <Navigate to="/authority/dashboard" replace />;
    case "guard":
      return <Navigate to="/dashboard/guard" replace />;
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

PublicRoute.propTypes = {
  children: PropTypes.node,
};

/* ---------- SVG Helpers (crisp shapes + grid) ---------- */

const SvgGrid = ({ stroke = "rgba(255,255,255,0.06)", majorStroke = "rgba(255,255,255,0.09)", cell = 40 }) => {
  // cell: pixel size of each grid cell. Use viewBox in percent to scale.
  // We produce a pattern-based rect so it remains crisp and performant.
  const patternId = React.useMemo(() => `grid-${Math.random().toString(36).slice(2, 9)}`, []);
  const majorEvery = 5; // every 5th line is major (thicker)
  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width={cell} height={cell}>
          <path d={`M ${cell} 0 L 0 0 0 ${cell}`} fill="none" stroke={stroke} strokeWidth="1" />
        </pattern>
        <pattern id={`${patternId}-major`} patternUnits="userSpaceOnUse" width={cell * majorEvery} height={cell * majorEvery}>
          <path d={`M ${cell * majorEvery} 0 L 0 0 0 ${cell * majorEvery}`} fill="none" stroke={majorStroke} strokeWidth="1.5" />
        </pattern>
        <linearGradient id="gridFade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
        </linearGradient>
      </defs>

      {/* Fill with the small grid and layer major grid on top for structure */}
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      <rect width="100%" height="100%" fill={`url(#${patternId}-major)`} />
      {/* subtle gradient to keep grid readable but not overpowering */}
      <rect width="100%" height="100%" fill="url(#gridFade)" style={{ mixBlendMode: "overlay", opacity: 0.08 }} />
    </svg>
  );
};

const SvgTriangle = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
    <defs>
      <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <polygon
      points="50,5 5,95 95,95"
      fill="none"
      stroke="rgba(56,189,248,0.95)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#glow-cyan)"
    />
  </svg>
);

const SvgHexagon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
    <defs>
      <filter id="glow-pink" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <polygon
      points="50,5 80,20 80,60 50,95 20,80 20,40"
      fill="none"
      stroke="rgba(236,72,153,0.95)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#glow-pink)"
    />
  </svg>
);

const SvgDiamond = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
    <defs>
      <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <polygon
      points="50,5 95,50 50,95 5,50"
      fill="none"
      stroke="rgba(245,158,11,0.95)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#glow-yellow)"
    />
  </svg>
);

/* ---------- Loading Screen with visible grid ---------- */

const GeometricLoadingScreen = () => {
  const gridCount = 12 * 12;
  const gridItems = React.useMemo(() => Array.from({ length: gridCount }), []);
  const rainCount = React.useMemo(() => Array.from({ length: 20 }), []);
  const statusLabels = ["System", "Auth", "Route", "UI"];

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden"
      role="status"
      aria-live="polite"
    >
      {/* SVG grid background (keeps crisp lines at any scale) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <SvgGrid cell={36} />
      </div>

      {/* Slight overlay to improve contrast */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" aria-hidden />

      {/* Floating SVG shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute top-1/5 left-1/8 w-20 h-20 md:w-28 md:h-28"
          initial={{ opacity: 0.95 }}
          animate={{ rotate: [0, 180, 360], y: [0, -22, 0], opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <SvgTriangle className="w-full h-full" />
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-1/6 w-24 h-24 md:w-32 md:h-32"
          initial={{ opacity: 0.95 }}
          animate={{ rotate: [0, -160, -360], scale: [1, 1.14, 1], opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <SvgHexagon className="w-full h-full" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-1/3 w-16 h-16 md:w-20 md:h-20"
          initial={{ opacity: 0.95 }}
          animate={{ rotate: [30, 150, 30], x: [0, 14, 0], opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <SvgDiamond className="w-full h-full" />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center">
        <motion.div className="relative w-28 h-28 mb-8 perspective-[900px]" aria-hidden>
          <motion.div
            className="absolute inset-0 rounded-lg border border-emerald-300/60"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateX: [0, 180, 360], rotateY: [0, 180, 360] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-400/20 to-cyan-400/20"
            animate={{ rotateX: [0, -180, -360], rotateY: [0, -180, -360] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        <motion.div
          className="relative w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 shadow-2xl flex items-center justify-center"
          animate={{
            scale: [1, 1.18, 1],
            boxShadow: [
              "0 0 18px rgba(168,85,247,0.45)",
              "0 0 48px rgba(56,189,248,0.65)",
              "0 0 18px rgba(168,85,247,0.45)",
            ],
          }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <motion.div
            className="absolute inset-3 rounded-full bg-white/18 border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Binary rain (kept subtle) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none" aria-hidden>
          {rainCount.map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 1.8;
            const duration = 3.2 + Math.random() * 2.0;
            return (
              <motion.div
                key={`rain-${i}`}
                className="absolute text-green-400 font-mono text-xs md:text-sm"
                style={{
                  left: `${left}%`,
                  top: -8 - Math.random() * 30,
                  transform: `rotate(${Math.random() * 30 - 15}deg)`,
                  textShadow: "0 0 6px rgba(16,185,129,0.25)",
                }}
                animate={{ y: ["0vh", "100vh"], opacity: [0, 1, 0] }}
                transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
              </motion.div>
            );
          })}
        </div>

        <motion.div className="text-center mb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.45 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent mb-2">
            LeaveFlow
          </h2>
          <motion.p className="text-lg text-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.35 }}>
            Initializing Secure Session
          </motion.p>
        </motion.div>

        <div className="relative w-72 max-w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-4" aria-hidden>
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" animate={{ x: ["-120%", "120%"] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
          <div className="absolute inset-0 flex justify-between px-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`tick-${i}`} className="w-0.5 h-full bg-cyan-400/35" />
            ))}
          </div>
        </div>

        <div className="flex gap-6 items-center">
          {statusLabels.map((label, i) => (
            <motion.div key={label} className="flex items-center gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 + i * 0.12, duration: 0.36 }}>
              <motion.div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.3)]" animate={{ scale: [1, 1.45, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.18 }} aria-hidden />
              <span className="text-sm text-gray-300">{label}</span>
            </motion.div>
          ))}
        </div>

        <div className="absolute -bottom-8 w-36 h-8 pointer-events-none" aria-hidden>
          <motion.div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-60" aria-hidden />
      <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-60" aria-hidden />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-60" aria-hidden />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-60" aria-hidden />
    </div>
  );
};

export default PublicRoute;