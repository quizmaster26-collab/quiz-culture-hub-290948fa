import { useState, useCallback, useEffect, type ReactNode } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { quizzes } from "@/data/quizzes";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Trophy, Target, Zap } from "lucide-react";
import lolBg from "@/assets/lol.jpg";
import cs2Bg from "@/assets/cs2.jpg";
import minecraftBg from "@/assets/minecraft.jpg";
import fortniteBg from "@/assets/fortnite.jpg";
import gtaBg from "@/assets/gta.jpg";
import gamingBg from "@/assets/gaming.jpg";

type Phase = "intro" | "question" | "feedback" | "result";

const quizBackgrounds: Record<string, string> = {
  "league-of-legends": lolBg,
  cs2: cs2Bg,
  minecraft: minecraftBg,
  fortnite: fortniteBg,
  gta: gtaBg,
  "gaming-general": gamingBg,
};

const QuizBackground = ({ image, children }: { image: string; children: ReactNode }) => (
  <div className="relative min-h-screen overflow-hidden">
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-background/35 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background/80" />
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q.id === id);

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  // Save quiz completion when reaching result phase
  useEffect(() => {
    if (phase === "result" && quiz) {
      const { saveCompletedQuiz } = await import("@/pages/Index");
      saveCompletedQuiz(quiz.id);
    }
  }, [phase, quiz]);

  const question = quiz?.questions[currentIndex];
  const isLast = quiz ? currentIndex === quiz.questions.length - 1 : false;
  const quizBackground = quiz ? quizBackgrounds[quiz.id] ?? gamingBg : gamingBg;

  const handleSelect = (index: number) => {
    if (phase !== "question") return;
    setSelectedIndex(index);
  };

  const handleNext = useCallback(() => {
    if (selectedIndex === null || !question) return;

    if (phase === "question") {
      if (selectedIndex === question.correctIndex) {
        setScore((s) => s + 1);
      }
      setPhase("feedback");
      return;
    }

    if (phase === "feedback") {
      if (isLast) {
        setPhase("result");
      } else {
        setCurrentIndex((i) => i + 1);
        setSelectedIndex(null);
        setPhase("question");
      }
    }
  }, [phase, selectedIndex, question, isLast]);

  const getAnswerVariant = (index: number) => {
    if (!question) return "answer" as const;
    if (phase === "question") {
      return index === selectedIndex ? "answerSelected" : "answer";
    }
    if (phase === "feedback") {
      if (index === question.correctIndex) return "answerCorrect";
      if (index === selectedIndex) return "answerIncorrect";
      return "answer";
    }
    return "answer" as const;
  };

  const getResultMessage = () => {
    if (!quiz) return { icon: <Target />, text: "" };
    const pct = score / quiz.questions.length;

    if (pct === 1) {
      return { icon: <Trophy className="h-16 w-16 text-primary" />, text: "GG WP! Scor perfect! 🏆" };
    }
    if (pct >= 0.8) {
      return { icon: <Trophy className="h-16 w-16 text-primary" />, text: "Excelent! Ești un adevărat pro!" };
    }
    if (pct >= 0.6) {
      return { icon: <Zap className="h-16 w-16 text-primary" />, text: "Bine jucat! Mai antrenează-te puțin." };
    }
    if (pct >= 0.4) {
      return { icon: <Target className="h-16 w-16 text-muted-foreground" />, text: "Nu-i rău! Mai ai de grind." };
    }

    return {
      icon: <Target className="h-16 w-16 text-muted-foreground" />,
      text: "GG, mai încearcă! Practice makes perfect.",
    };
  };

  if (!quiz || !question) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Quiz-ul nu a fost găsit.</p>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <QuizBackground image={quizBackground}>
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg text-center"
          >
            <span className="mb-6 block text-7xl animate-float">{quiz.icon}</span>
            <h1
              className="text-3xl font-bold tracking-tight text-foreground text-glow md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              {quiz.title}
            </h1>
            <p className="mt-4 text-balance text-lg text-muted-foreground">{quiz.description}</p>
            <div className="mt-3 flex items-center justify-center gap-4 text-sm font-mono-game text-muted-foreground">
              <span>{quiz.questionCount} întrebări</span>
              <span>•</span>
              <span>{quiz.difficulty}</span>
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Button variant="neon" size="xl" onClick={() => setPhase("question")}>
                Începe Quiz
              </Button>
              <button
                onClick={() => navigate("/")}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Înapoi la quiz-uri
              </button>
            </div>
          </motion.div>
        </div>
      </QuizBackground>
    );
  }

  if (phase === "result") {
    const result = getResultMessage();

    return (
      <QuizBackground image={quizBackground}>
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 flex justify-center"
            >
              {result.icon}
            </motion.div>

            <div className="mb-8 rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-sm" style={{ boxShadow: "var(--card-shadow)" }}>
              <p className="text-6xl font-bold text-primary text-glow font-mono-game">
                {score}/{quiz.questions.length}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">răspunsuri corecte</p>
            </div>

            <p className="text-xl font-medium text-foreground">{result.text}</p>

            <div className="mt-10 flex flex-col items-center gap-3">
              <Button
                variant="neon"
                size="lg"
                onClick={() => {
                  setPhase("intro");
                  setCurrentIndex(0);
                  setSelectedIndex(null);
                  setScore(0);
                }}
              >
                <RotateCcw className="mr-1 h-4 w-4" />
                Încearcă din nou
              </Button>
              <button
                onClick={() => navigate("/")}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Încearcă un alt quiz
              </button>
            </div>
          </motion.div>
        </div>
      </QuizBackground>
    );
  }

  return (
    <QuizBackground image={quizBackground}>
      <div className="flex min-h-screen flex-col px-6 py-8">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-8 flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="-ml-2 rounded-lg p-2 text-muted-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <ProgressBar current={currentIndex + 1} total={quiz.questions.length} />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl rounded-3xl border border-border/60 bg-card/65 p-6 backdrop-blur-sm md:p-8" style={{ boxShadow: "var(--card-shadow)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h2
                  className="mb-10 text-2xl font-semibold tracking-tight text-foreground text-balance md:text-3xl"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {question.text}
                </h2>

                <div className="flex flex-col gap-3">
                  {question.options.map((option, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <Button
                        variant={getAnswerVariant(i)}
                        className="w-full"
                        disabled={phase === "feedback"}
                        onClick={() => handleSelect(i)}
                      >
                        <span className="mr-3 font-mono-game text-sm text-muted-foreground opacity-60">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {option}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {selectedIndex !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex justify-end"
                  >
                    <Button variant="neon" size="lg" onClick={handleNext}>
                      {phase === "feedback" ? (isLast ? "Vezi Rezultatul" : "Următoarea →") : "Confirmă"}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </QuizBackground>
  );
};

export default QuizPage;
