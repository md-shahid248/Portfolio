import { useMemo, useState } from "react";
import { Flag, Bomb } from "lucide-react";

const ROWS = 10;
const COLS = 10;
const MINES = 10;

type Cell = { mine: boolean; revealed: boolean; flagged: boolean; adj: number };

function makeBoard(safeR: number, safeC: number): Cell[][] {
  const board: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, revealed: false, flagged: false, adj: 0 })),
  );
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (board[r][c].mine) continue;
    if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
    board[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (board[r][c].mine) continue;
    let n = 0;
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
      if (board[nr][nc].mine) n++;
    }
    board[r][c].adj = n;
  }
  return board;
}

function emptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, revealed: false, flagged: false, adj: 0 })),
  );
}

export function Minesweeper({ onWin }: { onWin?: () => void }) {
  const [board, setBoard] = useState<Cell[][]>(() => emptyBoard());
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  const flood = (b: Cell[][], r: number, c: number) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    const cell = b[r][c];
    if (cell.revealed || cell.flagged || cell.mine) return;
    cell.revealed = true;
    if (cell.adj === 0) {
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        if (dr || dc) flood(b, r + dr, c + dc);
      }
    }
  };

  const checkWin = (b: Cell[][]) => {
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      if (!b[r][c].mine && !b[r][c].revealed) return false;
    }
    return true;
  };

  const reveal = (r: number, c: number) => {
    if (status !== "playing") return;
    let b = board;
    if (!started) {
      b = makeBoard(r, c);
      setStarted(true);
    }
    const next = b.map((row) => row.map((cell) => ({ ...cell })));
    if (next[r][c].flagged || next[r][c].revealed) { setBoard(next); return; }
    if (next[r][c].mine) {
      for (let i = 0; i < ROWS; i++) for (let j = 0; j < COLS; j++) if (next[i][j].mine) next[i][j].revealed = true;
      setBoard(next); setStatus("lost"); return;
    }
    flood(next, r, c);
    setBoard(next);
    if (checkWin(next)) { setStatus("won"); onWin?.(); }
  };

  const flag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (status !== "playing" || !started) return;
    const next = board.map((row) => row.map((cell) => ({ ...cell })));
    if (!next[r][c].revealed) next[r][c].flagged = !next[r][c].flagged;
    setBoard(next);
  };

  const restart = () => { setBoard(emptyBoard()); setStarted(false); setStatus("playing"); };

  const flagsUsed = useMemo(
    () => board.flat().filter((c) => c.flagged).length,
    [board],
  );

  const msg = status === "won" ? "Cleared! 🎉" : status === "lost" ? "Boom! You hit a mine." : `Mines: ${MINES - flagsUsed}`;

  const colorFor = (n: number) => {
    const colors = ["", "text-blue-500", "text-emerald-500", "text-red-500", "text-purple-500", "text-orange-500", "text-pink-500", "text-cyan-500", "text-foreground"];
    return colors[n] || "text-foreground";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Left-click to reveal. Right-click (or long-press) to flag.
      </p>
      <p className="text-sm">{msg}</p>
      <div className="grid gap-0.5 rounded-xl bg-border p-0.5" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => reveal(r, c)}
              onContextMenu={(e) => flag(e, r, c)}
              className={`flex aspect-square w-full min-w-0 items-center justify-center rounded-md text-xs font-bold transition-colors sm:text-sm ${
                cell.revealed
                  ? cell.mine
                    ? "bg-red-500/20 text-red-500"
                    : `bg-background ${colorFor(cell.adj)}`
                  : "bg-card hover:bg-accent"
              }`}
              aria-label={`Cell ${r + 1}, ${c + 1}`}
            >
              {cell.revealed
                ? cell.mine
                  ? <Bomb className="h-4 w-4" />
                  : cell.adj > 0 ? cell.adj : ""
                : cell.flagged
                  ? <Flag className="h-4 w-4 text-primary" />
                  : ""}
            </button>
          )),
        )}
      </div>
      <button
        onClick={restart}
        className="rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-accent"
      >
        Restart
      </button>
    </div>
  );
}

export default Minesweeper;
