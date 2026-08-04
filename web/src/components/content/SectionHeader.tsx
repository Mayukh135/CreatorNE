import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">{eyebrow}</p>
      <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-7 text-text-muted md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
