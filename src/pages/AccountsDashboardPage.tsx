import React from 'react';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import GlobalAppHeader from '@/components/layout/GlobalAppHeader';
import GlobalAppFooter from '@/components/layout/GlobalAppFooter';

// Define a type for individual transactions, matching the one in AccountSummaryCard
interface Transaction {
  id: string;
  merchant: string; // Or description
  date: string; // ISO string or formatted date string
  amount: number;
  type: 'debit' | 'credit'; // Or 'incoming' | 'outgoing'
  currency: string;
}

// Sample data for AccountSummaryCards
const sampleAccount1Transactions: Transaction[] = [
  { id: 'tx1_1', merchant: 'Shell Garage', date: '2024-07-29', amount: -45.50, type: 'debit', currency: 'GBP' },
  { id: 'tx1_2', merchant: 'Tesco Supermarket', date: '2024-07-28', amount: -78.20, type: 'debit', currency: 'GBP' },
  { id: 'tx1_3', merchant: 'Direct Debit - Council Tax', date: '2024-07-27', amount: -150.00, type: 'debit', currency: 'GBP' },
];

const sampleAccount2Transactions: Transaction[] = [
  { id: 'tx2_1', merchant: 'Interest Payment', date: '2024-07-30', amount: 12.34, type: 'credit', currency: 'GBP' },
  { id: 'tx2_2', merchant: 'Transfer from Current Account', date: '2024-07-15', amount: 250.00, type: 'credit', currency: 'GBP' },
];

const AccountsDashboardPage: React.FC = () => {
  console.log('AccountsDashboardPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900">
      <GlobalAppHeader />
      
      <main className="flex-grow py-6 sm:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <section aria-labelledby="accounts-overview-title">
            <h1 id="accounts-overview-title" className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              Your Accounts
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
              <AccountSummaryCard
                accountId="ACC12345678"
                accountName="Current Account"
                sortCode="11-22-33"
                accountNumber="12345678"
                balance={1250.75}
                currencySymbol="£"
                recentTransactions={sampleAccount1Transactions}
              />
              <AccountSummaryCard
                accountId="ACC98765432"
                accountName="Savings Account"
                sortCode="44-55-66"
                accountNumber="87654321"
                balance={15320.40}
                currencySymbol="£"
                recentTransactions={sampleAccount2Transactions}
              />
              {/* Add more AccountSummaryCard components here if needed */}
              {/* Example of a card with no transactions passed, to use default placeholders */}
               <AccountSummaryCard
                accountId="ACC00000000"
                accountName="Holiday Fund"
                sortCode="77-88-99"
                accountNumber="00000000"
                balance={850.00}
                currencySymbol="£"
              />
            </div>
          </section>
          
          {/* You could add other sections to the dashboard here */}
          {/*
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
              Financial Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              // Placeholder for other tools or information cards
              <div className="p-4 bg-white dark:bg-slate-800 shadow rounded-lg">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Budget Planner</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Access your budgeting tools. (Not implemented)
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 shadow rounded-lg">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Spending Analysis</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  View your spending habits. (Not implemented)
                </p>
              </div>
            </div>
          </section>
          */}
        </div>
      </main>
      
      <GlobalAppFooter />
    </div>
  );
};

export default AccountsDashboardPage;