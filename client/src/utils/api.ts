Here's the implementation of API service functions for Supabase interactions:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Get all challenges
export const getChallenges = async () => {
  const { data, error } = await supabase
    .from('challenges')
    .select('*');
  
  if (error) throw error;
  return data;
};

// Get a specific challenge by ID
export const getChallengeById = async (id) => {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Submit a solution
export const submitSolution = async (solutionData) => {
  const { data, error } = await supabase
    .from('solutions')
    .insert([solutionData])
    .select();
  
  if (error) throw error;
  return data;
};

// Get user data by ID
export const getUserData = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

// Get all solutions for a user
export const getUserSolutions = async (userId) => {
  const { data, error } = await supabase
    .from('solutions')
    .select('*')
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
};

// Update user profile
export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select();
  
  if (error) throw error;
  return data;
};
```