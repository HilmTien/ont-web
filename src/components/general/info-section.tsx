interface InfoSectionProps {
  heading: string;
  children: React.ReactNode;
}

export function InfoSection({ heading, children }: InfoSectionProps) {
  return (
    <section>
      <h2 className="text-4xl font-semibold">{heading}</h2>
      <hr className="border-t-accent my-2" />
      {children}
    </section>
  );
}
