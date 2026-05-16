import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#eef9ee]">

      <Sidebar />
      
      <div className="flex-1 flex flex-col">

        <Navbar />

        {/* PAGE CONTENT */}
        <main className="p-8">
          {children}
        </main>

      </div>
    </div>
  );
}