"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Users, Building2, X } from "lucide-react";

interface RoleSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RoleOption {
  id: "student" | "faculty" | "industry";
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
}

const roles: RoleOption[] = [
  {
    id: "student",
    title: "Student",
    description: "Assess your skills, get an AI gap report, and find matched internships and jobs.",
    icon: GraduationCap,
    path: "/login/student",
  },
  {
    id: "faculty",
    title: "Faculty",
    description: "Discover FDPs and industrial exposure programs matched to your department.",
    icon: Users,
    path: "/login/faculty",
  },
  {
    id: "industry",
    title: "Industry",
    description: "Hire from a pipeline of students with verified, up-to-date skills.",
    icon: Building2,
    path: "/login/industry",
  },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, damping: 25, stiffness: 300 },
  },
  exit: { opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.15 } },
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function RoleSelectModal({ isOpen, onClose }: RoleSelectModalProps) {
  const router = useRouter();

  const handleSelect = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Ambient violet glow behind the modal */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-[600px] h-[400px] bg-violet-600/20 blur-[100px] rounded-full" />
          </div>

          {/* Modal card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-select-title"
            className="relative z-10 w-full max-w-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* subtle grid texture, consistent with sign-in card */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)",
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative px-6 py-8 sm:px-10 sm:py-10">
                <div className="text-center mb-8">
                  <div className="mx-auto mb-4 w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-transparent">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 12c0-4.4 3.6-8 8-8M20 12c0 4.4-3.6 8-8 8"
                        stroke="#A78BFA"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="4" cy="12" r="2" fill="#fff" fillOpacity="0.7" />
                      <circle cx="20" cy="12" r="2" fill="#A78BFA" />
                    </svg>
                  </div>
                  <h2
                    id="role-select-title"
                    className="text-xl sm:text-2xl font-semibold text-white tracking-tight"
                  >
                    How will you use SkillBridge?
                  </h2>
                  <p className="mt-2 text-sm text-white/50">
                    Choose your role to get a personalized experience.
                  </p>
                </div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  variants={cardContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <motion.button
                        key={role.id}
                        type="button"
                        variants={cardVariants}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(role.path)}
                        className="group relative flex flex-col items-start text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-violet-400/40 p-5 transition-colors duration-200"
                      >
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-violet-500/10 to-transparent pointer-events-none" />

                        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-violet-500/15 border border-violet-400/20 mb-4 group-hover:bg-violet-500/25 transition-colors duration-200">
                          <Icon className="w-5 h-5 text-violet-300" />
                        </div>

                        <span className="relative text-[15px] font-medium text-white mb-1">
                          {role.title}
                        </span>
                        <span className="relative text-[12.5px] text-white/50 leading-relaxed">
                          {role.description}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RoleSelectModal;
