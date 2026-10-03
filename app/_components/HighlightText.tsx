/** 문장 안의 지정 문구만 굵게 강조 (선박 유형 설명 등) */
export default function HighlightText({ text, phrases = [] }: { text: string; phrases?: string[] }) {
  if (phrases.length === 0) return <>{text}</>;
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return (
    <>
      {parts.map((part, i) =>
        phrases.includes(part) ? (
          <strong key={i} className="font-semibold text-gray-900">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
