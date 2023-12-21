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
    <div>
        <h2>Beneficiary Section</h2>
      {
        benefit.length !== 0 ?
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {
            benefit?.map(item => 
              <div item={item}
              key={item._id}
              className="p-2">
              <h2>{item.title}</h2>
              <p className="text-justify">{item.description}</p>
            
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