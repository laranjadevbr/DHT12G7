import {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  TaskContext,
} from '../../context/TaskContext';

import './styles.css';

export default function TaskForm () {
  
  const {
    addTask,
    editItem,
    editTask,
  } = useContext(TaskContext);

  const [ title, setTitle ] = useState('');

  const [ description, setDescription ] = useState('');

  useEffect(() => {
    if (editItem) {
      setTitle(editItem['firstName']);
      setDescription(editItem['lastName']);
    }
  }, [editItem]);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  }

  const handleSubmit = async (event) => {
    if (editItem) { editTask(editItem.id, title, description);
    } else { addTask(title, description); }
    setDescription('');
    setTitle('');
  }

  const handleClear = (event) => {
    event.preventDefault();
    setDescription('');
    setTitle('');
  }

  return (
    <form onSubmit={ handleSubmit } className="form">
      <input
        onChange={ handleChangeTitle }
        value={ title }
        type="text"
        className="task-input"
        placeholder="Title"
      />
      <input
        onChange={ handleChangeDescription }
        value={ description }
        type="text"
        className="task-input"
        placeholder="Description"
      />
      <div className="buttons">
        <button className="btn add-task-btn">
          { editItem ? 'Editar' : 'Adicionar' }
        </button>
        <button onClick={ handleClear } className="btn clear-btn">
          Limpar
        </button>
      </div>
    </form>
  )
}