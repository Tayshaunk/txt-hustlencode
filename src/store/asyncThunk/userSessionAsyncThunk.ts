import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUserApi } from 'api/auth.api';
import { AxiosError } from 'axios';
import { IHustlencodeUserSession } from 'interfaces/user.interface';

/**
 * Async method that makes request to load app. We request the current users
 * profile information
 */
export const loadAppAsyncThunk = createAsyncThunk<any>('userSession/loadApp', async (payload, { rejectWithValue }) => {
  // returns admin profile
  try {
    // make api request to verify reset code
    const user: IHustlencodeUserSession = await getCurrentUserApi();

    return user;
  } catch (err: any) {
    const error: AxiosError<any> = err; // cast

    if (!error.response) {
      throw err;
    }

    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue({
      response: {
        data: { message: error.response.data.message },
        status: error.response.status,
      },
    });
  }
});
