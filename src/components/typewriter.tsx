import { useEffect, useState } from "react";

export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      const next = deleting ? current.slice(0, sub.length - 1) : current.slice(0, sub.length + 1);
      setSub(next);
      if (!deleting && next === current) {
        setTimeout(() => setDeleting(true), 1400);
      } else if (deleting && next === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [sub, deleting, index, words]);

  return (
    <span className={className}>
      {sub}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[1px] animate-pulse bg-current align-middle" />
    </span>
  );
}
