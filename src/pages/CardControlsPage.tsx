import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalAppHeader from '@/components/layout/GlobalAppHeader';
import GlobalAppFooter from '@/components/layout/GlobalAppFooter';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // For PIN dialog example
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Lock, Unlock, Eye, ShieldAlert, Landmark, Info, X } from 'lucide-react';

const CardControlsPage: React.FC = () => {
  console.log('CardControlsPage loaded');

  const [isCardLocked, setIsCardLocked] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showReportLostDialog, setShowReportLostDialog] = useState(false);
  const [isOnlinePaymentsFrozen, setIsOnlinePaymentsFrozen] = useState(false);
  const [pinAttempt, setPinAttempt] = useState('');

  const handleToggleCardLock = () => {
    setIsCardLocked(!isCardLocked);
    // Here you would typically call an API
    // For now, just log it
    console.log(`Card lock status changed to: ${!isCardLocked ? 'Locked' : 'Unlocked'}`);
  };

  const handleToggleOnlinePayments = () => {
    setIsOnlinePaymentsFrozen(!isOnlinePaymentsFrozen);
    console.log(`Online payments frozen status changed to: ${!isOnlinePaymentsFrozen ? 'Frozen' : 'Active'}`);
  };

  const handlePinReminder = () => {
    // In a real app, this would involve stronger authentication
    // For demo, just show a placeholder.
    console.log("PIN reminder requested. Showing dialog.");
    setShowPinDialog(true);
  };

  const handleReportLostStolen = () => {
    console.log("Report lost/stolen card requested. Showing dialog.");
    setShowReportLostStolen(true);
  };
  
  // Mock PIN check
  const MOCK_PIN = "1234"; // This is highly insecure, for demo only
  const [pinMessage, setPinMessage] = useState('');


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <GlobalAppHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Card Controls</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Manage your debit card settings and security.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Card Lock Section */}
            <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
              <div className="flex items-center space-x-3">
                {isCardLocked ? <Lock className="h-6 w-6 text-red-500" /> : <Unlock className="h-6 w-6 text-green-500" />}
                <div>
                  <Label htmlFor="card-lock-switch" className="text-base font-medium text-gray-700 dark:text-gray-200">
                    {isCardLocked ? 'Card Locked' : 'Card Active'}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isCardLocked ? 'Unlock your card to make payments.' : 'Lock your card to prevent unauthorized use.'}
                  </p>
                </div>
              </div>
              <Switch
                id="card-lock-switch"
                checked={isCardLocked}
                onCheckedChange={handleToggleCardLock}
                aria-label={isCardLocked ? 'Unlock card' : 'Lock card'}
              />
            </div>

            {/* PIN Reminder Section */}
            <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start py-6" onClick={handlePinReminder}>
                  <Eye className="mr-3 h-5 w-5 text-blue-600" />
                  <span className="text-base">View PIN Reminder</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>PIN Reminder</DialogTitle>
                  <DialogDescription>
                    For security, please enter your app password or use biometric authentication to view your PIN.
                    (This is a simplified demo).
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Label htmlFor="pin-attempt">Enter Mock PIN (e.g., 1234)</Label>
                  <Input id="pin-attempt" type="password" value={pinAttempt} onChange={(e) => setPinAttempt(e.target.value)} placeholder="****" />
                  {pinMessage && <Alert variant={pinMessage.startsWith("Incorrect") ? "destructive" : "default"}><AlertDescription>{pinMessage}</AlertDescription></Alert>}
                </div>
                <DialogFooter>
                  <Button type="button" onClick={() => {
                    if (pinAttempt === MOCK_PIN) {
                      setPinMessage(`Your PIN is: ${MOCK_PIN}. Remember to keep it safe.`);
                    } else {
                      setPinMessage("Incorrect PIN. Please try again.");
                    }
                  }}>
                    Show PIN
                  </Button>
                   <DialogClose asChild>
                      <Button type="button" variant="outline" onClick={() => { setPinAttempt(''); setPinMessage(''); }}>Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Report Lost/Stolen Card Section */}
             <Dialog open={showReportLostDialog} onOpenChange={setShowReportLostDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full justify-start py-6" onClick={handleReportLostStolen}>
                  <ShieldAlert className="mr-3 h-5 w-5" />
                  <span className="text-base">Report Card Lost or Stolen</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Report Lost or Stolen Card</DialogTitle>
                  <DialogDescription>
                    If your card is lost or stolen, please contact us immediately.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3">
                  <p>To report your card, please call:</p>
                  <p className="font-semibold text-lg text-blue-600">0800 000 123</p>
                  <p className="text-sm text-gray-500">Alternatively, you can visit your nearest TSB branch.</p>
                  <Alert variant="destructive">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertDescription>
                      Your current card will be blocked immediately upon reporting. A new card will be issued.
                    </AlertDescription>
                  </Alert>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Advanced Settings Accordion */}
            <Accordion type="single" collapsible className="w-full pt-4">
              <AccordionItem value="advanced-settings">
                <AccordionTrigger className="text-base font-medium text-gray-700 dark:text-gray-200 hover:no-underline">
                  Advanced Card Settings
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-6">
                  {/* Freeze Online Payments */}
                  <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <Landmark className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <Label htmlFor="online-payments-switch" className="font-medium text-gray-700 dark:text-gray-200">
                          Online Payments
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {isOnlinePaymentsFrozen ? 'Online payments are frozen.' : 'Allow online transactions.'}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="online-payments-switch"
                      checked={isOnlinePaymentsFrozen}
                      onCheckedChange={handleToggleOnlinePayments}
                      aria-label={isOnlinePaymentsFrozen ? 'Unfreeze online payments' : 'Freeze online payments'}
                    />
                  </div>

                  {/* Spending Limits - Placeholder */}
                  <div className="p-3 border rounded-lg dark:border-gray-700">
                     <div className="flex items-center space-x-3">
                        <Info className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <div>
                            <p className="font-medium text-gray-700 dark:text-gray-200">Spending Limits</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                View or adjust your daily and transaction spending limits.
                            </p>
                        </div>
                    </div>
                    <Button variant="link" className="mt-2 px-0 text-blue-600" onClick={() => alert("Feature to manage spending limits coming soon!")}>
                        Manage Limits
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6 text-center">
                <Link to="/">
                    <Button variant="outline">
                        Back to Accounts
                    </Button>
                </Link>
            </div>

          </CardContent>
        </Card>
      </main>
      <GlobalAppFooter />
    </div>
  );
};

export default CardControlsPage;