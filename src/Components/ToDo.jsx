import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import Swal from 'sweetalert2';

const ToDo = () => {
  // const axiosSecure = useAxiosSecure();
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      {/* Todo List */}
      <div>
        <h2>To-Do Task List</h2>
        {
          toDo.length !== 0 ?
            <div >
              {
                toDo?.map(item =>
                  <div item={item}
                    key={item._id}
                    className="p-2">
                    <h2>{item.name}</h2>
                    <p className="text-justify">{item.description}</p>
                    <p>{item.deadline}</p>

                    <button onClick={() => handleOnGoing(item)}>On Going</button>
                    <button onClick={() => handleComplete(item)}>Completed</button>
                    <button onClick={() => handleDelete(item)}>Delete</button>
                  </div>
                )
              }
            </div>
            :
            <h2 className="text-3xl text-center text-red-800 font-bold">No To-Do Task Available</h2>
        }
      </div>





      <div>

        <h2>Ongoing List</h2>
        {
          onGoing.length !== 0 ?
            <div >
              {
                onGoing?.map(item =>
                  <div item={item}
                    key={item._id}>
                    <h2>{item.name}</h2>
                  </div>
                )
              }
            </div>
            :
            <h2 className="text-3xl text-center text-red-800 font-bold">No Ongoing Task Available</h2>
        }
      </div>





      <div>
        <h2>Completed Task List</h2>
        {
          completed.length !== 0 ?
            <div >
              {
                completed?.map(item =>
                  <div item={item}
                    key={item._id}>
                    <h2>{item.name}</h2>
                  </div>
                )
              }
            </div>
            :
            <h2 className="text-3xl text-center text-red-800 font-bold">No Task Available</h2>
        }
      </div>



    </div>


  );
};

export default ToDo;








