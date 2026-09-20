import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PrimaryButton } from "@/components/dashboard/AppShell";
import { ArrowLeftIcon, CheckCircleIcon, HeartsIcon } from "@/components/dashboard/icons";
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
      <AppShell className="bg-brand-grey50" innerClassName="flex min-h-[100dvh] flex-col pb-0 lg:max-w-[480px] lg:px-4">
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
      <AppShell className="bg-brand-grey50" innerClassName="flex min-h-[100dvh] flex-col pb-0 lg:max-w-[480px] lg:px-4">
        <PageTransition className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center px-4 pb-[calc(3.5rem+env(safe-area-inset-bottom))] pt-[max(7rem,env(safe-area-inset-top))] text-center">
            <span className="relative flex size-[116px] items-center justify-center rounded-full bg-[#E2F5EF]">
              <span className="flex size-[92px] items-center justify-center rounded-full bg-[#CDEEE2]">
                <span className="flex size-[68px] items-center justify-center rounded-full bg-[#30B887] text-white">
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
    <div className="min-h-[100dvh] bg-brand-deepNavy font-roboto text-brand-grey50 antialiased">
      <PageTransition>
        <div className="mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col px-4 pb-[calc(3.5rem+env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)]">
          <header className="flex h-14 items-center">
            <button type="button" onClick={goBack} aria-label="Previous question" className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-white/5"><ArrowLeftIcon className="size-6" /></button>
            <h1 className="min-w-0 flex-1 pr-11 text-center text-[19px] font-bold leading-[1.4]">Survey</h1>
          </header>

          <div className="mt-2 flex items-center gap-3 px-4">
            <span className="text-sm font-medium text-white">{index + 1}/{surveyQuestions.length}</span>
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-brand-blue500 transition-[width]" style={{ width: `${((index + 1) / surveyQuestions.length) * 100}%` }} /></span>
          </div>

          <main className="flex-1 px-[18px] pt-8">
            <h2 className="max-w-[330px] text-[21px] font-bold leading-[1.35] text-brand-grey50">{question.prompt}</h2>

            {question.type === "single" && (
              <div className="mt-8 flex flex-col gap-2.5">
                {question.options?.map((option) => {
                  const selected = answer === option;
                  return (
                    <button key={option} type="button" onClick={() => updateAnswer(option)} className={cn("flex min-h-[58px] w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-colors", selected ? "border-brand-blue500 bg-brand-blue500/10" : "border-transparent hover:bg-white/[0.04]")}>
                      <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full border", selected ? "border-brand-blue500" : "border-brand-grey500")}><span className={cn("size-3 rounded-full", selected && "bg-brand-blue500")} /></span>
                      <span className="text-base font-semibold leading-[1.5] text-brand-grey50">{option}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {question.type === "text" && (
              <div className="mt-8">
                <textarea value={answer} onChange={(event) => updateAnswer(event.target.value)} placeholder={question.placeholder} autoFocus maxLength={600} className="min-h-[190px] w-full resize-none rounded-lg border border-brand-grey600 bg-white/[0.03] p-4 text-base leading-[1.6] text-white outline-none placeholder:text-brand-grey600 focus:border-brand-blue500" />
                <p className="mt-2 text-right text-xs text-brand-grey600">{answer.length}/600</p>
              </div>
            )}

            {question.type === "nps" && (
              <div className="mt-8">
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 11 }, (_, score) => <button key={score} type="button" onClick={() => updateAnswer(String(score))} className={cn("aspect-square rounded-lg border text-base font-semibold transition-colors", answer === String(score) ? "border-brand-blue500 bg-brand-blue500 text-white" : "border-brand-grey600 text-brand-grey50 hover:border-brand-blue500")}>{score}</button>)}
                </div>
                <div className="mt-3 flex justify-between text-xs text-brand-grey500"><span>Not likely</span><span>Extremely likely</span></div>
              </div>
            )}
          </main>

          <PrimaryButton disabled={!answer.trim()} onClick={next}>{index === surveyQuestions.length - 1 ? "Submit survey" : "Next"}</PrimaryButton>
        </div>
      </PageTransition>
    </div>
  );
};

export default Survey;
