import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function UnionFlag() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg viewBox="0 0 60 30" className="h-[11px] w-[22px]" aria-hidden="true" focusable="false">
      <clipPath id={`${uid}-t`}>
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth={6} />
      <path d="M0 0l60 30m0-30L0 30" clipPath={`url(#${uid}-t)`} stroke="#C8102E" strokeWidth={4} />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth={10} />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth={6} />
    </svg>
  );
}

type PlateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> & {
  value: string;
  onChange: (value: string) => void;
  size?: "lg" | "md";
  label?: string;
  invalid?: boolean;
};

/** Yellow UK rear-plate styled registration input. */
export function PlateInput({
  value,
  onChange,
  size = "lg",
  label = "Vehicle registration",
  invalid,
  className,
  id,
  ...rest
}: PlateInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-stretch overflow-hidden rounded-xl bg-plate text-black shadow-[inset_0_0_0_2px_rgba(0,0,0,0.9),0_14px_34px_-20px_rgba(140,110,0,0.7)] transition focus-within:ring-4 focus-within:ring-ink/25",
        size === "lg" ? "h-16" : "h-14",
        invalid && "ring-4 ring-signal/40",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="m-[2px] mr-0 flex w-10 shrink-0 flex-col items-center justify-center gap-1 rounded-l-[0.6rem] bg-plate-blue text-white"
      >
        <UnionFlag />
        <span className="text-[11px] font-bold leading-none tracking-wide">UK</span>
      </span>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        placeholder="ENTER REG"
        maxLength={9}
        size={1}
        autoComplete="off"
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        aria-invalid={invalid || undefined}
        className={cn(
          "w-full min-w-0 flex-1 bg-transparent px-3 text-center font-bold uppercase tracking-[0.08em] text-black [font-stretch:80%] placeholder:text-black/50 focus:outline-none",
          size === "lg" ? "text-[1.7rem] sm:text-[1.85rem]" : "text-[1.5rem]",
        )}
        {...rest}
      />
    </div>
  );
}
