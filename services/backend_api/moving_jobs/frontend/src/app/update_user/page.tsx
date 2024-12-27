'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UserUpdateForm {
  email: string;
  username: string;
  password: string;
}

function UpdateUserContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const [formData, setFormData] = useState<UserUpdateForm>({
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) {
      setError('No user ID provided');
      setLoading(false);
      return;
    }

    // Fetch current user data
    fetch(`http://localhost:8000/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          email: data.email,
          username: data.username,
          password: '', // Don't populate password for security
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8000/user/${userId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Update failed');

      router.push('/employee_dashboard'); 
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Update User</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">New Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
}

export default function UpdateUser() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateUserContent />
    </Suspense>
  );
}
