
import React, { useState } from "react";
import { PlusCircle, MinusCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFinancialData } from "../../contexts/FinancialDataContext";
import { apiHelpers, handleApiError } from "@/lib/api";
import { toast } from "sonner";

const AccountSummaryCard: React.FC = () => {
  const { state, dispatch } = useFinancialData();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleAddFunds = async () => {
    setIsProcessing(true);
    try {
      // For demo purposes, we'll use a fixed amount
      // In production, this would open a payment modal
      const amount = 10000;
      
      const result = await apiHelpers.depositFunds(amount, 'bank_transfer');
      
      // Update local state
      dispatch({ type: 'ADD_FUNDS', payload: amount });
      
      toast.success(`Successfully deposited KES ${amount.toLocaleString()}`);
    } catch (error) {
      const { message } = handleApiError(error);
      toast.error(`Deposit failed: ${message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (state.accountData.balance < 5000) {
      toast.error('Insufficient balance for withdrawal');
      return;
    }

    setIsProcessing(true);
    try {
      const amount = 5000;
      
      const result = await apiHelpers.withdrawFunds(amount, 'bank_transfer');
      
      // Update local state
      dispatch({ type: 'ADD_FUNDS', payload: -amount });
      
      toast.success(`Withdrawal request submitted for KES ${amount.toLocaleString()}`);
    } catch (error) {
      const { message } = handleApiError(error);
      toast.error(`Withdrawal failed: ${message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const isPositiveChange = state.portfolioData.dailyChangePercent >= 0;

  return (
    <div className="glass-card animate-fade-in">
      <h2 className="text-lg font-bold text-off-white mb-4">Account Summary</h2>
      
      {/* Account Balance */}
      <div className="mb-4">
        <p className="text-off-white/60 text-sm">Account Balance</p>
        <p className="text-2xl font-bold text-secondary font-mono">
          KES {state.accountData.balance.toLocaleString()}
        </p>
      </div>

      {/* Portfolio Value */}
      <div className="mb-4">
        <p className="text-off-white/60 text-sm">Total Portfolio Value</p>
        <p className="text-xl font-bold text-off-white font-mono">
          KES {state.portfolioData.totalValue.toLocaleString()}
        </p>
      </div>

      {/* Daily Change */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="text-off-white/60 text-sm">Today's Change</span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
            isPositiveChange ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {isPositiveChange ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{isPositiveChange ? '+' : ''}{state.portfolioData.dailyChangePercent.toFixed(2)}%</span>
          </div>
        </div>
        <p className={`font-mono font-semibold ${
          state.portfolioData.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {state.portfolioData.dailyChange >= 0 ? '+' : ''}KES {state.portfolioData.dailyChange.toLocaleString()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={handleAddFunds}
          disabled={isProcessing}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          size="sm"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {isProcessing ? 'Processing...' : 'Deposit'}
        </Button>
        <Button 
          onClick={handleWithdraw}
          disabled={isProcessing || state.accountData.balance < 5000}
          variant="outline"
          className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
          size="sm"
        >
          <MinusCircle className="h-4 w-4 mr-2" />
          {isProcessing ? 'Processing...' : 'Withdraw'}
        </Button>
      </div>
    </div>
  );
};

export default AccountSummaryCard;
