import { API_BASE_PATH } from '@ai-pr-reviewer/shared';
import { Bot, GitPullRequest, LayoutDashboard, Webhook } from 'lucide-react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
const healthEndpoint = `${apiBaseUrl}${API_BASE_PATH}/health`;

const plannedCapabilities = [
  {
    title: 'GitHub App integration',
    description: 'Install the app on a repository and receive pull request events.',
    icon: Webhook,
  },
  {
    title: 'Pull request analysis',
    description: 'Turn a diff into structured findings an AI model can reason about.',
    icon: GitPullRequest,
  },
  {
    title: 'Automated review comments',
    description: 'Publish inline review comments back to the pull request.',
    icon: Bot,
  },
  {
    title: 'Review dashboard',
    description: 'Track repositories, reviews and findings over time.',
    icon: LayoutDashboard,
  },
] as const;

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-4">
        <span className="text-muted-foreground w-fit rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase">
          Project scaffold
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">AI GitHub PR Reviewer</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          An AI-powered platform that reviews GitHub pull requests automatically. The monorepo is
          initialised and the web and API applications boot &mdash; product features are built in
          the phases that follow.
        </p>
      </header>

      <section aria-labelledby="planned-capabilities" className="flex flex-col gap-5">
        <h2 id="planned-capabilities" className="text-sm font-medium tracking-wide uppercase">
          Planned capabilities
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {plannedCapabilities.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="bg-card text-card-foreground flex flex-col gap-3 rounded-lg border p-5"
            >
              <Icon aria-hidden className="text-muted-foreground size-5" />
              <h3 className="font-medium">{title}</h3>
              <p className="text-muted-foreground text-sm">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="api-status" className="flex flex-col gap-3">
        <h2 id="api-status" className="text-sm font-medium tracking-wide uppercase">
          API
        </h2>
        <div className="bg-muted/40 flex flex-col gap-2 rounded-lg border p-5">
          <p className="text-muted-foreground text-sm">
            The NestJS API is served under{' '}
            <code className="text-foreground font-mono">{API_BASE_PATH}</code>. Start it with{' '}
            <code className="text-foreground font-mono">pnpm dev</code> and check:
          </p>
          <code className="text-foreground font-mono text-sm break-all">{healthEndpoint}</code>
        </div>
      </section>
    </main>
  );
}
