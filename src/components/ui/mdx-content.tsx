"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-extrabold mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-8 mb-4 border-t border-border pt-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
          ),
          p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent hover:underline"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-muted bg-bg-subtle p-4 rounded-r-lg">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            return isBlock ? (
              <code className="text-sm font-mono text-gray-200">{children}</code>
            ) : (
              <code className="bg-bg-subtle px-1.5 py-0.5 rounded text-sm font-mono text-accent-dark font-semibold">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-[#1a1a1a] text-gray-200 p-4 rounded-lg overflow-x-auto my-6 border border-white/10 shadow-inner">
              {children}
            </pre>
          ),
          hr: () => <hr className="hidden" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-8">
              <table className="min-w-full divide-y divide-border border border-border rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-bg-subtle">{children}</thead>,
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border bg-white">{children}</tbody>
          ),
          tr: ({ children }) => <tr className="hover:bg-bg-subtle/50 transition-colors">{children}</tr>,
          th: ({ children }) => (
            <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
              {children}
            </td>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-primary">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-muted">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
