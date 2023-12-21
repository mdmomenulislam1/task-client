import React, { useContext } from 'react';
import ToDo from '../Components/ToDo';
import { AuthContext } from '../Firebase/AuthProvider';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const handleAddTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.task_name.value;
    const priority = form.task_priority.value;
    const taskHolderName = user?.displayName;
    const taskHolderEmail = user?.email;
    const deadline = form.deadlin.value;
    const status = "to-do";
    const description = form.task_description.value;

    console.log(name, priority, taskHolderName,  taskHolderEmail, deadline, status, description);
    const taskData = {
      name, priority, taskHolderName, taskHolderEmail, deadline, status, description
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Task has been saved",
            showConfirmButton: false,
            timer: 1000
          });
        }
      });
  }





  return (
    <div className="mx-auto max-w-screen-lg my-5">
      <div className="">
        <h2 className="text-3xl  text-center border-y-4 p-3 rounded-xl border-blue-800 font-bold my-4">Add A Task</h2>

        <form onSubmit={handleAddTask} action="" method="post" className=" w-full text-center">
          <div className="flex justify-between">
            <div className="">
              <p className="text-black font-bold ">Task Name</p>

              <input type="text" name="task_name" id="" placeholder="Task Name" required className="m-2 w-7/10 p-3 text-black font-semibold border rounded-lg" />
            </div>


            <div className="">
              <p className="text-black font-bold ">Priority Stage</p>

              <select
                name="task_priority"
                id=""
                required
                className="m-2 w-7/10 p-3 text-black font-semibold border rounded-lg"
              >
                <option value="emergency">Emergency</option>
                <option value="essential">Essential</option>
                <option value="optional">Optional</option>
              </select>

            </div>


            <div className="">
              <p className=" text-black font-bold ">Deadline</p>
              <input type="date" name="deadlin" id="" required className="m-2 w-7/10 p-3 text-black font-semibold border rounded-lg" />
            </div>



            <div className="">
              <p className=" text-black font-bold ">Task Description</p>
              <input type="text" name="task_description" id="" required placeholder="Task Description" className="m-2 w-7/10 p-3 text-black font-semibold border rounded-lg" />
            </div>

            <br />
          </div>
          <button className=" bg-yellow-600 hover:bg-yellow-800 w-full p-3 text-white font-bold border rounded-lg" type="submit">Add Task</button>
        </form>
      </div>


      <div>
        <h2 className="text-3xl  text-center border-y-4 p-3 rounded-xl border-blue-800 font-bold my-4">Tasks</h2>
        <ToDo />
      </div>


    </div>
  );
};

export default Dashboard;