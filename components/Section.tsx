type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-20">
      <div className="mb-10 flex items-center gap-5">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
          {title}
        </h2>
        <div aria-hidden="true" className="h-px flex-1 bg-[var(--color-border)]" />
      </div>
      {children}
    </section>
  );
}
