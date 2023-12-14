import axios from "axios";

const baseURL = 'https://user-profile-6y7o.onrender.com/api/v1/'

export async function getSectors(): Promise<any> {
  return axios.get(`${baseURL}sector`);
}

export async function addSector(sector: any): Promise<any> {
  return axios.post(`${baseURL}sector`, sector);
}

export async function getUsers(): Promise<any> {
  return axios.get(`${baseURL}user`);
}

export async function addUser(user: any): Promise<any> {
  return axios.post(`${baseURL}user`,  {
    "name": user.name,
    "agreedToTerms": user.agreedToTerms,
    "sectors": user.sectors.map((s: any)=> ({id: s?.value, name: s?.label}))
  });
}

export async function editUser(user: any): Promise<any> {
  return axios.put(`${baseURL}user/${user.id}`, {
    "name": user.name,
    "agreedToTerms": user.agreedToTerms,
    "sectors": user.sectors.map((s: any)=> ({id: s?.value}))
  });
}
