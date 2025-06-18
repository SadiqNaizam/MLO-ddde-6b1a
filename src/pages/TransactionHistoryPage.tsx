import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalAppHeader from '@/components/layout/GlobalAppHeader';
import GlobalAppFooter from '@/components/layout/GlobalAppFooter';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption, TableFooter } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Download, Filter, Search } from 'lucide-react';

interface TransactionRow {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  currency: string;
  type: 'Debit' | 'Credit';
  balance: number;
}

const sampleTransactions: TransactionRow[] = [
  { id: 'txn1', date: '2024-07-30', description: 'Tesco Supermarket', category: 'Groceries', amount: 55.20, currency: 'GBP', type: 'Debit', balance: 1234.50 },
  { id: 'txn2', date: '2024-07-29', description: 'Online Purchase - Amazon', category: 'Shopping', amount: 22.99, currency: 'GBP', type: 'Debit', balance: 1289.70 },
  { id: 'txn3', date: '2024-07-28', description: 'Salary - Acme Corp', category: 'Income', amount: 1500.00, currency: 'GBP', type: 'Credit', balance: 1312.69 },
  { id: 'txn4', date: '2024-07-27', description: 'Starbucks Coffee', category: 'Food & Drink', amount: 3.75, currency: 'GBP', type: 'Debit', balance: 187.31 },
  { id: 'txn5', date: '2024-07-26', description: 'Gym Membership Fee', category: 'Health & Wellness', amount: 35.00, currency: 'GBP', type: 'Debit', balance: 152.31 },
  { id: 'txn6', date: '2024-07-25', description: 'Refund - ASOS', category: 'Shopping', amount: 18.50, currency: 'GBP', type: 'Credit', balance: 117.31 },
  { id: 'txn7', date: '2024-07-24', description: 'Utility Bill - Electricity', category: 'Bills', amount: 75.00, currency: 'GBP', type: 'Debit', balance: 98.81 },
  { id: 'txn8', date: '2024-07-23', description: 'Cinema Tickets', category: 'Entertainment', amount: 24.00, currency: 'GBP', type: 'Debit', balance: 23.81 },
];

const TransactionHistoryPage: React.FC = () => {
  console.log('TransactionHistoryPage loaded');

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('date-desc');

  // Placeholder for actual filtering logic
  const filteredTransactions = sampleTransactions.filter(tx => 
    tx.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || tx.type.toLowerCase() === filterType)
  );

  // Placeholder for actual sorting logic
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === 'date-desc') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortOrder === 'date-asc') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortOrder === 'amount-desc') {
      return b.amount - a.amount;
    }
    if (sortOrder === 'amount-asc') {
      return a.amount - b.amount;
    }
    return 0;
  });


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <GlobalAppHeader />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Transaction History</h1>
          <p className="text-gray-600 dark:text-gray-400">View, filter, and sort your account transactions.</p>
        </section>

        {/* Filtering and Controls Section */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search Transactions
              </label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by description, amount..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="filterType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Type
              </label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger id="filterType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort by
              </label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger id="sortOrder">
                  <SelectValue placeholder="Select sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Date (Newest First)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
                  <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
                  <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" /> Download Statement
            </Button>
          </div>
        </section>

        {/* Transactions Table Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
          <Table>
            <TableCaption className="py-4">A list of your recent transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell className="text-sm text-gray-500 dark:text-gray-400">{tx.category}</TableCell>
                    <TableCell className={`text-right font-semibold ${tx.type === 'Credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {tx.type === 'Credit' ? '+' : '-'}{tx.currency} {tx.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                       <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                         tx.type === 'Credit' 
                           ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100' 
                           : 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100'
                       }`}>
                         {tx.type}
                       </span>
                    </TableCell>
                    <TableCell className="text-right">{tx.currency} {tx.balance.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-500 dark:text-gray-400">
                    No transactions found for the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total Displayed Transactions</TableCell>
                <TableCell className="text-right">{sortedTransactions.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </section>

        {/* Pagination Section */}
        {sortedTransactions.length > 0 && (
          <section className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        )}
      </main>
      <GlobalAppFooter />
    </div>
  );
};

export default TransactionHistoryPage;