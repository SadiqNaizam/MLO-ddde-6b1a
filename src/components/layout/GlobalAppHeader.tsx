import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Banknote, Search, Bell, UserCircle, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const GlobalAppHeader: React.FC = () => {
  console.log('GlobalAppHeader loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-blue-700 dark:hover:text-blue-400 ${
      isActive ? 'text-blue-600 dark:text-blue-500 font-semibold' : 'text-muted-foreground'
    }`;

  const MobileNavLinks = () => (
    <nav className="grid gap-4 text-lg font-medium">
      <NavLink to="/" className={navLinkClasses} end>
        Accounts
      </NavLink>
      <NavLink to="/move-money" className={navLinkClasses}>
        Payments
      </NavLink>
      <NavLink to="/account-settings" className={navLinkClasses}>
        Profile
      </NavLink>
      <NavLink to="/transaction-history" className={navLinkClasses}>
        History
      </NavLink>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 mr-4">
            <Banknote className="h-7 w-7 text-blue-600" />
            <span className="font-bold text-xl text-blue-700">TSB</span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm lg:gap-6">
            <NavLink to="/" className={navLinkClasses} end>
              Accounts
            </NavLink>
            <NavLink to="/move-money" className={navLinkClasses}>
              Payments
            </NavLink>
            <NavLink to="/account-settings" className={navLinkClasses}>
              Profile
            </NavLink>
             <NavLink to="/transaction-history" className={navLinkClasses}>
              History
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <UserCircle className="h-6 w-6" />
            <span className="sr-only">User Profile</span>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex items-center gap-2 mb-6">
                <Banknote className="h-7 w-7 text-blue-600" />
                <span className="font-bold text-xl text-blue-700">TSB</span>
              </div>
              <MobileNavLinks />
               <div className="mt-6 flex flex-col gap-2">
                 <Button variant="ghost" size="sm" className="justify-start">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start">
                    <UserCircle className="h-6 w-6 mr-2" />
                    User Profile
                  </Button>
               </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default GlobalAppHeader;