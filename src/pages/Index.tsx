import { quizzes } from "@/data/quizzes";
import QuizCard from "@/components/QuizCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-16 md:py-24">
      <div className="w-full max-w-2xl">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Testează-ți cunoștințele
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Alege un quiz și descoperă cât de mult știi.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
