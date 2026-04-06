import Image from 'next/image';

interface LogoProps {
  logoId: string;
  className?: string;
}

const logos: Record<string, { light: string; dark: string }> = {
  'gpt-5-4': { light: '/logos/openai.svg', dark: '/logos/openai_dark.svg' },
  'gpt-5-4-mini': { light: '/logos/openai.svg', dark: '/logos/openai_dark.svg' },
  'opus-4-6': { light: '/logos/claude-ai-icon.svg', dark: '/logos/claude-ai-icon.svg' },
  'sonnet-4-6': { light: '/logos/claude-ai-icon.svg', dark: '/logos/claude-ai-icon.svg' },
  'haiku-4-5': { light: '/logos/claude-ai-icon.svg', dark: '/logos/claude-ai-icon.svg' },
  'gemini-3-1-pro': { light: '/logos/gemini.svg', dark: '/logos/gemini.svg' },
  'composer-2': { light: '/logos/cursor_light.svg', dark: '/logos/cursor_dark.svg' },
  codex: { light: '/logos/codex_light.svg', dark: '/logos/codex_dark.svg' },
  'codex-200': { light: '/logos/codex_light.svg', dark: '/logos/codex_dark.svg' },
  't3-code': { light: '/logos/t3-dark.svg', dark: '/logos/t3-light.svg' },
  'claude-code': { light: '/logos/claude-ai-icon.svg', dark: '/logos/claude-ai-icon.svg' },
  'claude-pro': { light: '/logos/claude-ai-icon.svg', dark: '/logos/claude-ai-icon.svg' },
  cursor: { light: '/logos/cursor_light.svg', dark: '/logos/cursor_dark.svg' },
  'cursor-ultra': { light: '/logos/cursor_light.svg', dark: '/logos/cursor_dark.svg' },
  opencode: { light: '/logos/opencode.svg', dark: '/logos/opencode-dark.svg' },
  'opencode-black': { light: '/logos/opencode.svg', dark: '/logos/opencode-dark.svg' },
  pi: { light: '/logos/pi_light.svg', dark: '/logos/pi_dark.svg' },
  'gemini-sub-antigravity': { light: '/logos/gemini.svg', dark: '/logos/gemini.svg' },
  'minimax-2-5': { light: '/logos/minimax-color.svg', dark: '/logos/minimax-color.svg' },
  'qwen-3-6-plus': { light: '/logos/qwen_light.svg', dark: '/logos/qwen_dark.svg' },
  'github-copilot': { light: '/logos/github_copilot_light.svg', dark: '/logos/github_copilot_dark.svg' },
  'zed': { light: '/logos/zed_light.svg', dark: '/logos/zed_dark.svg' }
};

export function Logo({ logoId, className = '' }: LogoProps) {
  const entry = logos[logoId];
  const hasDarkVariant = entry ? entry.light !== entry.dark : false;

  if (!entry) {
    return (
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 p-2 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 p-2 ${className}`}
      aria-hidden="true"
    >
      <img
        src={hasDarkVariant ? entry.dark : entry.light}
        alt=""
        className="h-full w-full object-contain"
      />
    </div>
  );
}
