type UserDetailsProps = {
  username: string;
  email: string;
};

export default function UserDetails({ username, email }: UserDetailsProps) {
  return (
    <div className='py-5 px-3 border-zinc-300 border rounded-4xl shadow-xl'>
      <div className='p-6'>
        <h2 className='text-lg font-bold text-center mb-3'>
          Informações do usuário
        </h2>

        <div className='flex flex-col gap-2 mb-2'>
          <label className='text-sm text-zinc-600'>Nome de usuário</label>
          <div className='rounded-xl h-11 p-2 bg-white flex items-center'>
            {username}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-sm text-zinc-600'>Email</label>
          <div className='rounded-xl h-11 p-2 bg-white flex items-center'>
            {email}
          </div>
        </div>
      </div>
    </div>
  );
}
