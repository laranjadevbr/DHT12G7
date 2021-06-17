import React, {
  useContext,
} from 'react';
import {
  TaskContext,
} from '../../context/TaskContext';
// Context API;
// Redux-Saga;
import Task from '../Task';
import './styles.css';
export default function TaskList () {
  const { tasks } = useContext(TaskContext);
  return (
    <div>
      {
        tasks['length']
        ?
        <ul className="list-tasks"> {
            tasks.map(task => {
              return <Task key={ task['id'] } task={ task } />
            })
        } </ul>
        :
        <div className="no-tasks">
          Não existem tarefas
        </div>
      }
    </div>
  );
}