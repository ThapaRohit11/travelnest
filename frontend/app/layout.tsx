import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TravelNest",
  description: "TravelNest booking and discovery platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const extensionHydrationGuard = `
    (() => {
      const injectedAttributes = ["bis_skin_checked", "fdprocessedid"];
      const clean = (root) => {
        if (root.nodeType !== Node.ELEMENT_NODE) return;
        for (const attribute of injectedAttributes) root.removeAttribute(attribute);
        for (const element of root.querySelectorAll("[bis_skin_checked],[fdprocessedid]")) {
          for (const attribute of injectedAttributes) element.removeAttribute(attribute);
        }
      };
      clean(document.documentElement);
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "attributes") {
            mutation.target.removeAttribute(mutation.attributeName);
          }
          for (const node of mutation.addedNodes) clean(node);
        }
      });
      observer.observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: injectedAttributes,
      });
      window.addEventListener("load", () => {
        clean(document.documentElement);
        window.setTimeout(() => observer.disconnect(), 3000);
      });
    })();
  `;

  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: extensionHydrationGuard }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-white text-slate-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
