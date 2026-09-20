import { ArrowDownLeftIcon, CheckIcon, GiftIcon, TrendArrowIcon } from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";

interface InviteCodeProgressProps {
  code: string;
  depositReward: number;
  tradeReward: number;
  minDeposit: number;
  minTrade: number;
  depositCompleted: boolean;
  tradeCompleted: boolean;
}

/** One condition on the invite code, with its reward or completed state. */
const Condition = ({
  title,
  detail,
  trailing,
  done,
  Icon,
}: {
  title: string;
  detail: string;
  trailing: string;
  done: boolean;
  Icon: (props: { className?: string }) => JSX.Element;
}) => (
  <div className="flex items-center gap-3">
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full",
        done ? "bg-brand-successText text-white" : "border-[1.5px] border-brand-grey300 text-brand-grey400",
      )}
    >
      {done ? <CheckIcon className="size-3.5" /> : <Icon className="size-3" />}
    </span>
    <span className="min-w-0 flex-1">
      <span className="flex items-center justify-between gap-3">
        <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{title}</span>
        <span
          className={cn(
            "shrink-0 text-[15px] font-semibold leading-[1.4]",
            done ? "text-brand-successText" : "text-brand-blue500",
          )}
        >
          {trailing}
        </span>
      </span>
      <span className="block text-xs leading-[1.3] text-brand-bodyText">{detail}</span>
    </span>
  </div>
);

const InviteCodeProgress = ({
  code,
  depositReward,
  tradeReward,
  minDeposit,
  minTrade,
  depositCompleted,
  tradeCompleted,
}: InviteCodeProgressProps) => {
  const totalReward = depositReward + tradeReward;
  const earnedReward = (depositCompleted ? depositReward : 0) + (tradeCompleted ? tradeReward : 0);
  const met = (depositCompleted ? 1 : 0) + (tradeCompleted ? 1 : 0);
  const progress = (met / 2) * 100;

  return (
    <div className="rounded-lg border border-brand-grey100 bg-brand-surface p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-primary100 text-brand-blue500">
            <GiftIcon className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs leading-[1.3] text-brand-bodyText">Invite Code</span>
            <span className="block truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{code}</span>
          </span>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs leading-[1.3] text-brand-bodyText">Earned</p>
          <p className="text-[15px] font-semibold leading-[1.4] text-brand-blue500">
            {earnedReward}/{totalReward} pts
          </p>
        </div>
      </div>

      <div className="pt-4">
        <span className="block h-1 overflow-hidden rounded-sm bg-brand-grey100">
          <span
            className="block h-full rounded-sm bg-brand-blue500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </span>
        <div className="flex justify-between pt-1">
          <span className="text-xs leading-[1.3] text-brand-bodyText">{Math.round(progress)}% complete</span>
          <span className="text-xs leading-[1.3] text-brand-bodyText">{2 - met} conditions remaining</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <Condition title="Registration" detail="Completed" trailing="Done" done Icon={CheckIcon} />
        <Condition
          title="Deposit"
          detail={depositCompleted ? "Bonus credited" : `Deposit min $${minDeposit}`}
          trailing={depositCompleted ? "Completed" : `+${depositReward} pts`}
          done={depositCompleted}
          Icon={ArrowDownLeftIcon}
        />
        <Condition
          title="Trade"
          detail={tradeCompleted ? "Bonus credited" : `Trade min $${minTrade}`}
          trailing={tradeCompleted ? "Completed" : `+${tradeReward} pts`}
          done={tradeCompleted}
          Icon={TrendArrowIcon}
        />
      </div>
    </div>
  );
};

export default InviteCodeProgress;
