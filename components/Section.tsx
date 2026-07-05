type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-3xl px-6 py-16">
      <h2 className="mb-8 text-sm font-mono uppercase tracking-widest text-[var(--color-muted)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
