import { Button } from "../ui/button"
import { LogOut } from "lucide-react"

export default function AdminHeader() {
    return (
        <header className="bg-white text-black px-6 py-4 flex items-center justify-between flex-row-reverse">
            <h1 className="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                Painel Administrativo
            </h1>
            <div className="flex items-center space-x-4 px-5">
                <Button
                    className="group bg-gray-300 text-black hover:bg-gray-200 rounded-full px-8 cursor-pointer flex gap-2 items-center"
                    size="lg"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </Button>
            </div>
        </header>
    )
}
