import { cn } from "@/lib/utils";

type AnswerState = "default" | "selected" | "correct" | "incorrect" | "revealed";

interface AnswerButtonProps {
  text: string;
  state: AnswerState;
  disabled: boolean;
  onClick: () => void;
}

const AnswerButton = ({ text, state, disabled, onClick }: AnswerButtonProps) => {
  const stateClasses: Record<AnswerState, string> = {
    default: "bg-secondary text-secondary-foreground hover:bg-muted",
    selected: "bg-primary text-primary-foreground",
    correct: "bg-success text-success-foreground",
    incorrect: "bg-destructive text-destructive-foreground",
    revealed: "bg-success text-success-foreground",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full h-auto min-h-[52px] px-6 py-4 rounded-lg text-lg text-left transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
        "disabled:cursor-not-allowed",
        stateClasses[state]
      )}
      style={{
        boxShadow: state === "default" ? "var(--shadow-button)" : "none",
      }}
    >
      {text}
    </button>
  );
};

export default AnswerButton;
