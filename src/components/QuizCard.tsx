import { useNavigate } from "react-router-dom";
import type { Quiz } from "@/data/quizzes";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/quiz/${quiz.id}`)}
      className="w-full text-left bg-card rounded-xl p-6 transition-shadow duration-200 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      style={{
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
      }}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{quiz.icon}</span>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-card-foreground tracking-tight">
            {quiz.title}
          </h2>
          <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
            {quiz.description}
          </p>
          <p className="mt-3 text-xs font-mono text-muted-foreground tabular-nums">
            {quiz.questionCount} întrebări
          </p>
        </div>
      </div>
    </button>
  );
};

export default QuizCard;
