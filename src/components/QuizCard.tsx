import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Quiz } from "@/data/quizzes";
import { Badge } from "@/components/ui/badge";

interface QuizCardProps {
  quiz: Quiz;
  index: number;
}

const difficultyColors = {
  Easy: "bg-success/15 text-success border-success/30",
  Medium: "bg-primary/15 text-primary border-primary/30",
  Hard: "bg-destructive/15 text-destructive border-destructive/30",
};

const QuizCard = ({ quiz, index }: QuizCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => navigate(`/quiz/${quiz.id}`)}
      className="group w-full text-left bg-card rounded-xl p-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background border border-border hover:border-primary/30"
      style={{ boxShadow: "var(--card-shadow)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--card-shadow)";
      }}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl group-hover:animate-float transition-transform">{quiz.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-lg font-semibold text-card-foreground tracking-tight group-hover:text-primary transition-colors">
              {quiz.title}
            </h2>
            <Badge variant="outline" className={difficultyColors[quiz.difficulty]}>
              {quiz.difficulty}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {quiz.description}
          </p>
          <p className="mt-3 text-xs font-mono-game text-muted-foreground tabular-nums">
            {quiz.questionCount} întrebări
          </p>
        </div>
        <div className="text-muted-foreground group-hover:text-primary transition-colors text-xl">
          →
        </div>
      </div>
    </motion.button>
  );
};

export default QuizCard;
