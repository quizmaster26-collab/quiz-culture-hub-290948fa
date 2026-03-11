interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-mono text-muted-foreground tabular-nums">
          Întrebare {current} din {total}
        </span>
        <span className="text-sm font-mono text-muted-foreground tabular-nums">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary"
          style={{
            width: `${percentage}%`,
            transition: "width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
