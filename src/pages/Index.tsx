import { useState, useEffect } from "react";
import { quizzes } from "@/data/quizzes";
import QuizCard from "@/components/QuizCard";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Gift, Lock, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

// 🔄 SCHIMBĂ ACEST NUMĂR CÂND VREI UN NOU GIVEAWAY (ex: 2, 3, 4...)
const GIVEAWAY_VERSION = 1;

// 📅 DATA CÂND SE TERMINĂ GIVEAWAY-UL (schimbă când lansezi un giveaway nou)
const GIVEAWAY_END = new Date("2026-04-16T23:59:59");

const getCompletedQuizzes = (): string[] => {
  const data = JSON.parse(localStorage.getItem("completedQuizzes") || "{}");
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

const getTimeLeft = () => {
  const diff = GIVEAWAY_END.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, expired: true };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
};

const CountdownTimer = () => {
  const [time, setTime] = useState(getTimeLeft);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.expired) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="relative">
      <button
        onClick={() => { setShowTooltip(true); setTimeout(() => setShowTooltip(false), 2500); }}
        className="flex items-center gap-3 rounded-xl border border-border bg-card/80 backdrop-blur-sm px-5 py-3 font-mono-game text-sm transition-all hover:border-primary/30"
        style={{ boxShadow: "var(--card-shadow)" }}
      >
        <Clock className="h-4 w-4 text-primary" />
        <div className="flex gap-1 text-foreground">
          <span>{pad(time.d)}<span className="text-muted-foreground">d</span></span>
          <span className="text-muted-foreground">:</span>
          <span>{pad(time.h)}<span className="text-muted-foreground">h</span></span>
          <span className="text-muted-foreground">:</span>
          <span>{pad(time.m)}<span className="text-muted-foreground">m</span></span>
          <span className="text-muted-foreground">:</span>
          <span>{pad(time.s)}<span className="text-muted-foreground">s</span></span>
        </div>
      </button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-primary/30 bg-card/95 backdrop-blur-sm px-4 py-2 text-xs text-foreground"
            style={{ boxShadow: "var(--neon-glow)" }}
          >
            Timpul rămas până la giveaway ⏳
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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
            className="relative flex flex-col items-center gap-5"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleGiveaway}
                className={`
                  group relative inline-flex items-center gap-3 rounded-xl px-10 py-5 text-lg font-bold
                  bg-[hsl(var(--giveaway))] text-[hsl(var(--giveaway-foreground))]
                  transition-all duration-300
                  hover:shadow-[var(--giveaway-glow)] hover:scale-[1.03] hover:brightness-110 active:scale-[0.97]
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

              <CountdownTimer />
            </div>

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
