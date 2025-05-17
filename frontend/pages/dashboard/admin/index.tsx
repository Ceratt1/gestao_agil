import AdminHeader from "@/components/admin/AdminHeader"
import AdminContent from "@/components/admin/AdminContent"
import Footer from "@/components/footer/footer"

export default function Admin() {
    return (
         <div className="min-h-screen flex flex-col">
              
              <AdminHeader />
                
              <AdminContent />
        
              <Footer />
        </div>
    )
}