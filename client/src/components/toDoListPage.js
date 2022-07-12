import React, { useState, useEffect} from 'react';
import '../App.css';

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
import { useOutletContext } from "react-router-dom";

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

export const { useGlobalState } = createGlobalState({data: null});


export const updateTasks = (tasks) => {
    localStorage.setItem("storageTasks", JSON.stringify(tasks));
  }
  
// export const getStorageToken = () => {
//     if(localStorage.getItem("storageToken") === null)
//       localStorage.setItem("storageToken", uuidv4());
  
//     return localStorage.getItem("storageToken");
//   }
export const removeTask = (currentId, taskName, userId) => {
  
  fetch(`/delete_to_do_list`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        user_id: userId,
        to_do_list_id: currentId,
      }),
    })
    .catch((err) => console.log("🔥", err))
    .then(
      // update user.meals with removed meal
      console.log("delete!")
    );

  const tasks = getTasks();
  const newTasks = tasks.filter((task) => {
      return task.task !== taskName;
  });
  updateTasks(newTasks);
}

// export const editTaskContent = (currentId, content, name) => {
// const tasks = getTasks();
// tasks[currentId].body = content;
// tasks[currentId].name = name;

// updateTasks(tasks);
// }
  
  

export default function ToDoListPage() {
    const [jsonData, setData] = useGlobalState('data'); 
    const [editingId, setEditingId] = useState(null);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState(null);
    const [newName, setNewName] = useState('');
    const [newContent, setNewContent] = useState('');
    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');
    const [user, setUser] = useOutletContext();


    useEffect(() => {
        fetch("/to_do_lists/"+user.id)
        .then(res => res.json())
        .then(data => {
            setData(data)
            localStorage.setItem("storageTasks", JSON.stringify(data));
        })
      }, []);

  function isEmptyOrSpaces(str){
      return str === null || str.match(/^ *$/) !== null;
  }

  const completeTask = (currentId, status) => {
    const tasks = getTasks();
    for (const task of tasks) {
      if (task.id === currentId) {
        if (status === "done") {
          task.status = "todo"
        }
        else {
          task.status = "done"
        }
        updateToDoTask(task);
        break;
      }
    }
    updateTasks(tasks);
  }

  const editTaskContent = (currentId, newNote, newTask) => {
    const tasks = getTasks();
    for (const task of tasks) {
      if (task.id === currentId) {
        task.task = newTask;
        task.note = newNote;
        updateToDoTask(task);
        break;
      }
    }

    updateTasks(tasks);
    }
    // TODO : add a patch function to update tasks
    // What do we do with status ?

    function updateToDoTask(task) {
      fetch("/update_to_do_list", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: task.user_id,
          task: task.task,
          status: task.status,
          note: task.note,
          to_do_list_id: task.id
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


  function addToDoTask(name, body, iscompleted, userId) {
    fetch("/user_to_do_lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
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

  const addTask = (task, note, status, userId) => {

    const tasks = getTasks();
    const id = tasks.length === 0 ? 0 :tasks.slice(-1)[0].id +2;
    const object = {"id": id, "note": note, "status": status, "task": task};
    tasks.push(object);
    setData(tasks)
    localStorage.setItem("storageTasks", JSON.stringify(tasks));
    addToDoTask(task, note, status, userId)
  }

  const submitTask = (userId) =>{
    if(name === '' || body === ''){
      toast.error('Fill the blank fields');
    }else{
      addTask(name, body, "todo", userId);
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
          <Toaster />
          <button onClick={() => {submitTask(user.id)}}><IoMdAddCircle></IoMdAddCircle> Add task</button>
        </ul>
      </div>

      <div className="tasks-list">
        <h1><BsFillCalendarWeekFill></BsFillCalendarWeekFill> TODO:</h1>
        <div className="task-container">
          {jsonData && jsonData.map(task => {
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
                    <input type="checkbox" id={"cb" + task.id} checked={task.status} onChange={(e) => {completeTask(task.id, task.status); setData(getTasks());}}></input>
                  </div>
                  {(!editing || task.id !== editingId ) && <p className="task-content" id={"content-" + task.id}>{task.note}</p>}
                  {editing && task.id === editingId && <textarea className="task-newcontent" value={newContent} onChange={(e) => {
                    setNewContent(e.target.value);
                  }}></textarea>}
                  {(!editing || task.id !== editingId ) && <button onClick={() => {setEditingId(task.id);setEditing(!editing); setNewName(task.task); setNewContent(task.note)}}><AiFillEdit></AiFillEdit> Edit</button>}
  
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
  
                  <button className="delete-btn" onClick={() => {removeTask(task.id, task.task, user.id); setData(getTasks()); toast.success('Successfully deleted');}}> <AiFillDelete></AiFillDelete> Delete task</button>
                </div>
              );
          })}
        </div>
      </div>
      {/* <img className = "cardImage" src={"https://i.pinimg.com/originals/d5/ca/d0/d5cad0e2027c3384ae5af9646edf9b55.gif"} /> */}
      
      </div>
    );
  }

