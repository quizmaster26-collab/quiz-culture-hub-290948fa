import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { quizzes } from "@/data/quizzes";
import ProgressBar from "@/components/ProgressBar";
import AnswerButton from "@/components/AnswerButton";
import { ArrowLeft } from "lucide-react";

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

  const getAnswerState = (index: number) => {
    if (!question) return "default" as const;
    if (phase === "question") {
      return index === selectedIndex ? "selected" : "default";
    }
    if (phase === "feedback") {
      if (index === question.correctIndex) return "correct";
      if (index === selectedIndex) return "incorrect";
      return "default";
    }
    return "default" as const;
  };

  const getResultMessage = () => {
    if (!quiz) return "";
    const pct = score / quiz.questions.length;
    if (pct === 1) return "Perfect! Cunoștințe impecabile! 🏆";
    if (pct >= 0.8) return "Excelent! Ești foarte bine pregătit!";
    if (pct >= 0.6) return "Bine! Mai ai puțin și devii expert.";
    if (pct >= 0.4) return "Nu-i rău, dar mai exersează!";
    return "Mai ai de lucru, dar nu renunța!";
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
        <div className="w-full max-w-2xl text-center">
          <span className="text-6xl mb-6 block">{quiz.icon}</span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {quiz.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto text-balance">
            {quiz.description}
          </p>
          <p className="mt-2 text-sm font-mono text-muted-foreground tabular-nums">
            {quiz.questionCount} întrebări
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              onClick={() => setPhase("question")}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground text-lg font-medium transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Începe Quiz
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Înapoi la quiz-uri
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RESULT
  if (phase === "result") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl text-center"
        >
          <div className="text-7xl mb-6">
            {score / quiz.questions.length >= 0.8 ? "🎉" : score / quiz.questions.length >= 0.5 ? "👏" : "💪"}
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {score} din {quiz.questions.length} corecte
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{getResultMessage()}</p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              onClick={() => {
                setPhase("intro");
                setCurrentIndex(0);
                setSelectedIndex(null);
                setScore(0);
              }}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground text-lg font-medium transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Încearcă din nou
            </button>
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
            className="p-2 -ml-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance mb-10">
                {question.text}
              </h2>

              <div className="flex flex-col gap-3">
                {question.options.map((option, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <AnswerButton
                      text={option}
                      state={getAnswerState(i)}
                      disabled={phase === "feedback"}
                      onClick={() => handleSelect(i)}
                    />
                  </motion.div>
                ))}
              </div>

              {selectedIndex !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 flex justify-end"
                >
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {phase === "feedback"
                      ? isLast
                        ? "Vezi Rezultatul"
                        : "Următoarea Întrebare"
                      : "Confirmă Răspunsul"}
                  </button>
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
