"use client"
// new job page
import React, { useState } from 'react';
import { TextField, Checkbox, Button, FormControlLabel, Box, Typography, Alert, Snackbar } from '@mui/material';

interface JobFormData {
  date: string;
  location: string;
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

const AddJobForm: React.FC = () => {
  const [formData, setFormData] = useState<JobFormData>({
    date: '',
    location: '',
    starttime: '',
    stoptime: '',
    travel: 0,
    rate: 0,
    number_of_movers: 2,
    mileage: 0,
    loadSwap: false,
    uhaul: false,
    fullService: false,
    other: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/new_job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail || 
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('Job created:', data);
      setSuccess(true);
      setFormData({
        date: '',
        location: '',
        starttime: '',
        stoptime: '',
        travel: 0,
        rate: 0,
        number_of_movers: 2,
        mileage: 0,
        loadSwap: false,
        uhaul: false,
        fullService: false,
        other: false,
      });
    } catch (error) {
      console.error('Error creating job:', error);
      setError(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred while connecting to the server'
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Job
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleInputChange}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Start Time"
        name="starttime"
        type="time"
        value={formData.starttime}
        onChange={handleInputChange}
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{
          step: 300, // 5 min intervals
          'data-format': 'HH:mm'
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Stop Time"
        name="stoptime"
        type="time"
        value={formData.stoptime}
        onChange={handleInputChange}
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{
          step: 300, // 5 min intervals
          'data-format': 'HH:mm'
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Travel Time"
        name="travel"
        type="number"
        value={formData.travel}
        onChange={handleInputChange}
        inputProps={{ step: 0.25 }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Rate"
        name="rate"
        type="number"
        value={formData.rate}
        onChange={handleInputChange}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Number of Movers"
        name="number_of_movers"
        type="number"
        value={formData.number_of_movers}
        onChange={handleInputChange}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Mileage"
        name="mileage"
        type="number"
        value={formData.mileage}
        onChange={handleInputChange}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="loadSwap"
            checked={formData.loadSwap}
            onChange={handleInputChange}
          />
        }
        label="Load Swap"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="uhaul"
            checked={formData.uhaul}
            onChange={handleInputChange}
          />
        }
        label="U-Haul"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="fullService"
            checked={formData.fullService}
            onChange={handleInputChange}
          />
        }
        label="Full Service"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="other"
            checked={formData.other}
            onChange={handleInputChange}
          />
        }
        label="Other"
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">
          Job created successfully!
        </Alert>
      </Snackbar>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Create Job
      </Button>
    </Box>
  );
};

export default AddJobForm;