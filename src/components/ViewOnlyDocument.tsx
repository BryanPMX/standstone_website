"use client";

interface ViewOnlyDocumentProps {
  html: string;
  title: string;
}

/**
 * Renders document HTML with view-only measures: no right-click (context menu)
 * and no text selection, so content is view-only in the browser.
 */
export function ViewOnlyDocument({ html, title }: ViewOnlyDocumentProps) {
  return (
    <section className="relative mx-auto max-w-5xl px-4 pb-14 pt-24 md:pb-16 md:pt-28">
      <div
        className="pointer-events-none absolute -left-10 top-20 h-48 w-48 rounded-full bg-sandstone-bronze/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-10 h-56 w-56 rounded-full bg-sandstone-navy/15 blur-[100px]"
        aria-hidden
      />
      <div
        className="section-frame relative overflow-hidden rounded-3xl border-white/55 bg-gradient-to-br from-white/70 via-sandstone-base/50 to-sandstone-bronze/28 p-5 sm:p-7 md:p-9"
        onContextMenu={(event) => event.preventDefault()}
        onCopy={(event) => event.preventDefault()}
        onCut={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
        style={{ WebkitUserSelect: "none", userSelect: "none" }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-sandstone-base/12 to-sandstone-navy/10"
          aria-hidden
        />
        <div className="relative">
          <span className="badge-sandstone-accent">View-only legal document</span>
          <p className="mt-3 text-sm text-sandstone-text/80">
            {title} is available for on-screen review only.
          </p>
          <article
            aria-label={`${title} content`}
            className="mt-6 border-t border-sandstone-brown/15 pt-6 text-[15px] leading-7 text-sandstone-text/95 [&_a]:font-medium [&_a]:text-sandstone-navy [&_a]:underline [&_a]:decoration-sandstone-bronze/60 [&_h1]:mt-8 [&_h1]:font-heading [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-sandstone-gold [&_h2]:mt-7 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-sandstone-gold [&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-sandstone-gold [&_li]:mb-2 [&_ol]:mb-4 [&_ol]:pl-6 [&_p]:mb-4 [&_p:first-child]:font-heading [&_p:first-child]:text-2xl [&_p:first-child]:font-bold [&_p:first-child]:leading-tight [&_p:first-child]:text-sandstone-gold [&_strong]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </section>
  );
}
