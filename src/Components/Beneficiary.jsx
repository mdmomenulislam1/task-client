import axios from 'axios';
import { useState } from 'react';

const Beneficiary = () => {

  const [benefit, setBenefit] = useState([]);

  const apiUrl = 'http://localhost:5000/benefit';
  axios.get(apiUrl)
  .then(response => {
    const benefit = response.data;
    setBenefit(benefit)
    
  })
  .catch(error => console.error('Error fetching tasks:', error));


  return (
    <div className=''>
      <h2 className="text-3xl  text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Beneficiary Section</h2>
      {
        benefit.length !== 0 ?
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5  gap-5 mx-5">
          {
            benefit?.map(item => 
              <div item={item}
              key={item._id}
              className="p-3 border-r-4 rounded-xl border-blue-600">
              <h2 className="font-bold text-2xl py-2">{item.title}</h2>
              <p className="text-justify font-semibold">{item.description}</p>
            
              </div>
              )
          }
          </div>
          :
          <h2 className="text-3xl text-center text-red-800 font-bold">No To-Do Task Available</h2>
      }
    </div>
  );
};

export default Beneficiary;