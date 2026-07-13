import { Desktop } from "@/components/os/Desktop";
import { CvDocument } from "@/components/CvDocument";

export default function Home() {
  return (
    <main>
      {/* Screen readers and crawlers get the full CV as plain document
          structure; sighted visitors get the same content through the
          desktop windows. Non-interactive so hidden content adds no tab
          stops. */}
      <section className="sr-only">
        <CvDocument interactive={false} />
      </section>

      <Desktop />
    </main>
  );
}
