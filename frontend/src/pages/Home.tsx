import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  CreditCard,
  DollarSign,
  PieChart,
  Send,
  Smartphone,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1">
          <Section1 />
          <Section2 />
          <Section3 />
        </main>
        <Footer />
      </div>
    </div>
  );
};

function Header() {
  return (
    <div>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <div className="text-2xl font-semibold">Payment</div>
          <span className="sr-only">PayFlow</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#section1"
          >
            Features
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#section2"
          >
            About
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#section3"
          >
            Contact
          </a>
        </nav>
      </header>
    </div>
  );
}

function Footer() {
  return (
    <div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2023 PayFlow Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}

function Section1() {
  const navigate = useNavigate();
  return (
    <div>
      <section id="section1" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Seamless Payments for Everyone
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Send, receive, and manage your money with ease. Join millions of
                users who trust PayFlow for their financial needs.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Get Started
              </Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section2() {
  return (
    <div>
      <section
        id="section2"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Key Features
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Send className="h-6 w-6 mb-2" />
                <CardTitle>Instant Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Send money to anyone, anywhere, instantly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CreditCard className="h-6 w-6 mb-2" />
                <CardTitle>Virtual Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Create virtual cards for secure online shopping.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <PieChart className="h-6 w-6 mb-2" />
                <CardTitle>Expense Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Automatically categorize and track your expenses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section3() {
  return (
    <div>
      <section id="section3" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Versatile Payment Options
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex items-center space-x-4 py-4">
                <Smartphone className="h-10 w-10 text-gray-500" />
                <div>
                  <h3 className="text-lg font-semibold">Mobile Payments</h3>
                  <p className="text-sm text-gray-500">
                    Pay securely using your smartphone
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center space-x-4 py-4">
                <Globe className="h-10 w-10 text-gray-500" />
                <div>
                  <h3 className="text-lg font-semibold">
                    International Transfers
                  </h3>
                  <p className="text-sm text-gray-500">
                    Send money across borders effortlessly
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center space-x-4 py-4">
                <ShieldCheck className="h-10 w-10 text-gray-500" />
                <div>
                  <h3 className="text-lg font-semibold">Secure Transactions</h3>
                  <p className="text-sm text-gray-500">
                    Advanced encryption for all payments
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center space-x-4 py-4">
                <CreditCard className="h-10 w-10 text-gray-500" />
                <div>
                  <h3 className="text-lg font-semibold">Card Payments</h3>
                  <p className="text-sm text-gray-500">
                    Support for all major credit cards
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center space-x-4 py-4">
                <Zap className="h-10 w-10 text-gray-500" />
                <div>
                  <h3 className="text-lg font-semibold">Instant Refunds</h3>
                  <p className="text-sm text-gray-500">
                    Quick and hassle-free refund process
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center space-x-4 py-4">
                <PieChart className="h-10 w-10 text-gray-500" />
                <div>
                  <h3 className="text-lg font-semibold">Spending Analytics</h3>
                  <p className="text-sm text-gray-500">
                    Visualize and analyze your spending habits
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline">
              Explore All Features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
