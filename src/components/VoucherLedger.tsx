import React from 'react';
import { VoucherLedgerData, VoucherTransaction } from '../types';
import { Coins, TrendingUp, TrendingDown } from 'lucide-react';

interface VoucherLedgerProps {
  data: VoucherLedgerData;
}

export function VoucherLedger({ data }: VoucherLedgerProps) {
  return (
    <div className="bg-card rounded-2xl border border-card-border shadow-md overflow-hidden flex flex-col h-full max-h-[calc(100vh-6rem)] sticky top-24">
      <div className="p-6 bg-primary/10 border-b border-primary/20">
        <div className="flex items-center gap-2 mb-2 text-primary-foreground/80 text-primary">
          <Coins className="w-5 h-5" />
          <h2 className="font-semibold uppercase tracking-wider text-sm">Loyalty Ledger</h2>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-foreground tracking-tight">₦{data.balance.toLocaleString()}</span>
          <span className="text-sm font-medium text-muted-foreground">balance</span>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">Recent Activity</h3>
        <div className="space-y-4">
          {data.transactions.map((tx: VoucherTransaction) => (
            <div key={tx.id} className="flex items-center justify-between group p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'earned' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                }`}>
                  {tx.type === 'earned' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <div className={`font-bold text-sm ${
                tx.type === 'earned' ? 'text-primary' : 'text-foreground'
              }`}>
                {tx.type === 'earned' ? '+' : '-'}₦{tx.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
