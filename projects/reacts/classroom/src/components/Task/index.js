import React, {
  useContext,
} from 'react';

import {
  TaskContext,
} from '../../context/TaskContext';

import {
  Check,
  Delete,
  Edit,
} from '@material-ui/icons';

import './style.css';

export default function Task({ task }) {
  const {
    deleteTask,
    findTaskById, 
    doneTask,
  } = useContext(TaskContext);
  return (
    <li className="list-item" key={ task['id'] }>
      <span> { task['firstName'] } </span>
      <div>
        <Delete className="btn-icons" onClick={ () => { return deleteTask(task['id']); } } />
        <Edit className="btn-icons" onClick={ () => { return findTaskById(task['id']); } } />
        <Check className="btn-icons" onClick={ () => { return doneTask(task['id']); } } />
      </div>
    </li>
  );
}