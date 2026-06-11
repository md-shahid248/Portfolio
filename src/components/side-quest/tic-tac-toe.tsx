import { useEffect, useState } from "react";

type Cell = "X" | "O" | null;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(b: Cell[]): { winner: Cell; line: number[] | null } {
  for (const l of LINES) {
    const [a, b1, c] = l;
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return { winner: b[a], line: l };
  }
  return { winner: null, line: null };
}

function emptyIdx(b: Cell[]) {
  return b.map((v, i) => (v ? null : i)).filter((v): v is number => v !== null);
}

// Smart but beatable: 70% optimal, 30% random
function pickAIMove(b: Cell[]): number {
  const empties = emptyIdx(b);
  if (empties.length === 0) return -1;
  if (Math.random() < 0.3) return empties[Math.floor(Math.random() * empties.length)];
  // Try to win
  for (const i of empties) {
    const test = [...b]; test[i] = "O";
    if (checkWinner(test).winner === "O") return i;
  }
  // Block
  for (const i of empties) {
    const test = [...b]; test[i] = "X";
    if (checkWinner(test).winner === "X") return i;
  }
  if (empties.includes(4)) return 4;
  const corners = [0, 2, 6, 8].filter((i) => empties.includes(i));
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  return empties[Math.floor(Math.random() * empties.length)];
}

export function TicTacToe({ onWin }: { onWin?: () => void }) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const { winner, line } = checkWinner(board);
  const isDraw = !winner && board.every(Boolean);
  const done = !!winner || isDraw;

  useEffect(() => {
    if (done) {
      if (winner === "X") onWin?.();
      return;
    }
    if (turn === "O") {
      const t = setTimeout(() => {
        const m = pickAIMove(board);
        if (m >= 0) {
          const next = [...board]; next[m] = "O";
          setBoard(next); setTurn("X");
        }
      }, 400);
      return () => clearTimeout(t);
    }
  }, [turn, board, done, winner, onWin]);

  const click = (i: number) => {
    if (done || board[i] || turn !== "X") return;
    const next = [...board]; next[i] = "X";
    setBoard(next); setTurn("O");
  };

  const restart = () => { setBoard(Array(9).fill(null)); setTurn("X"); };

  const status = winner
    ? winner === "X" ? "You win! 🎉" : "Computer wins."
    : isDraw ? "It's a draw."
    : turn === "X" ? "Your turn (X)" : "Computer thinking…";

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">{status}</p>
      <div className="grid grid-cols-3 gap-2">
        {board.map((c, i) => {
          const isWin = line?.includes(i);
          return (
            <button
              key={i}
              onClick={() => click(i)}
              className={`h-14 w-14 sm:h-16 sm:w-16 rounded-xl border border-border bg-card text-2xl sm:text-3xl font-semibold transition-colors hover:border-primary/40 ${
                isWin ? "border-primary bg-primary/10 text-primary" : ""
              }`}
              aria-label={`Cell ${i + 1}`}
            >
              {c}
            </button>
          );
        })}
      </div>
      <div className="mt-1 flex justify-center">
        <button
          onClick={restart}
          className="rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-accent"
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;
