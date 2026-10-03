"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Github, LogOut } from "lucide-react";

type AuthButtonsProps = {
  scrolled: boolean;
};

export default function AuthButtons({ scrolled }: AuthButtonsProps) {
  const { data: session, status } = useSession();
  const baseClass = "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors";
  const themeClass = scrolled
    ? "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
    : "border border-white/30 bg-white/10 text-white hover:bg-white/20";

  if (status === "loading") {
    return <span aria-hidden="true" className="inline-block h-10 w-24" />;
  }

  if (session?.user) {
    return (
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className={`${baseClass} ${themeClass}`}
        aria-label="GitHub 로그아웃"
        title={session.user.name ? `${session.user.name} 로그아웃` : "로그아웃"}
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        <span className="max-w-28 truncate">{session.user.name ?? "로그아웃"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl: window.location.href })}
      className={`${baseClass} ${themeClass}`}
    >
      <Github className="h-4 w-4" aria-hidden="true" />
      GitHub 로그인
    </button>
  );
}
