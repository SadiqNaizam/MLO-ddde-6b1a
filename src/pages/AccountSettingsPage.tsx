import React, { useState } from 'react';
import GlobalAppHeader from '@/components/layout/GlobalAppHeader';
import GlobalAppFooter from '@/components/layout/GlobalAppFooter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Bell, Shield, FileText, Edit3, Save, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccountSettingsPage = () => {
  console.log('AccountSettingsPage loaded');

  // Example states for interactive elements
  const [notifications, setNotifications] = useState({
    emailTransactions: true,
    emailSecurity: true,
    emailOffers: false,
    smsTransactions: false,
    smsSecurity: true,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [accountNickname, setAccountNickname] = useState("My Current Account");
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [tempNickname, setTempNickname] = useState(accountNickname);

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveNickname = () => {
    setAccountNickname(tempNickname);
    setIsEditingNickname(false);
    // Here you would typically make an API call to save the nickname
    console.log("Account nickname saved:", tempNickname);
  };
  
  const placeholderStatements = [
    { id: "stmt1", date: "July 2024", link: "/statements/july-2024.pdf" },
    { id: "stmt2", date: "June 2024", link: "/statements/june-2024.pdf" },
    { id: "stmt3", date: "May 2024", link: "/statements/may-2024.pdf" },
  ];

  const placeholderLinkedDevices = [
    { id: "dev1", name: "iPhone 15 Pro", lastAccess: "2024-07-29" },
    { id: "dev2", name: "Chrome on MacOS", lastAccess: "2024-07-28" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <GlobalAppHeader />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Account Settings</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2"><Shield className="h-4 w-4" /> Security</TabsTrigger>
            <TabsTrigger value="statements" className="flex items-center gap-2"><FileText className="h-4 w-4" /> Statements</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="John Doe" readOnly />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" readOnly />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+44 7700 900000" readOnly />
                  </div>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Personal Information
                  </Button>
                   <p className="text-xs text-muted-foreground mt-2">To update personal information, you may need to contact customer support or visit a branch.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Nickname</CardTitle>
                  <CardDescription>Set a custom nickname for this account.</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditingNickname ? (
                    <div className="space-y-2">
                      <Label htmlFor="nickname">New Nickname</Label>
                      <Input 
                        id="nickname" 
                        value={tempNickname} 
                        onChange={(e) => setTempNickname(e.target.value)}
                        maxLength={50}
                      />
                    </div>
                  ) : (
                    <p className="text-lg font-medium py-2">{accountNickname}</p>
                  )}
                </CardContent>
                <CardFooter>
                  {isEditingNickname ? (
                     <Button onClick={handleSaveNickname} className="w-full md:w-auto">
                      <Save className="mr-2 h-4 w-4" /> Save Nickname
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => { setTempNickname(accountNickname); setIsEditingNickname(true); }} className="w-full md:w-auto">
                      <Edit3 className="mr-2 h-4 w-4" /> Change Nickname
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive updates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <Label htmlFor="emailTransactions" className="flex-grow cursor-pointer">Transaction Alerts</Label>
                      <Switch id="emailTransactions" checked={notifications.emailTransactions} onCheckedChange={() => handleNotificationChange('emailTransactions')} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <Label htmlFor="emailSecurity" className="flex-grow cursor-pointer">Security Alerts</Label>
                      <Switch id="emailSecurity" checked={notifications.emailSecurity} onCheckedChange={() => handleNotificationChange('emailSecurity')} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <Label htmlFor="emailOffers" className="flex-grow cursor-pointer">Promotional Offers & News</Label>
                      <Switch id="emailOffers" checked={notifications.emailOffers} onCheckedChange={() => handleNotificationChange('emailOffers')} />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">SMS Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <Label htmlFor="smsTransactions" className="flex-grow cursor-pointer">Transaction Alerts (SMS)</Label>
                      <Switch id="smsTransactions" checked={notifications.smsTransactions} onCheckedChange={() => handleNotificationChange('smsTransactions')} />
                    </div>
                     <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <Label htmlFor="smsSecurity" className="flex-grow cursor-pointer">Security Alerts (SMS)</Label>
                      <Switch id="smsSecurity" checked={notifications.smsSecurity} onCheckedChange={() => handleNotificationChange('smsSecurity')} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Password Management</CardTitle>
                  <CardDescription>Update your account password regularly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full md:w-auto">Change Password</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <Label htmlFor="twoFactorEnabled" className="flex-grow cursor-pointer">{twoFactorEnabled ? "2FA is Enabled" : "2FA is Disabled"}</Label>
                  <Switch id="twoFactorEnabled" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                </CardContent>
                <CardFooter>
                    <Button variant="outline" disabled={!twoFactorEnabled}>Manage 2FA Settings</Button>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Linked Devices</CardTitle>
                    <CardDescription>Review and manage devices linked to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    {placeholderLinkedDevices.length > 0 ? (
                        <ul className="space-y-3">
                            {placeholderLinkedDevices.map(device => (
                                <li key={device.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                    <div>
                                        <p className="font-medium">{device.name}</p>
                                        <p className="text-xs text-muted-foreground">Last access: {device.lastAccess}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Remove device</span>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground">No devices are currently linked.</p>
                    )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Statements Tab */}
          <TabsContent value="statements">
            <Card>
              <CardHeader>
                <CardTitle>E-Statements</CardTitle>
                <CardDescription>Access and download your account statements.</CardDescription>
              </CardHeader>
              <CardContent>
                {placeholderStatements.length > 0 ? (
                  <ul className="space-y-3">
                    {placeholderStatements.map(stmt => (
                      <li key={stmt.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <p className="font-medium">{stmt.date} Statement</p>
                        <Button variant="outline" asChild>
                          <a href={stmt.link} target="_blank" rel="noopener noreferrer">Download PDF</a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No statements available.</p>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Statements are typically available for up to 7 years. For older statements, please contact support.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
      <GlobalAppFooter />
    </div>
  );
};

export default AccountSettingsPage;