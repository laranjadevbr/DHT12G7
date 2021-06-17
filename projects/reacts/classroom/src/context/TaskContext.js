import React, {
  createContext,
  useEffect,
  useState,
} from 'react';

import api from '../services/api';

export const TaskContext = createContext();

export default function TaskContextProvider (props) {

  const [ tasks, setTasks ] = useState([]);
  const [ editItem, setEditItem ] = useState(null);

  useEffect(() => {
    async function getTasks() {
      try {
        const { data } = await api.get('/public/all/');
        setTasks(data);
      } catch (error) {
        console.log({
          error : error,
        });
      }
    }
    getTasks();
  }, []);

  const addTask = async (title, description) => {
    try {
      const { data } = await api.post('/public/store/', {
        description,
        title,
      });
      setTasks([ ...tasks, data ]);
    } catch (error) {
      console.log({
        error : error,
      });
    }
  }

  const editTask = async (id, title, description) => {
    await api.put('/public/update/' + id, {
      description,
      title,
    });
    setEditItem(null);
  }

  const deleteTask = async (id) => {
    try {
      await api.delete('/public/destroy/' + id)
      const newTasks = tasks.filter(task => task['id'] !== id);
      setTasks(newTasks);
    } catch (error) {
      console.log({
        error : error,
      });
    }
  }

  const doneTask = async (id) => {
    try {
      await api.put('/public/disable/' + id, { 
        disable : true,
      });
      const newTasks = tasks.filter(task => task.id !== id)
      setTasks(newTasks);
    } catch (error) {
      console.log({
        error : error,
      });
    }
  }

  const findTaskById = async (id) => {
    try {
      const { data } = await api.get('/public/one/' + id);
      setEditItem(data);
    } catch (error) {
      console.log({
        error : error,
      });
    }
  }
  
  return (
    <TaskContext.Provider value={ {
      tasks : tasks,
      deleteTask,
      findTaskById,
      doneTask,
      addTask,
      editItem : editItem,
      editTask,
    } }>
      { props['children'] }
    </TaskContext.Provider>
  )
}