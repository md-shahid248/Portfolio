import { useMemo, useState } from "react";

// 6x6 Sudoku (values 1-6), boxes are 3 cols x 2 rows. Very easy difficulty.
// Inspired by classic worksheet-style layout: clean grid with thicker
// borders separating the 3x2 boxes.

type Grid = (number | null)[][];

const BASE: number[][] = [
  [1, 2, 3, 4, 5, 6],
  [4, 5, 6, 1, 2, 3],
  [2, 3, 1, 5, 6, 4],
  [5, 6, 4, 2, 3, 1],
  [3, 1, 2, 6, 4, 5],
  [6, 4, 5, 3, 1, 2],
];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateSolution(): number[][] {
  // Permute symbols 1..6
  const perm = shuffle([1, 2, 3, 4, 5, 6]);
  let grid = BASE.map((row) => row.map((v) => perm[v - 1]));

  // Swap rows within each box-row (boxes are 2 rows tall)
  for (let br = 0; br < 3; br++) {
    if (Math.random() < 0.5) {
      const r1 = br * 2, r2 = br * 2 + 1;
      [grid[r1], grid[r2]] = [grid[r2], grid[r1]];
    }
  }
  // Swap box-rows (groups of 2)
  const brOrder = shuffle([0, 1, 2]);
  grid = brOrder.flatMap((br) => [grid[br * 2], grid[br * 2 + 1]]);

  // Permute columns within each box-col, and optionally swap box-cols
  return permuteCols(grid);
}

function permuteCols(grid: number[][]): number[][] {
  const colOrder: number[] = [];
  for (let bc = 0; bc < 2; bc++) {
    const order = shuffle([0, 1, 2]).map((i) => bc * 3 + i);
    colOrder.push(...order);
  }
  // Optionally swap the two box-cols
  let order = colOrder;
  if (Math.random() < 0.5) {
    order = [...colOrder.slice(3, 6), ...colOrder.slice(0, 3)];
  }
  return grid.map((row) => order.map((c) => row[c]));
}

function makePuzzle(): { puzzle: Grid; solution: number[][] } {
  const sol = generateSolution();
  const puzzle: Grid = sol.map((r) => r.slice());
  // Remove ~14 cells out of 36 (very easy — leaves ~22 clues)
  const cells = Array.from({ length: 36 }, (_, i) => i).sort(() => Math.random() - 0.5).slice(0, 14);
  for (const c of cells) {
    puzzle[Math.floor(c / 6)][c % 6] = null;
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
    next[r][c] = val === "" || isNaN(n) ? null : Math.max(1, Math.min(6, n));
    setGrid(next);
    setMsg("");
  };

  const check = () => {
    let ok = true, complete = true;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) {
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
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Very Easy</span>
        <p className="max-w-sm text-center text-sm text-muted-foreground">
          Fill the 6×6 grid so each row, column and 3×2 box contains 1–6.
        </p>
      </div>

      <div
        className="rounded-lg border-2 border-foreground bg-card p-0 shadow-sm"
        role="grid"
        aria-label="Sudoku 6 by 6"
      >
        {grid.map((row, r) => (
          <div key={r} className="flex">
            {row.map((v, c) => {
              const fixed = initial[r][c];
              // Thick borders separating 3×2 boxes
              const borderRight = c === 5 ? "" : (c + 1) % 3 === 0 ? "border-r-2 border-r-foreground" : "border-r border-r-foreground/30";
              const borderBottom = r === 5 ? "" : (r + 1) % 2 === 0 ? "border-b-2 border-b-foreground" : "border-b border-b-foreground/30";
              return (
                <input
                  key={`${r}-${c}`}
                  value={v ?? ""}
                  onChange={(e) =>
                    setCell(r, c, e.target.value.replace(/[^1-6]/g, "").slice(-1))
                  }
                  readOnly={fixed}
                  inputMode="numeric"
                  maxLength={1}
                  className={[
                    "h-11 w-11 sm:h-12 sm:w-12 bg-transparent text-center text-xl font-semibold outline-none",
                    "focus:bg-primary/10 focus:ring-2 focus:ring-inset focus:ring-primary",
                    borderRight,
                    borderBottom,
                    fixed ? "text-foreground cursor-default" : "text-primary",
                  ].join(" ")}
                  aria-label={`Row ${r + 1} column ${c + 1}${fixed ? `, fixed value ${v}` : ""}`}
                />
              );
            })}
          </div>
        ))}
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
