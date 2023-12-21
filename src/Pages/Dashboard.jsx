import React, { useContext } from 'react';
import ToDo from '../Components/ToDo';
import { AuthContext } from '../Firebase/AuthProvider';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user} = useContext(AuthContext);
  console.log(user)

  const handleAddTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.task_name.value;
    const taskHolderName = user?.displayName;
    const taskHolderEmail = user?.email;
    const deadline = form.deadlin.value;
    const status = "to-do";
    const description = form.task_description.value;

    console.log(name, taskHolderName, taskHolderEmail, deadline, status, description);
    const taskData = {
      name, taskHolderName, taskHolderEmail, deadline, status, description
    }
    fetch('http://localhost:5000/toDo', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
      });
  }





  return (
    <div className="flex">
      <div>
        <h2>Tasks</h2>
        <ToDo />
      </div>
      <div className="w-[400px]">
        <h2 className="text-2xl">Add A Task</h2>

        <form onSubmit={handleAddTask} action="" method="post" className="w-full text-center">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex justify-center items-center w-full">
              <p className="text-black font-bold w-[200px]">Task Name</p>

              <input type="text" name="task_name" id="" placeholder="Task Name" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>


            <div className="flex justify-center items-center w-full">
              <p className=" text-black font-bold w-[200px]">Deadline</p>
              <input type="date" name="deadlin" id="" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>



            <div className="flex justify-center items-center w-full">
              <p className=" text-black font-bold w-[200px]">Task Description</p>
              <input type="text" name="task_description" id="" required placeholder="Task Description" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>

            <br />
          </div>
          <button className=" bg-yellow-600 hover:bg-yellow-800 m-3 w-3/4 p-3 text-white font-bold border rounded-lg" type="submit">Add Task</button>
        </form>
      </div>

    </div>
  );
};

export default Dashboard;