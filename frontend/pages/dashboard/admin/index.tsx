import AdminHeader from "@/components/admin/AdminHeader"
import AdminFooter from "@/components/admin/AdminFooter"
import AdminContent from "@/components/admin/AdminContent"

export default function Admin() {
    return (
         <div className="min-h-screen flex flex-col">
              <AdminHeader />
                
              <AdminContent />
        
              <AdminFooter />
        </div>
    )
}