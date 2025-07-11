import AdminSideMenu from "./AdminSideMenu";
import AdminTopNav from "./AdminTopNav";

interface AdminNavsParameters {
  page: string
  children: React.ReactNode
}

export default function AdminNavs({children, page}: AdminNavsParameters) {

    return (
         <div className="min-h-screen flex bg-gray-100">
              <AdminSideMenu/>
              <div className="flex flex-col w-full">
                <AdminTopNav page={page}/>
                {children}
              </div>
        </div>
    )
}