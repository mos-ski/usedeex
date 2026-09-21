import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton } from "@/components/dashboard/AppShell";
import { RadioRow } from "@/components/dashboard/FormFields";
import { CheckCircleIcon, HeartsIcon } from "@/components/dashboard/icons";
import { surveyQuestions } from "@/data/surveyQuestions";
import { cn } from "@/lib/utils";

type Stage = "intro" | "questions" | "complete";
type Answers = Record<string, string>;

const Survey = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const question = surveyQuestions[index];
  const answer = answers[question?.id] ?? "";

  const updateAnswer = (value: string) => setAnswers((current) => ({ ...current, [question.id]: value }));

  const goBack = () => {
    if (stage === "intro") return navigate(-1);
    if (stage === "complete") {
      setIndex(surveyQuestions.length - 1);
      return setStage("questions");
    }
    if (index === 0) return setStage("intro");
    setIndex((current) => current - 1);
  };

  const next = () => {
    if (!answer.trim()) return;
    if (index === surveyQuestions.length - 1) return setStage("complete");
    setIndex((current) => current + 1);
  };

  if (stage === "intro") {
    return (
      <AppShell className="bg-brand-surface" innerClassName="flex min-h-[100dvh] flex-col pb-0 lg:max-w-[480px] lg:px-4">
        <PageTransition className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center px-4 pb-[calc(3.5rem+env(safe-area-inset-bottom))] pt-[max(7rem,env(safe-area-inset-top))] text-center">
            <span className="relative flex size-[116px] items-center justify-center rounded-full bg-brand-primary50">
              <span className="flex size-[92px] items-center justify-center rounded-full bg-brand-primary100">
                <span className="flex size-[68px] items-center justify-center rounded-full bg-brand-blue500 text-white">
                  <HeartsIcon className="size-7" />
                </span>
              </span>
            </span>
            <h1 className="mt-6 max-w-[330px] font-gasoek text-[26px] uppercase leading-[1.08] text-brand-grey900">Help us make DeeX better</h1>
            <p className="mt-3 max-w-[310px] text-base leading-[1.6] text-brand-grey500">This short survey helps us understand how you use DeeX, what slows you down, and what we should improve next.</p>
            <PrimaryButton className="mt-auto" onClick={() => setStage("questions")}>Begin survey</PrimaryButton>
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  if (stage === "complete") {
    return (
      <AppShell className="bg-brand-surface" innerClassName="flex min-h-[100dvh] flex-col pb-0 lg:max-w-[480px] lg:px-4">
        <PageTransition className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center px-4 pb-[calc(3.5rem+env(safe-area-inset-bottom))] pt-[max(7rem,env(safe-area-inset-top))] text-center">
            <span className="relative flex size-[116px] items-center justify-center rounded-full bg-brand-tint">
              <span className="flex size-[92px] items-center justify-center rounded-full bg-brand-primary100">
                <span className="flex size-[68px] items-center justify-center rounded-full bg-brand-successText text-white">
                  <CheckCircleIcon className="size-8" />
                </span>
              </span>
            </span>
            <h1 className="mt-6 font-gasoek text-[28px] uppercase leading-[1.08] text-brand-grey900">Survey complete</h1>
            <p className="mt-3 max-w-[310px] text-base leading-[1.6] text-brand-grey500">Thank you for sharing your experience. Your feedback will help us improve DeeX and prioritize the features that matter most.</p>
            <button type="button" onClick={goBack} className="mt-8 rounded-lg border border-brand-blue500 px-4 py-2 font-manrope text-[11px] font-semibold leading-[1.6] text-brand-blue500">Review answers</button>
            <PrimaryButton className="mt-auto" onClick={() => navigate("/dashboard")}>Back to DeeX</PrimaryButton>
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  return (
    <AppShell
      className="bg-brand-surface"
      innerClassName="flex min-h-[100dvh] flex-col pb-6 lg:max-w-[480px] lg:px-4"
    >
      <PageTransition className="flex flex-1 flex-col">
        <PageHeader title="Survey" onBack={goBack} />

        <div className="flex flex-1 flex-col px-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold leading-[1.4] text-brand-grey900">
              {index + 1}/{surveyQuestions.length}
            </span>
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-brand-grey100">
              <span
                className="block h-full rounded-full bg-brand-blue500 transition-[width]"
                style={{ width: `${((index + 1) / surveyQuestions.length) * 100}%` }}
              />
            </span>
          </div>

          <h2 className="pt-6 text-[19px] font-bold leading-[1.35] text-brand-grey900">{question.prompt}</h2>

          {question.type === "single" && (
            <div className="flex flex-col pt-4">
              {question.options?.map((option) => (
                <RadioRow
                  key={option}
                  label={option}
                  selected={answer === option}
                  onSelect={() => updateAnswer(option)}
                />
              ))}
            </div>
          )}

          {question.type === "text" && (
            <div className="pt-4">
              <textarea
                value={answer}
                onChange={(event) => updateAnswer(event.target.value)}
                placeholder={question.placeholder}
                autoFocus
                maxLength={600}
                className="min-h-[190px] w-full resize-none border-b border-brand-grey100 bg-transparent py-2 text-[15px] leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300 focus:border-brand-blue500"
              />
              <p className="pt-1 text-right text-xs leading-[1.3] text-brand-bodyText">{answer.length}/600</p>
            </div>
          )}

          {question.type === "nps" && (
            <div className="pt-4">
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 11 }, (_, score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => updateAnswer(String(score))}
                    className={cn(
                      "aspect-square rounded text-[15px] font-semibold leading-[1.4] transition-colors",
                      answer === String(score)
                        ? "bg-brand-blue500 text-white"
                        : "bg-[#daebf7] text-brand-blue500 hover:bg-brand-primary100",
                    )}
                  >
                    {score}
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-2 text-xs leading-[1.3] text-brand-bodyText">
                <span>Not likely</span>
                <span>Extremely likely</span>
              </div>
            </div>
          )}

          <div className="mt-auto pt-8">
            <PrimaryButton disabled={!answer.trim()} onClick={next}>
              {index === surveyQuestions.length - 1 ? "Submit survey" : "Next"}
            </PrimaryButton>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  );
};

export default Survey;
