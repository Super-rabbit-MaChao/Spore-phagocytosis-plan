import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export type ShellAction = {
  label: string
  to?: string
  onClick?: () => void
  primary?: boolean
}

type AppShellProps = {
  sceneName: string
  children: ReactNode
  actions?: ShellAction[]
}

export function AppShell({ sceneName, children, actions = [] }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand">孢子进化</div>
        <div className="scene-name" aria-current="page">
          {sceneName}
        </div>
      </header>

      <main className="main-viewport">{children}</main>

      <footer className="bottom-bar">
        {actions.length === 0 ? (
          <span className="bottom-hint">占位壳 · 无玩法逻辑</span>
        ) : (
          actions.slice(0, 3).map((action) => {
            const className = action.primary ? 'btn btn-primary' : 'btn'
            if (action.to) {
              return (
                <Link key={action.label} className={className} to={action.to}>
                  {action.label}
                </Link>
              )
            }
            return (
              <button
                key={action.label}
                type="button"
                className={className}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            )
          })
        )}
      </footer>
    </div>
  )
}
