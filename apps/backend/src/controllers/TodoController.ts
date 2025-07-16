import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Todo } from '../entities/Todo';

export class TodoController {
  private todoRepository = AppDataSource.getRepository(Todo);

  async getAllTodos(req: Request, res: Response) {
    try {
      const todos = await this.todoRepository.find({
        order: { createdAt: 'DESC' }
      });
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  }

  async getTodoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const todo = await this.todoRepository.findOne({
        where: { id: parseInt(id) }
      });
      
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todo' });
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const todo = this.todoRepository.create({
        title,
        description: description || '',
        completed: false
      });

      const savedTodo = await this.todoRepository.save(todo);
      res.status(201).json(savedTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      const todo = await this.todoRepository.findOne({
        where: { id: parseInt(id) }
      });

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      if (title !== undefined) todo.title = title;
      if (description !== undefined) todo.description = description;
      if (completed !== undefined) todo.completed = completed;

      const updatedTodo = await this.todoRepository.save(todo);
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const result = await this.todoRepository.delete(parseInt(id));
      
      if (result.affected === 0) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  }
}
