import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  toast: {
    message: string | null;
    type: 'success' | 'error' | 'info';
  };
  isLoading: boolean;
}

const initialState: UIState = {
  toast: {
    message: null,
    type: 'success',
  },
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<{ message: string; type?: 'success' | 'error' | 'info' }>) => {
      state.toast = {
        message: action.payload.message,
        type: action.payload.type || 'success',
      };
    },
    hideToast: (state) => {
      state.toast.message = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { showToast, hideToast, setLoading } = uiSlice.actions;
export default uiSlice.reducer; 