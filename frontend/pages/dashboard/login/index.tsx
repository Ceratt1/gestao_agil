import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

export default function Login() {

  return (
    <div className="flex justify-center items-center h-140">
      
      <form method="post" action="/api/auth/signin/email" className="flex flex-col gap-6 max-w-lg items-stretch content-center">
        <p className="text-center md:text-left text-lg text-gray-300 md:text-xl max-w-2xl">
          Login
        </p>
        <Input type="text" className="bg-white text-black" placeholder="usuario"/>
        <Input type="password" className="bg-white text-black" placeholder="senha"/>
        <Button className="group bg-white text-black hover:bg-gray-200 rounded-full px-8 cursor-pointer" size="lg">
            Entrar
        </Button>
      </form>
    </div>
  )
}
