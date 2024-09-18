import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from 'jwt-decode';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export const extractEmail = ()=>{
  const token = localStorage.getItem('access-token'); // Assuming you store the token in localStorage
  if (token !== null ) {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub;
  }
  return null;
}


export const availbleToken = () => {
  if(localStorage.getItem('access-token') !== null){
    return true;
  }
  return window.location.href = "/auth/signin";
}