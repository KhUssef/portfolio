import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { CvDocument } from "@/components/CvDocument";

export const metadata: Metadata = {
  title: `CV - ${profile.name}, ${profile.role}`,
  description: profile.tagline,
};

// The CV as a plain scrollable document: the same data as the desktop
// windows, for readers who want to skim or print instead of exploring.
export default function CvPage() {
  return (
    <main className="min-h-dvh px-3 py-6 sm:px-6 sm:py-10 print:bg-white print:p-0">
      <div className="bevel-out mx-auto max-w-3xl p-1 print:max-w-none print:bg-white print:p-0 print:shadow-none">
        <header className="titlebar-active flex h-8 items-center justify-between px-2 print:hidden">
          <span className="truncate text-[13px] font-bold text-white">
            cv.doc - {profile.name}
          </span>
          <span className="flex shrink-0 gap-3">
            <a
              href="/resume/cv.pdf"
              className="text-[13px] text-white underline underline-offset-2"
            >
              Download PDF
            </a>
            <Link
              href="/"
              className="text-[13px] text-white underline underline-offset-2"
            >
              Back to desktop
            </Link>
          </span>
        </header>
        <div className="bevel-field mt-1 p-5 text-[13px] leading-relaxed sm:p-10 print:mt-0 print:p-0 print:shadow-none">
          <CvDocument />
        </div>
      </div>
    </main>
  );
}
