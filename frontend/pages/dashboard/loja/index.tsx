import AdminNavs from "@/components/admin/AdminNavs";
import TableLoja from "@/components/admin/TableLoja";
import DashboardGuard from "@/components/admin/DashboardGuard";

export default function AdminLoja() {
  return (
    <DashboardGuard>
      <AdminNavs page="Loja">
        <main>
          <div className="md:mx-0 md:my-4 lg:m-4">
            <div className="flex justify-between items-center text-black p-4 bg-white m-px rounded-t-lg">
              <p className="text-2xl font-light tracking-tight text-black">Informações da Loja</p>
            </div>
            <div className="p-4 rounded-b-lg bg-white">
              <TableLoja />
            </div>
          </div>
        </main>
      </AdminNavs>
    </DashboardGuard>
  );
}