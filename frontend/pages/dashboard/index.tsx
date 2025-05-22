import TableLoja from "@/components/admin/TableLoja";
import AdminNavs from "@/components/admin/AdminNavs";
import DashboardGuard from "@/components/admin/DashboardGuard";

export default function Dashboard() {
  return (
    <DashboardGuard>
      <AdminNavs page="Dashboard">
        <main>
          {/* ...restante do seu código... */}
          <TableLoja />
        </main>
      </AdminNavs>
    </DashboardGuard>
  );
}