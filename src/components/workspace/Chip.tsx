import { cn } from "@/lib/utils"

export function Chip({ label, tone }: { label: string; tone: "primary" | "secondary" | "accent" }) {
  const cls =
    tone === "secondary"
      ? "border-secondary/20 bg-secondary/10 text-secondary"
      : tone === "accent"
      ? "border-accent/20 bg-accent/10 text-accent"
      : "border-primary/20 bg-primary/10 text-primary"

  return <span className={cn("rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider", cls)}>{label}</span>
}
