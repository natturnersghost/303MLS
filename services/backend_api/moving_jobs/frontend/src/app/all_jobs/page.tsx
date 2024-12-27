'use client';
import { useState, useEffect } from 'react';

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

export default function AllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/jobs', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Jobs</h1>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div 
            key={job.id} 
            className="bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">{job.location}</h2>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <p className="text-gray-600">Date: {job.date}</p>
              <p className="text-gray-600">Time: {job.starttime} - {job.stoptime}</p>
              <p className="text-gray-600">Travel Time: {job.travel}h</p>
              <p className="text-gray-600">Rate: ${job.rate}/hr</p>
              <p className="text-gray-600">Movers: {job.number_of_movers}</p>
              <p className="text-gray-600">Mileage: {job.mileage} miles</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.loadSwap && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Load/Swap</span>}
              {job.uhaul && <span className="px-2 py-1 bg-green-100 text-green-800 rounded">U-Haul</span>}
              {job.fullService && <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">Full Service</span>}
              {job.other && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Other</span>}
            </div>
            <p className="text-gray-500 mt-2">ID: {job.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
