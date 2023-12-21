import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import Swal from 'sweetalert2';
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";

const ToDo = () => {
  const { user } = useContext(AuthContext);
  const [completed, setCompleted] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [onGoing, setOngoing] = useState([]);

  const apiUrl = 'http://localhost:5000/toDo';

  axios.get(apiUrl)
    .then(response => {
      const task = response.data;
      const tasks = task.filter(item => item?.taskHolderEmail === user?.email)
      const completedTasks = tasks.filter(task => task.status === "completed");
      setCompleted(completedTasks);

      const toDoTasks = tasks.filter(task => task.status === "to-do");
      setToDo(toDoTasks);

      const onGoingTasks = tasks.filter(task => task.status === "ongoing");

      setOngoing(onGoingTasks);

    })
    .catch(error => console.error('Error fetching tasks:', error));


  const handleOnGoing = item => {

    const toDoData = {
      name: item.name,
      taskHolderName: item.taskHolderName,
      taskHolderEmail: item.taskHolderEmail,
      deadline: item.deadline,
      status: "ongoing",
      description: item.description,
    }

    fetch(`http://localhost:5000/toDo/${item._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDoData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} is ongoing Now!`,
            showConfirmButton: false,
            timer: 1000
          });
        }
      })
  };


  const handleComplete = item => {

    const toDoData = {
      name: item.name,
      taskHolderName: item.taskHolderName,
      taskHolderEmail: item.taskHolderEmail,
      deadline: item.deadline,
      status: "completed",
      description: item.description,
    }

    fetch(`http://localhost:5000/toDo/${item._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDoData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} is completed Now!`,
            showConfirmButton: false,
            timer: 1000
          });
        }
      })
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/toDo/${item._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.deletedCount > 0) {

              Swal.fire({
                title: "Deleted!",
                text: `${item.name} is deleted`,
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            // Handle error as needed
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the item.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="grid grid-cols-3 gap-5">
     
      <div className="border-2 rounded-xl p-5  border-blue-600 ">
        <h2 className='font-bold text-yellow-600 text-2xl'>To-Do Task List</h2>
        {
          toDo.length !== 0 ?
            <div >
              {
                toDo?.map((item,index) =>
                  <div item={item}
                    key={item._id}
                    
                    className="p-2">
                    <div className="flex items-center gap-2">
                    <h2 className="font-bold text-[20px]">{index + 1}.</h2>
                    <h2 className="font-bold text-[20px]">{item.name}</h2>
                    </div>
                    <p className="text-justify font-semibold">{item.description}</p>
                    <p className="font-bold text-xl">Deadline {item.deadline}</p>

                    <button className="text-lg font-bold px-3 m-2 py-1 rounded-lg bg-yellow-600 text-white" onClick={() => handleOnGoing(item)}><CiBookmark /> </button>
                    <button className="text-lg font-bold px-3 m-2 py-1 rounded-lg bg-green-600 text-white" onClick={() => handleComplete(item)}><IoCheckmarkDoneSharp /></button>
                    <button className="text-lg font-bold px-3 m-2 py-1 rounded-lg bg-red-600 text-white" onClick={() => handleDelete(item)}><MdDeleteForever /></button>
                  </div>
                )
              }
            </div>
            :
            <h2 className="text-2xl text-center text-red-800 font-bold">No To-Do Task</h2>
        }
      </div>



      <div className="border-2 rounded-xl p-5  border-blue-600 ">
        <h2 className='font-bold text-yellow-600 text-2xl'>Ongoing Task List</h2>
        {
          onGoing.length !== 0 ?
            <div >
              {
                onGoing?.map((item,index) =>
                  <div item={item}
                    key={item._id}
                    
                    className="p-2">
                    <div className="flex items-center gap-2">
                    <h2 className="font-bold text-[20px]">{index + 1}.</h2>
                    <h2 className="font-bold text-[20px]">{item.name}</h2>
                    </div>
                    <p className="text-justify font-semibold">{item.description}</p>
                    <p className="font-bold text-xl">Deadline {item.deadline}</p>

                    
                    <button className="text-lg font-bold px-3 m-2 py-1 rounded-lg bg-green-600 text-white" onClick={() => handleComplete(item)}><IoCheckmarkDoneSharp /></button>
                    <button className="text-lg font-bold px-3 m-2 py-1 rounded-lg bg-red-600 text-white" onClick={() => handleDelete(item)}><MdDeleteForever /></button>
                  </div>
                )
              }
            </div>
            :
            <h2 className="text-2xl text-center text-red-800 font-bold">No To-Do Task</h2>
        }
      </div>

      





      <div className="border-2 rounded-xl p-5  border-blue-600 ">
        <h2 className='font-bold text-yellow-600 text-2xl'>Completed Task List</h2>
        {
          completed.length !== 0 ?
            <div >
              {
                completed?.map((item,index) =>
                  <div item={item}
                    key={item._id}
                    
                    className="p-2">
                    <div className="flex items-center gap-2">
                    <h2 className="font-bold text-[20px]">{index + 1}.</h2>
                    <h2 className="font-bold text-[20px]">{item.name}</h2>
                    </div>
                    <p className="text-justify font-semibold">{item.description}</p>
                    <p className="font-bold text-xl">Deadline {item.deadline}</p>

                    <button className="text-lg font-bold px-3 m-2 py-1 rounded-lg bg-red-600 text-white" onClick={() => handleDelete(item)}><MdDeleteForever /></button>
                  </div>
                )
              }
            </div>
            :
            <h2 className="text-2xl text-center text-red-800 font-bold">No To-Do Task</h2>
        }
      </div>



    </div>


  );
};

export default ToDo;








