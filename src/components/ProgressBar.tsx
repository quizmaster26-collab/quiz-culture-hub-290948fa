interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-mono-game text-muted-foreground tabular-nums">
          {current} / {total}
        </span>
        <span className="text-sm font-mono-game text-primary tabular-nums">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-primary"
          style={{
            width: `${percentage}%`,
            transition: "width 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
            boxShadow: "0 0 8px hsl(185 100% 50% / 0.4)",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
