import axios from 'axios';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/Todo';

const API_BASE_URL = '/api/todos';

export const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await axios.get<Todo[]>(API_BASE_URL);
    return response.data;
  },

  async getTodoById(id: number): Promise<Todo> {
    const response = await axios.get<Todo>(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    const response = await axios.post<Todo>(API_BASE_URL, todo);
    return response.data;
  },

  async updateTodo(id: number, todo: UpdateTodoRequest): Promise<Todo> {
    const response = await axios.put<Todo>(`${API_BASE_URL}/${id}`, todo);
    return response.data;
  },

  async deleteTodo(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },
};
