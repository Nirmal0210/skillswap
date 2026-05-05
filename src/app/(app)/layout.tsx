import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Alert from "@/components/ui/Alert";
import { AlertProvider } from "@/context/AlertContext";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AlertProvider>
          {children}
          <Alert /> {/* Lives here so it's above everything */}
        </AlertProvider>
      </main>
      <Footer />
    </div>
  );
}
