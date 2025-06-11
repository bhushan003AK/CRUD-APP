'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { createUser, getUsers, updateUser, deleteUser } from './actions';

export default function UserPage() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

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

    if (editingId) {
      formData.append('id', editingId);
      await updateUser(formData);
      setEditingId(null);
    } else {
      await createUser(formData);
    }

    await loadUsers();
    reset();
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setValue('name', user.name);
    setValue('phone', user.phone);
  };

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    await deleteUser(formData);
    await loadUsers();
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">{editingId ? 'Edit User' : 'Add User'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name')} placeholder="Name" className="w-full p-2 border rounded" />
        <input {...register('phone')} placeholder="Phone Number" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? 'Update' : 'Submit'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              reset();
              setEditingId(null);
            }}
            className="ml-2 text-gray-500 underline"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Submitted Users:</h2>
        <ul className="mt-2 space-y-2">
          {users.map((user) => (
            <li key={user.id} className="p-2 border rounded flex justify-between items-center">
              <span>👤 {user.name} – 📞 {user.phone}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
