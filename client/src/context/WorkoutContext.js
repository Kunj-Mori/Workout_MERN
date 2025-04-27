import { createContext, useReducer } from 'react';
import { API_URL } from '../config/config';

// ... existing code ...

    const fetchWorkouts = async () => {
        try {
            const response = await fetch(`${API_URL}/api/workouts`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: data });
            }
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    };

    const createWorkout = async (workoutData) => {
        try {
            const response = await fetch(`${API_URL}/api/workouts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(workoutData)
            });
            const data = await response.json();

            if (response.ok) {
                dispatch({ type: 'CREATE_WORKOUT', payload: data });
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Error creating workout:', error);
            return { success: false, error: 'Failed to create workout' };
        }
    };

    const deleteWorkout = async (workoutId) => {
        try {
            const response = await fetch(`${API_URL}/api/workouts/${workoutId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                dispatch({ type: 'DELETE_WORKOUT', payload: workoutId });
                return { success: true };
            } else {
                const data = await response.json();
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Error deleting workout:', error);
            return { success: false, error: 'Failed to delete workout' };
        }
    };

// ... existing code ... 