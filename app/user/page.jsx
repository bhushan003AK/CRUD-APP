'use client';

// This form stores submitted user data locally (in memory using useState).
// It uses react-hook-form for efficient, minimal-boilerplate form handling.

import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function UserFormClient() {
  // Initialize react-hook-form
  // register → connects inputs to form
  // handleSubmit → wraps onSubmit with validation
  // reset → clears form fields after submit
  const { register, handleSubmit, reset } = useForm();

  // Local state to store submitted entries (not saved to a backend)
  const [entries, setEntries] = useState([]);

  // This function runs after the form is successfully submitted
  const onSubmit = (data) => {
    // Add the new entry to the list
    setEntries(prev => [...prev, data]);

    // Clear the form inputs
    reset();
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Form Title */}
      <h1 className="text-xl font-bold mb-4">User Form</h1>

      {/* Form with react-hook-form handling */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name input - connected via register */}
        <input
          {...register('name')}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />

        {/* Phone input - connected via register */}
        <input
          {...register('phone')}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {/* Display submitted users */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Submitted Users:</h2>
        <ul className="mt-2 space-y-2">
          {entries.map((entry, index) => (
            <li key={index} className="p-2 border rounded">
              👤 {entry.name} – 📞 {entry.phone}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
