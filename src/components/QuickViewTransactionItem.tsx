import React from 'react';
import { ArrowDownLeft, ArrowUpRight, HelpCircle } from 'lucide-react'; // HelpCircle as a fallback

interface QuickViewTransactionItemProps {
  id: string; // For React key prop
  description: string;
  date: string; // Formatted date string, e.g., "15 Jul 2024"
  amount: number;
  currencySymbol?: string; // e.g., "£"
  type: 'credit' | 'debit' | 'unknown'; // Type of transaction
  category?: string; // Optional category for more specific icon or styling in future
}

const QuickViewTransactionItem: React.FC<QuickViewTransactionItemProps> = ({
  description,
  date,
  amount,
  currencySymbol = "£",
  type,
  // category, // Category can be used later for more specific icons if needed
}) => {
  console.log('QuickViewTransactionItem loaded for:', description);

  const isCredit = type === 'credit';
  const isDebit = type === 'debit';

  const amountColor = isCredit ? 'text-green-600' : isDebit ? 'text-slate-800' : 'text-slate-600';
  const amountPrefix = isCredit ? '+' : isDebit ? '-' : '';

  let IconComponent;
  let iconColor = "text-slate-500";

  if (isCredit) {
    IconComponent = ArrowUpRight;
    iconColor = "text-green-500";
  } else if (isDebit) {
    IconComponent = ArrowDownLeft;
    iconColor = "text-red-500"; // Or a more neutral TSB color if specified
  } else {
    IconComponent = HelpCircle; // Fallback for unknown transaction type
  }

  return (
    <div className="flex items-center py-3 px-1 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition-colors duration-150">
      <div className={`mr-3 ml-1 flex-shrink-0 ${iconColor}`}>
        <IconComponent size={20} strokeWidth={2.5} />
      </div>
      <div className="flex-grow overflow-hidden">
        <p className="text-sm font-medium text-slate-700 truncate" title={description}>
          {description}
        </p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
      <div className={`ml-4 text-sm font-semibold whitespace-nowrap ${amountColor}`}>
        {amountPrefix}
        {currencySymbol}
        {Math.abs(amount).toFixed(2)}
      </div>
    </div>
  );
};

export default QuickViewTransactionItem;