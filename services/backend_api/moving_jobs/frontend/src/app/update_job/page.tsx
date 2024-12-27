'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

interface Job {
  id: number;
  location: string;
  date: string;
  starttime: string;
  stoptime: string;
  travel: number;
  rate: number;
  number_of_movers: number;
  mileage: number;
  loadSwap: boolean;
  uhaul: boolean;
  fullService: boolean;
  other: boolean;
}

// Move your main component logic into UpdateJobContent
function UpdateJobContent() {
  // const _router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');
  
  const [job, setJob] = useState<Job>({
    id: 0,
    location: '',
    date: '',
    starttime: '',
    stoptime: '',
    travel: 0,
    rate: 0,
    number_of_movers: 0,
    mileage: 0,
    loadSwap: false,
    uhaul: false,
    fullService: false,
    other: false
  });

  const [message, setMessage] = useState('');

  const fetchJob = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/job/${jobId}`);
      if (response.ok) {
        const data = await response.json();
        const formattedData = {
          ...data,
          date: data.date.split('T')[0]
        };
        setJob(formattedData);
      } else {
        setMessage('Failed to fetch job details');
      }
    } catch (error) {
      console.error('Error fetching job:', error);
      setMessage('Error fetching job details');
    }
  }, [jobId]);

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [jobId, fetchJob]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobData = {
        ...job,
        id: Number(jobId)
      };

      const response = await fetch(`http://localhost:8000/job/${jobId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        setJob(updatedJob);
        setMessage('Job updated successfully!');
      } else {
        const errorData = await response.json();
        setMessage(`Failed to update job: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating job:', error);
      setMessage('Error updating job');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setJob(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Job</h1>

      {message && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={job.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            name="starttime"
            value={job.starttime}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stop Time</label>
          <input
            type="time"
            name="stoptime"
            value={job.stoptime}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Travel Time (hours)</label>
          <input
            type="number"
            step="0.25"
            name="travel"
            value={job.travel}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rate ($/hr)</label>
          <input
            type="number"
            name="rate"
            value={job.rate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Movers</label>
          <input
            type="number"
            name="number_of_movers"
            value={job.number_of_movers}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mileage</label>
          <input
            type="number"
            name="mileage"
            value={job.mileage}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Load Swap</label>
          <input
            type="checkbox"
            name="loadSwap"
            checked={job.loadSwap}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">U-Haul</label>
          <input
            type="checkbox"
            name="uhaul"
            checked={job.uhaul}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Service</label>
          <input
            type="checkbox"
            name="fullService"
            checked={job.fullService}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Other</label>
          <input
            type="checkbox"
            name="other"
            checked={job.other}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
}

// Wrap with Suspense in the default export
export default function UpdateJob() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateJobContent />
    </Suspense>
  );
}
