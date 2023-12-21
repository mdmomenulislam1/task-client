import axios from 'axios';
import { useState } from 'react';

const ToDo = () => {
  const [completed, setCompleted] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [onGoing, setOngoing] = useState([]);

  const apiUrl = 'http://localhost:5000/toDo';

  axios.get(apiUrl)
    .then(response => {
      const tasks = response.data;
      const completedTasks = tasks.filter(task => task.status === "completed");
      setCompleted(completedTasks);

      const toDoTasks = tasks.filter(task => task.status === "to-do");
      setToDo(toDoTasks);

      const onGoingTasks = tasks.filter(task => task.status === "ongoing");

      setOngoing(onGoingTasks);
      
    })
    .catch(error => console.error('Error fetching tasks:', error));


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
              <button>Update</button>
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








