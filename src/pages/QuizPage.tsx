import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { quizzes } from "@/data/quizzes";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Trophy, Target, Zap } from "lucide-react";

type Phase = "intro" | "question" | "feedback" | "result";

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q.id === id);

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const question = quiz?.questions[currentIndex];
  const isLast = quiz ? currentIndex === quiz.questions.length - 1 : false;

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
    if (pct === 1) return { icon: <Trophy className="w-16 h-16 text-primary" />, text: "GG WP! Scor perfect! 🏆" };
    if (pct >= 0.8) return { icon: <Trophy className="w-16 h-16 text-primary" />, text: "Excelent! Ești un adevărat pro!" };
    if (pct >= 0.6) return { icon: <Zap className="w-16 h-16 text-primary" />, text: "Bine jucat! Mai antrenează-te puțin." };
    if (pct >= 0.4) return { icon: <Target className="w-16 h-16 text-muted-foreground" />, text: "Nu-i rău! Mai ai de grind." };
    return { icon: <Target className="w-16 h-16 text-muted-foreground" />, text: "GG, mai încearcă! Practice makes perfect." };
  };

  if (!quiz || !question) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Quiz-ul nu a fost găsit.</p>
      </div>
    );
  }

  // INTRO
  if (phase === "intro") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg text-center"
        >
          <span className="text-7xl mb-6 block animate-float">{quiz.icon}</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-glow" style={{ letterSpacing: "-0.03em" }}>
            {quiz.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            {quiz.description}
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-sm font-mono-game text-muted-foreground">
            <span>{quiz.questionCount} întrebări</span>
            <span>•</span>
            <span>{quiz.difficulty}</span>
          </div>
          <div className="mt-10 flex flex-col items-center gap-3">
            <Button
              variant="neon"
              size="xl"
              onClick={() => setPhase("question")}
            >
              Începe Quiz
            </Button>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Înapoi la quiz-uri
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // RESULT
  if (phase === "result") {
    const result = getResultMessage();
  const openLocker = () => {
  window.open("https://playabledownload.com/1500430", "_blank");
};
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
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

          <div className="bg-card border border-border rounded-2xl p-8 mb-8" style={{ boxShadow: "var(--card-shadow)" }}>
            <p className="text-6xl font-bold text-primary text-glow font-mono-game">
              {score}/{quiz.questions.length}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">răspunsuri corecte</p>
          </div>

          <p className="text-xl text-foreground font-medium">{result.text}</p>
          <div className="mt-6">
   <Button
    variant="neon"
    size="lg"
    onClick={openLocker}
  >
    🎁 Claim Gift Card Giveaway
  </Button>
             <p className="text-sm text-muted-foreground mt-2">
    Complete one quick step to enter the giveaway.
  </p>
</div>
          
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
              <RotateCcw className="w-4 h-4 mr-1" />
              Încearcă din nou
            </Button>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Încearcă un alt quiz
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // QUESTION / FEEDBACK
  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 rounded-lg text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <ProgressBar current={currentIndex + 1} total={quiz.questions.length} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance mb-10" style={{ letterSpacing: "-0.02em" }}>
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
                      <span className="font-mono-game text-sm text-muted-foreground mr-3 opacity-60">
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
                  <Button
                    variant="neon"
                    size="lg"
                    onClick={handleNext}
                  >
                    {phase === "feedback"
                      ? isLast
                        ? "Vezi Rezultatul"
                        : "Următoarea →"
                      : "Confirmă"}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
