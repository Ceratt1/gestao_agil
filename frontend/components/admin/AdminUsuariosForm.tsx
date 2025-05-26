import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { fetchAuth } from "@/utils/fetchAuth";
type UsuarioAPI = {
  id: number;
  username: string;
  email: string;
  regra?: string;
  // contato_whatsapp?: string; // Removido do formulário
};

type UsuarioFormProps = {
  usuario: UsuarioAPI;
  onSubmit: () => void;
};

// ...existing code...
export default function AdminUsuarioForm({ usuario, onSubmit }: UsuarioFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const payload: any = {
      username: (form.elements.namedItem('username') as HTMLInputElement)?.value || '',
      email: (form.elements.namedItem('email') as HTMLInputElement)?.value || '',
      regra: (form.elements.namedItem('regra') as HTMLInputElement)?.value || '',
    };

    // Só envia senha se for cadastro (novo usuário)
    if (!usuario.id) {
      payload.password = (form.elements.namedItem('password') as HTMLInputElement)?.value || '';
    }

    const method = usuario.id ? "PUT" : "POST";
    const url = usuario.id
      ? `/api/usuarios_lista?id=${usuario.id}` // CERTO
      : "/api/registro";

    await fetchAuth(url, {
      method,
      body: JSON.stringify(payload),
    });

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Usuário</label>
        <Input
          type="text"
          name="username"
          className="bg-white w-full text-black border border-gray-300"
          required
          defaultValue={usuario.username || ""}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
        <Input
          type="email"
          name="email"
          className="bg-white w-full text-black border border-gray-300"
          required
          defaultValue={usuario.email || ""}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Regra</label>
        <select
          name="regra"
          className="bg-white w-full text-black border border-gray-300 rounded px-2 py-2"
          defaultValue={usuario.regra || "REGULAR"}
          required
        >
          <option value="REGULAR">Regular</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      {/* Campo de senha só para novo usuário */}
      {!usuario.id && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
          <Input
            type="password"
            name="password"
            className="bg-white w-full text-black border border-gray-300"
            required
          />
        </div>
      )}
      <Button type="submit" className='bg-black cursor-pointer text-white'>Enviar</Button>
    </form>
  );
}