import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  isAuth: false,
  id: "",
  name: "",
  surName: "",
  lastName: "",
  role: "",
  phone: "",
  email: ""
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('token', action.payload)
      const user: any = jwtDecode(action.payload);
      state.id = user.id;
      const [name, surname, lastName] = user.fio.split(' ');
      state.phone = user.phone;
      state.email = user.email;
      state.name = name;
      state.surName = surname;
      state.lastName = lastName;
      state.role = user.role;
      state.isAuth = true;
    },
    clearAuth: () => {
      localStorage.removeItem('token');
      return { ...initialState };
    }
  }
});

export const { setUser, clearAuth } = userSlice.actions;
export const userReduce = userSlice.reducer;
