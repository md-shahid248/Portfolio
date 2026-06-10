import { useMemo, useState } from "react";

// 4x4 Sudoku (values 1-4), 2x2 boxes. Very easy difficulty.
type Grid = (number | null)[][];

const SOLUTIONS: number[][][] = [
  [[1,2,3,4],[3,4,1,2],[2,1,4,3],[4,3,2,1]],
  [[1,3,2,4],[2,4,1,3],[3,1,4,2],[4,2,3,1]],
  [[2,1,4,3],[3,4,1,2],[1,2,3,4],[4,3,2,1]],
  [[4,3,2,1],[2,1,4,3],[1,2,3,4],[3,4,1,2]],
];

function makePuzzle(): { puzzle: Grid; solution: number[][] } {
  const sol = SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)];
  const puzzle: Grid = sol.map((r) => r.slice());
  // Remove ~6 cells (very easy)
  const cells = Array.from({ length: 16 }, (_, i) => i).sort(() => Math.random() - 0.5).slice(0, 6);
  for (const c of cells) {
    const r = Math.floor(c / 4), col = c % 4;
    puzzle[r][col] = null;
  }
  return { puzzle, solution: sol };
}

export function Sudoku({ onWin }: { onWin?: () => void }) {
  const [{ puzzle, solution }, setData] = useState(() => makePuzzle());
  const initial = useMemo(() => puzzle.map((r) => r.map((v) => v !== null)), [puzzle]);
  const [grid, setGrid] = useState<Grid>(() => puzzle.map((r) => r.slice()));
  const [msg, setMsg] = useState<string>("");

  const setCell = (r: number, c: number, val: string) => {
    if (initial[r][c]) return;
    const n = parseInt(val, 10);
    const next = grid.map((row) => row.slice());
    next[r][c] = val === "" || isNaN(n) ? null : Math.max(1, Math.min(4, n));
    setGrid(next);
    setMsg("");
  };

  const check = () => {
    let ok = true, complete = true;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      if (grid[r][c] == null) { complete = false; ok = false; }
      else if (grid[r][c] !== solution[r][c]) ok = false;
    }
    if (ok && complete) { setMsg("Solved! 🎉"); onWin?.(); }
    else if (!complete) setMsg("Keep going — fill all cells.");
    else setMsg("Not quite right. Try again.");
  };

  const reset = () => { setGrid(puzzle.map((r) => r.slice())); setMsg(""); };
  const newGame = () => {
    const next = makePuzzle();
    setData(next);
    setGrid(next.puzzle.map((r) => r.slice()));
    setMsg("");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Fill the 4×4 grid so each row, column and 2×2 box has 1–4.
      </p>
      <div className="grid grid-cols-4 gap-0.5 rounded-xl bg-border p-0.5">
        {grid.map((row, r) =>
          row.map((v, c) => {
            const fixed = initial[r][c];
            const thickR = r % 2 === 1 && r !== 3 ? "mb-0.5" : "";
            const thickC = c % 2 === 1 && c !== 3 ? "mr-0.5" : "";
            return (
              <input
                key={`${r}-${c}`}
                value={v ?? ""}
                onChange={(e) => setCell(r, c, e.target.value.replace(/[^1-4]/g, "").slice(-1))}
                disabled={fixed}
                inputMode="numeric"
                maxLength={1}
                className={`h-14 w-14 rounded-md bg-card text-center text-xl font-semibold outline-none focus:ring-2 focus:ring-primary ${
                  fixed ? "text-foreground" : "text-primary"
                } ${thickR} ${thickC}`}
                aria-label={`Cell row ${r + 1} column ${c + 1}`}
              />
            );
          }),
        )}
      </div>
      {msg && <p className="text-sm">{msg}</p>}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button onClick={check} className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:scale-[1.02] transition-transform">Check</button>
        <button onClick={reset} className="rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-accent">Reset</button>
        <button onClick={newGame} className="rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-accent">New puzzle</button>
      </div>
    </div>
  );
}

export default Sudoku;
