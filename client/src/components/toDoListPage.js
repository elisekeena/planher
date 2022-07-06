import React, { useState, useEffect} from 'react';
import '../App.css';

// import { getTasks, completeTask, useGlobalState, getStorageToken, removeTask, editTaskContent} from "../App";
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import {RiSave3Line} from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';
import { createGlobalState } from 'react-hooks-global-state';
import { v4 as uuidv4 } from 'uuid';
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import {IoMdAddCircle} from 'react-icons/io';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const options = [
    'not done', 'in progress', 'done'
  ];

const defaultOption = options[0];
export const checkTasks = () => {
    if(localStorage.getItem("storageTasks") === null)
      localStorage.setItem("storageTasks", "[]");
  }
  
export const getTasks = () => {
    checkTasks();
    return JSON.parse(localStorage.getItem("storageTasks"));
  }
export const completeTask = (currentId, bool) => {
const tasks = getTasks();
tasks[currentId].iscompleted = bool;

updateTasks(tasks);
}
export const { useGlobalState } = createGlobalState({data: null});


export const updateTasks = (tasks) => {
    localStorage.setItem("storageTasks", JSON.stringify(tasks));
  }
  
export const getStorageToken = () => {
    if(localStorage.getItem("storageToken") === null)
      localStorage.setItem("storageToken", uuidv4());
  
    return localStorage.getItem("storageToken");
  }
export const removeTask = (currentId, name) => {

fetch(`/delete_to_do_list`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        user_id: 2,
        task: name,
      }),
    })
    .catch((err) => console.log("🔥", err))
    .then(
        // update user.meals with removed meal
        console.log("delete!")
        );

const tasks = getTasks();
const newTasks = tasks.filter((task) => {
    return task.id !== currentId;
});

updateTasks(newTasks);
}

export const editTaskContent = (currentId, content, name) => {
const tasks = getTasks();
tasks[currentId].body = content;
tasks[currentId].name = name;

updateTasks(tasks);
}
  
  

export default function ToDoListPage() {
    // const [toDoLists, setToDoLists] = useState([]);
    const [data, setToDoLists] = useState([]);
    useEffect(() => {
        fetch("/to_do_lists")
        .then(res => res.json())
        .then(data => {
            setToDoLists(data);
        })
      }, []);
//   const data = toDoLists

    const [jsonData, setData] = useGlobalState('data'); 
    const [editingId, setEditingId] = useState(null);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState(null);
    const [newName, setNewName] = useState('');
    const [newContent, setNewContent] = useState('');
    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');
  
  
    function isEmptyOrSpaces(str){
      return str === null || str.match(/^ *$/) !== null;
  }
  function addToDoTask(name, body, iscompleted) {
    fetch("/user_to_do_lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 2,
        task: name,
        status: iscompleted,
        note: body,
      }),
    }).then((res) => {
        if (res.ok) {
          res.json().then((task) => {
            console.log(task)
          });
        } else {
          res.json().then((json) => {
            setErrors(json.errors);
            console.log("errors: ", json.errors)
          });
        }
      }
      );
  }

  const addTask = (task, note, status) => {

    const id = getTasks().length === 0 ? 0 : getTasks()[getTasks().length - 1].id + 1;
    const object = {"id": id, "note": note, "status": status, "task": task};
    const tasks = getTasks();
    data.push(object);
    setToDoLists(data);
    addToDoTask(task, note, status)
  }

  const submitTask = () =>{

    if(name === '' || body === ''){
      toast.error('Fill the blank fields');
    }else{
      addTask(name, body, "not done");
      setData(getTasks());
      
      setName('');
      setBody('');
      setStatus('');
    }
  }
    return (
        <div>
        <div className="add-task">
        <h1><BsFillCalendarPlusFill></BsFillCalendarPlusFill> ADD TASK:</h1>
        <ul className="task-options">
          <li>
            <label>Task name:</label>
            <input className="center-block" type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}></input>
          </li>

          <li>
            <label>Task body:</label>
            <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}></textarea>
          </li>

          {/* <li>
            <label>Status:</label>
            <Dropdown 
                options={options} 
                onChange={(e) => setStatus(e.target.value)}
                value={defaultOption} 
                placeholder="Select an option" />;
          </li> */}


          <Toaster />
          <button onClick={submitTask}><IoMdAddCircle></IoMdAddCircle> Add task</button>
        </ul>
      </div>

      <div className="tasks-list">
        <h1><BsFillCalendarWeekFill></BsFillCalendarWeekFill> TODO:</h1>
        <div className="task-container">
          {data && data.map(task => {
              return (
                  
                <div className="task" key={task.id}>
                  <p className="small-text">Task:</p>
                  {/* {(!editing || task.id !== editingId ) && <h2 id={"name-" + task.id}>{
                    newName === "" ? task.task : (editing && task.id === editingId ? newName : task.task)
                  }</h2>} */}
                  {editing && task.id === editingId && <input type="text" value={newName} onChange={(e) => {
                    setNewName(e.target.value);
                  }}></input>}
                  <p>{task.task}</p>
                  <div className="completed">
                    <label htmlFor={"cb" + task.id}>Status: <span className={task.status == "done" ? "done" : "todo"}>{task.status}</span></label>
                    <input type="checkbox" id={"cb" + task.id} checked={task.status} onChange={(e) => {completeTask(task.id, e.target.checked); setData(getTasks());}}></input>
                  </div>
                  {(!editing || task.id !== editingId ) && <p className="task-content" id={"content-" + task.id}>{task.note}</p>}
                  {editing && task.id === editingId && <textarea className="task-newcontent" value={newContent} onChange={(e) => {
                    setNewContent(e.target.value);
                  }}></textarea>}
                  {(!editing || task.id !== editingId ) && <button onClick={() => {setEditingId(task.id);setEditing(!editing); setNewName(task.task); setNewContent(task.task)}}><AiFillEdit></AiFillEdit> Edit</button>}
  
                  {editing && task.id === editingId && <button onClick={() => {
                    if(isEmptyOrSpaces(newContent) ||isEmptyOrSpaces(newName)){
                      toast.error('Fill the blank fields');
                    }else{
                      editTaskContent(task.id, newContent, newName);
                      setEditingId(null);
                      setEditing(!editing);
                      setData(getTasks());
                    }
                  }}><RiSave3Line></RiSave3Line> Save</button>}
  
                  <button className="delete-btn" onClick={() => {removeTask(task.id, task.name); setData(getTasks()); toast.success('Successfully deleted');}}> <AiFillDelete></AiFillDelete> Delete task</button>
                </div>
              );
          })}
        </div>
      </div>
      </div>
    );
  }

