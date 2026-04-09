import { useState, useEffect } from "react";
import { quizzes } from "@/data/quizzes";
import QuizCard from "@/components/QuizCard";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Gift, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

// 🔄 SCHIMBĂ ACEST NUMĂR CÂND VREI UN NOU GIVEAWAY (ex: 2, 3, 4...)
const GIVEAWAY_VERSION = 1;

const getCompletedQuizzes = (): string[] => {
  const data = JSON.parse(localStorage.getItem("completedQuizzes") || "{}");
  // Migration: old format was an array
  if (Array.isArray(data)) {
    localStorage.removeItem("completedQuizzes");
    return [];
  }
  if (data.version !== GIVEAWAY_VERSION) {
    localStorage.setItem("completedQuizzes", JSON.stringify({ version: GIVEAWAY_VERSION, ids: [] }));
    return [];
  }
  return data.ids || [];
};

export const saveCompletedQuiz = (quizId: string) => {
  const ids = getCompletedQuizzes();
  if (!ids.includes(quizId)) {
    ids.push(quizId);
    localStorage.setItem("completedQuizzes", JSON.stringify({ version: GIVEAWAY_VERSION, ids }));
  }
};

const Index = () => {
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const completed = getCompletedQuizzes();
    setHasCompleted(completed.length > 0);
  }, []);

  const handleGiveaway = () => {
    if (hasCompleted) {
      window.open("https://contentfile.online/cl/i/4orqp1", "_blank");
    } else {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
     <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

        <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-28 md:pt-28 md:pb-36 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <Gamepad2 className="w-8 h-8 text-primary animate-pulse-glow" />
            <span className="text-sm font-mono-game text-primary tracking-widest uppercase">
              Gaming Quiz
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground text-glow"
            style={{ letterSpacing: "-0.03em" }}
          >
            Testează-ți cunoștințele
            <br />
            <span className="text-primary">de gaming</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-muted-foreground max-w-lg"
          >
            Alege un quiz, răspunde la întrebări și descoperă dacă ești un adevărat gamer.
          </motion.p>
        </div>
      </section>

      {/* Quiz Grid */}
     <section className="px-6 -mt-2 pb-20">
        <div className="w-full max-w-3xl mx-auto">
          <div className="grid gap-4 sm:grid-cols-2">
            {quizzes.map((quiz, i) => (
              <QuizCard key={quiz.id} quiz={quiz} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Giveaway Section */}
      <section className="px-6 pb-16">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative flex flex-col items-center gap-4"
          >
            <button
              onClick={handleGiveaway}
              className={`
                group relative inline-flex items-center gap-3 rounded-xl px-10 py-5 text-lg font-bold
                bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]
                text-primary-foreground
                transition-all duration-300
                hover:shadow-[var(--neon-glow-strong)] hover:scale-[1.03] active:scale-[0.97]
                animate-[shimmer_3s_linear_infinite]
                ${!hasCompleted ? "opacity-50 cursor-not-allowed saturate-50" : ""}
              `}
            >
              {hasCompleted ? (
                <Gift className="h-6 w-6" />
              ) : (
                <Lock className="h-6 w-6" />
              )}
              🎁 Participă la Giveaway
            </button>

            {!hasCompleted && (
              <p className="text-xs text-muted-foreground font-mono-game">
                Completează un quiz pentru a debloca
              </p>
            )}

            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute -bottom-20 rounded-xl border border-primary/30 bg-card/90 backdrop-blur-sm px-6 py-4 text-sm text-foreground"
                  style={{ boxShadow: "var(--neon-glow)" }}
                >
                  Pentru a participa la giveaway va trebui să completezi cel puțin un quiz ✨
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center">
        <p className="text-xs text-muted-foreground font-mono-game">
          Made with ❤️ for gamers. QuizGaming - All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
