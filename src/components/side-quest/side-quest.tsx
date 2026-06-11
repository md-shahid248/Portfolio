import { lazy, Suspense, useEffect, useState } from "react";
import { Gamepad2, Shuffle, X } from "lucide-react";

const TicTacToe = lazy(() => import("./tic-tac-toe"));
const Sudoku = lazy(() => import("./sudoku"));
const Minesweeper = lazy(() => import("./minesweeper"));

type GameId = "tic-tac-toe" | "sudoku" | "minesweeper";

const GAMES: { id: GameId; label: string }[] = [
  { id: "tic-tac-toe", label: "Tic-Tac-Toe" },
  { id: "sudoku", label: "Sudoku (Very Easy)" },
  { id: "minesweeper", label: "Minesweeper (Very Easy)" },
];

function pickRandom(exclude?: GameId): GameId {
  const pool = GAMES.filter((g) => g.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)].id;
}

const COUNTER_KEY = "sideQuestCompleted";

export function SideQuest() {
  const [active, setActive] = useState<GameId | null>(null);
  const [count, setCount] = useState(0);
  const [justWon, setJustWon] = useState(false);

  useEffect(() => {
    try {
      const v = parseInt(localStorage.getItem(COUNTER_KEY) || "0", 10);
      if (!isNaN(v)) setCount(v);
    } catch {}
  }, []);

  const handleWin = () => {
    if (justWon) return;
    setJustWon(true);
    setCount((c) => {
      const next = c + 1;
      try { localStorage.setItem(COUNTER_KEY, String(next)); } catch {}
      return next;
    });
  };

  const start = () => {
    setJustWon(false);
    setActive(pickRandom());
  };

  const another = () => {
    setJustWon(false);
    setActive((cur) => pickRandom(cur ?? undefined));
  };

  const close = () => { setActive(null); setJustWon(false); };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const currentLabel = GAMES.find((g) => g.id === active)?.label ?? "";

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <p className="max-w-xl text-base text-muted-foreground md:text-lg">
          You've explored my work—now take on a quick challenge. Click below and get a random mini-game.
        </p>
        <button
          onClick={start}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]"
        >
          <Gamepad2 className="h-5 w-5" /> Click Me
        </button>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Visitors have completed <span className="text-foreground tabular-nums">{count}</span> Side Quest{count === 1 ? "" : "s"}
        </p>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={currentLabel}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl border border-border bg-card p-6 shadow-2xl animate-scale-in overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Side Quest</p>
                <h3 className="mt-1 text-lg font-semibold">{currentLabel}</h3>
              </div>
              <button
                onClick={close}
                aria-label="Close game"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0">
              <Suspense fallback={<p className="py-12 text-center text-sm text-muted-foreground">Loading game…</p>}>
                {active === "tic-tac-toe" && <TicTacToe onWin={handleWin} />}
                {active === "sudoku" && <Sudoku onWin={handleWin} />}
                {active === "minesweeper" && <Minesweeper onWin={handleWin} />}
              </Suspense>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-4 shrink-0">
              <button
                onClick={another}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:scale-[1.02] transition-transform"
              >
                <Shuffle className="h-4 w-4" /> Play Another Game
              </button>
              <button
                onClick={close}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-accent"
              >
                Close Game
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideQuest;
