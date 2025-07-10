import axios from "axios";

export const registerUser = async (form) => {
  const res = await axios.post("http://localhost:8000/api/auth/register", form);
  return res.data;
};

export const loginUser = async (form) => {
  const res = await axios.post("http://localhost:8000/api/auth/login", form);
  return res.data;
};
