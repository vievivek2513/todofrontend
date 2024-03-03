import axios from "axios";
import { data } from "../pages/todolist/Todolist";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AllList = () => instance.get("/todo/all");

export const AddTodo = (data: data) => instance.post("/todo/add", data);

export const EditTodo = (id: string, data: data) =>
  instance.put(`/todo/edit/${id}`, data);

export const DeleteTodo = (da: any) =>
  instance.delete("/todo/delete", { data: da });
