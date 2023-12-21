import React, { useContext } from 'react';
import ToDo from '../Components/ToDo';
import { AuthContext } from '../Firebase/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { task_name, task_priority, deadlin, task_description } = data;

    const taskData = {
      name: task_name,
      priority: task_priority,
      taskHolderName: user?.displayName,
      taskHolderEmail: user?.email,
      deadline: deadlin,
      status: "to-do",
      description: task_description,
    };

    fetch('http://localhost:5000/toDo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.acknowledged) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Task has been saved',
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };

  return (
    <div className="mx-auto max-w-screen-lg my-5">
      <Helmet>
        <title>{'Task Manager || DashBoard'}</title>
      </Helmet>
      <div className="">
        <h2 className="text-3xl  text-center border-y-4 p-3 rounded-xl border-blue-800 font-bold my-4">Add A Task</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full text-center">
          <div className="flex justify-between">
            <div className="">
              <p className="text-black font-bold ">Task Name</p>

              <input
                type="text"
                name="task_name"
                placeholder="Task Name"
                required
                {...register('task_name')}
                className="m-2 w-7/10 p-3 text-black font-semibold border rounded-lg"
              />
            </div>

            <div className="">
              <p className="text-black font-bold ">Priority Stage</p>

              <select
                name="task_priority"
                required
                {...register('task_priority')}
                className="m-2 w-7/10 p-3 text-black font-semibold border rounded-lg"
              >
                <option value="emergency">Emergency</option>
                <option value="essential">Essential</option>
                <option value="optional">Optional</option>
              </select>
            </div>

            <div className="">
              <p className=" text-black font-bold ">Deadline</p>
              <input
                type="date"
                name="deadlin"
                required
                {...register('deadlin')}
                className="m-2 w-7/10 p-3 text-black font-semibold border rounded-lg"
              />
            </div>

            <div className="">
              <p className=" text-black font-bold ">Task Description</p>
              <input
                type="text"
                name="task_description"
                placeholder="Task Description"
                required
                {...register('task_description')}
                className="m-2 w-7/10 p-3 text-black font-semibold border rounded-lg"
              />
            </div>

            <br />
          </div>
          <button className=" bg-blue-600 hover:bg-blue-800 w-full p-3 text-white font-bold border rounded-lg" type="submit">
            Add Task
          </button>
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
