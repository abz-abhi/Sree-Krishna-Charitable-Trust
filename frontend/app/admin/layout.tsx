"use client"; // Admin layout may use hooks or client-side interactivity

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">{children}</main>
    </div>
  );
}
