import AdminNavs from "@/components/admin/AdminNavs";
import Table from "@/components/admin/Table";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AdminProductForm from "@/components/admin/AdminProductForm";
import { useEffect, useRef, useState } from "react";

export default function Produtos() {
    const [open, setOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close popover when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
          setOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    return (
      <AdminNavs page="Produtos">
        <div className="md:mx-0 md:my-4 lg:m-4">
          <div className="flex justify-between items-center text-black p-4 bg-white m-px rounded-t-lg">
            <p className="text-2xl font-light tracking-tight text-black">Tabela de produtos</p>
            <Button onClick={() => setOpen(!open)} className="rounded-full bg-orange-400 text-white hover:bg-orange-300 cursor-pointer"><Plus /></Button>
          </div>
          <div className="p-4 rounded-b-lg  bg-white  ">
            <Table></Table>
          </div>
        </div>
        
        {open && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30">
            </div>
            <div className="opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-2 w-48 rounded-lg bg-white shadow-lg w-sm" ref={popoverRef}>
              <div className="p-4 text-sm text-gray-700">
                <AdminProductForm onSubmit={() => setOpen(false)}/>
              </div>
            </div>
          </>
        )}

      </AdminNavs>

    )
}