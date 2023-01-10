import axios from "axios";
import { getNewId } from "./idService";

const BASE_URL = 'http://localhost:3001';

const instance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
});

export async function getAllData(url) {
  const { data } = await instance.get(url);
  return data;
}

export async function postData(url, object) {
  const { data } = await instance.post(url, {
    id: getNewId(),
    ...object,
  });

  return data;
}

export async function updateData(url, object) {
  const { data } = await instance.put(url, {
    ...object,
  });

  return data;
}

export async function deleteData(url) {
  await instance.delete(url);
}