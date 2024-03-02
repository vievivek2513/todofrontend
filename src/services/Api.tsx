import axios from "axios";
import { data } from "../pages/todolist/Todolist";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const AllList = () => instance.get("/todo/all");

export const AddTodo = (data: data) => instance.post("/todo/add", data);

export const DeleteTodo = (da: any) =>
  instance.delete("/todo/delete", { data: da });
