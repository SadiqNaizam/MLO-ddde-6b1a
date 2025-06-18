import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowRightLeft, CreditCard, MoreVertical, History, Settings, Landmark } from 'lucide-react';
import QuickViewTransactionItem from '@/components/QuickViewTransactionItem'; // Assuming this path

// Define a type for individual transactions
interface Transaction {
  id: string;
  merchant: string; // Or description
  date: string; // ISO string or formatted date string
  amount: number;
  type: 'debit' | 'credit'; // Or 'incoming' | 'outgoing'
  currency: string;
}

// Define props for the AccountSummaryCard
interface AccountSummaryCardProps {
  accountId: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
  balance: number;
  currencySymbol?: string;
  recentTransactions?: Transaction[];
  // TSB branding colors could be passed as props or handled via global CSS
  // primaryColor?: string; 
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountId,
  accountName,
  sortCode,
  accountNumber,
  balance,
  currencySymbol = "£",
  recentTransactions = [],
}) => {
  console.log(`AccountSummaryCard loaded for account: ${accountName} (ID: ${accountId})`);

  const formattedBalance = `${currencySymbol}${balance.toFixed(2)}`;

  // Placeholder recent transactions if none are provided
  const displayTransactions = recentTransactions.length > 0 ? recentTransactions : [
    { id: '1', merchant: 'Coffee Shop', date: '2024-07-28', amount: -3.50, type: 'debit', currency: 'GBP' },
    { id: '2', merchant: 'Salary Deposit', date: '2024-07-25', amount: 1500.00, type: 'credit', currency: 'GBP' },
    { id: '3', merchant: 'Grocery Store', date: '2024-07-23', amount: -45.20, type: 'debit', currency: 'GBP' },
  ] as Transaction[];

  return (
    <Card className="w-full max-w-md rounded-lg shadow-lg overflow-hidden bg-white flex flex-col">
      <CardHeader className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold text-blue-900">{accountName}</CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              Sort Code: {sortCode} | Account No: {accountNumber}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-700">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/transaction-history" className="flex items-center cursor-pointer">
                  <History className="mr-2 h-4 w-4" />
                  <span>View Transaction History</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/account-settings" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Landmark className="mr-2 h-4 w-4" />
                <span>View Statements</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow space-y-4">
        <div>
          <p className="text-sm text-gray-500">Available Balance</p>
          <p className="text-3xl font-bold text-blue-900">{formattedBalance}</p>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            {/* TSB Primary Blue for 'Move money' CTA */}
            <Link to="/move-money" className="flex items-center justify-center">
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Move money
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="border-blue-600 text-blue-600 hover:bg-blue-50">
            <Link to="/card-controls" aria-label="Card Controls">
              <CreditCard className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </CardContent>

      {displayTransactions.length > 0 && (
        <CardFooter className="p-0 border-t border-gray-200">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="quick-view" className="border-b-0">
              <AccordionTrigger className="px-4 py-3 text-sm font-medium text-blue-800 hover:no-underline hover:bg-blue-50 data-[state=open]:bg-blue-50">
                Quick View Recent Transactions
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-3 bg-gray-50">
                <div className="space-y-2">
                  {displayTransactions.map((transaction) => (
                    <QuickViewTransactionItem
                      key={transaction.id}
                      merchant={transaction.merchant}
                      date={transaction.date}
                      amount={transaction.amount}
                      type={transaction.type}
                      currency={transaction.currency}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      )}
    </Card>
  );
};

export default AccountSummaryCard;