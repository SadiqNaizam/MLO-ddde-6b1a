import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import GlobalAppHeader from '@/components/layout/GlobalAppHeader';
import GlobalAppFooter from '@/components/layout/GlobalAppFooter';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Although FormLabel from form field is often used
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';

// Schema for form validation
const moveMoneyFormSchema = z.object({
  fromAccount: z.string().min(1, "Please select an account to transfer from."),
  toAccountIBAN: z.string().regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/, "Please enter a valid IBAN."), // Basic IBAN validation
  recipientName: z.string().min(2, "Recipient name must be at least 2 characters.").max(100),
  amount: z.coerce.number().positive("Amount must be a positive number.").min(0.01, "Minimum transfer amount is 0.01."),
  reference: z.string().max(50, "Reference cannot exceed 50 characters.").optional(),
});

type MoveMoneyFormValues = z.infer<typeof moveMoneyFormSchema>;

// Placeholder data for 'from accounts'
const userAccounts = [
  { id: "acc123", name: "Current Account (**** 6789)", balance: 1250.75 },
  { id: "acc456", name: "Savings Account (**** 1234)", balance: 5800.20 },
];

const MoveMoneyPage: React.FC = () => {
  console.log('MoveMoneyPage loaded');
  const navigate = useNavigate();

  const form = useForm<MoveMoneyFormValues>({
    resolver: zodResolver(moveMoneyFormSchema),
    defaultValues: {
      fromAccount: "",
      toAccountIBAN: "",
      recipientName: "",
      amount: undefined, // Use undefined for number inputs for placeholder behavior
      reference: "",
    },
  });

  function onSubmit(data: MoveMoneyFormValues) {
    console.log("Move Money form submitted:", data);
    toast.success("Transfer Initiated!", {
      description: `£${data.amount.toFixed(2)} to ${data.recipientName} is being processed.`,
    });
    // Potentially reset form or navigate
    // form.reset();
    // navigate("/"); // Navigate back to accounts dashboard after success
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      <GlobalAppHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
        </div>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-800 dark:text-blue-400">Move Money</CardTitle>
            <CardDescription>
              Securely transfer funds to another account. Please fill in the details below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fromAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From Account</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an account to transfer from" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {userAccounts.map(account => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name} - £{account.balance.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="toAccountIBAN"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient IBAN</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., GB29NWBK60161331926819" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (£)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} step="0.01" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Invoice payment, Birthday gift" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will appear on the recipient's statement.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Clear Form
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Submit Transfer
                    </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <GlobalAppFooter />
    </div>
  );
};

export default MoveMoneyPage;