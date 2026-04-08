import { useState, useEffect } from "react";
import { quizzes } from "@/data/quizzes";
import QuizCard from "@/components/QuizCard";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Gift, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const completed: string[] = JSON.parse(localStorage.getItem("completedQuizzes") || "[]");
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

      {/* Footer */}
      <footer className="mt-auto py-8 text-center">
        <p className="text-xs text-muted-foreground font-mono-game">
          Made with ❤️ for gamers
        </p>
      </footer>
    </div>
  );
};

export default Index;
