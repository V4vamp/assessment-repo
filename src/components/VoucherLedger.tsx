import { useMemo } from "react";
import type { PointsLedger } from "../types/types";
import { Coins, TrendingUp, TrendingDown } from "lucide-react";

interface VoucherLedgerProps {
  pointsLedger: PointsLedger[];
}

export function VoucherLedger({ pointsLedger }: VoucherLedgerProps) {
  const totalPoints = useMemo(
    () => pointsLedger.reduce((sum, entry) => sum + entry.points, 0),
    [pointsLedger],
  );

  const recentTransactions = useMemo(
    () =>
      [...pointsLedger].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [pointsLedger],
  );

  return (
    <div className="bg-card rounded-2xl border border-card-border shadow-md overflow-hidden flex flex-col h-full max-h-[calc(100vh-6rem)] sticky top-24">
      <div className="p-6 bg-primary/10 border-b border-primary/20">
        <div className="flex items-center gap-2 mb-2 text-primary">
          <Coins className="w-5 h-5" />
          <h2 className="font-semibold uppercase tracking-wider text-sm">
            Loyalty Ledger
          </h2>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-foreground tracking-tight">
            {totalPoints.toLocaleString()}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            points
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentTransactions.map((entry) => {
            const isEarned = entry.points >= 0;
            return (
              <div
                key={entry.id}
                className="flex items-center justify-between group p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isEarned
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {isEarned ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {entry.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div
                  className={`font-bold text-sm ${isEarned ? "text-primary" : "text-foreground"}`}
                >
                  {isEarned ? "+" : ""}
                  {entry.points}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
