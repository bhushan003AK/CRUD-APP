'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { createUser, getUsers } from './actions';

export default function UserPage() {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const allUsers = await getUsers();
    setUsers(allUsers);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);

    await createUser(formData);
    await loadUsers();
    reset();
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">User Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name')} placeholder="Name" className="w-full p-2 border rounded" />
        <input {...register('phone')} placeholder="Phone Number" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Submitted Users:</h2>
        <ul className="mt-2 space-y-2">
          {users.map((user) => (
            <li key={user.id} className="p-2 border rounded">
              👤 {user.name} – 📞 {user.phone}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
