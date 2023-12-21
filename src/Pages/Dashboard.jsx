import React, { useContext } from 'react';
import ToDo from '../Components/ToDo';
import { AuthContext } from '../Firebase/AuthProvider';

const Dashboard = () => {
  const { user} = useContext(AuthContext);

  const handleAddFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = form.food_name.value;
    const foodImage = form.food_image.value;
    const foodQuantity = form.food_quantity.value;
    const foodType = form.food_type.value;
    const foodMakerName = form.food_maker_name.value;
    const foodMakerEmail = form.food_maker_email.value;
    const foodOrigin = form.food_origin.value;
    const foodPrice = form.food_price.value;
    const foodDescription = form.food_description.value;

    console.log(foodName, foodImage, foodQuantity, foodType, foodMakerName, foodMakerEmail, foodOrigin, foodPrice, foodDescription);
    const foodData = {
      foodName, foodImage, foodQuantity, foodType, foodMakerName, foodMakerEmail, foodOrigin, foodPrice, foodDescription
    }
    fetch('https://assignment-11-server-site-pi.vercel.app/foods', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          swal("Okay, Done!", "Food added successfully!", "success");
        }
      });
  }





  return (
    <div className="flex">
      <div>
        <h2>Tasks</h2>
        <ToDo />
      </div>
      <div className="w-[200px]">
        <h2 className="text-2xl">Add A Task</h2>
        <form onSubmit={handleAddFood} action="" method="post" className="w-full text-center">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex justify-center items-center w-full">
              <p className="text-black font-bold w-[200px]">Food Name</p>

              <input type="text" name="food_name" id="" placeholder="Food Name" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>
            <div className="flex justify-center items-center w-full">
              <p className=" text-black font-bold w-[200px]">Food Photo URL</p>
              <input type="text" name="food_image" id="" placeholder="Food Image URL" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>

            <div className="flex justify-center items-center w-full">
              <p className=" text-black font-bold w-[200px]">Food Quantity</p>
              <input type="number" min="1" required name="food_quantity" id="" placeholder="Food Quantity" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>

            <div className="flex justify-center items-center w-full">
              <p className=" text-black font-bold w-[200px]">Food Category</p>
              <input type="text" name="food_type" id="" placeholder="Food Category" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>

            <div className="flex justify-center items-center w-full">
              <p className=" text-black font-bold w-[200px]">Food Maker Name</p>
              <input type="text" name="food_maker_name" id="" defaultValue={user?.displayName} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>

            <div className="flex justify-center items-center w-full">
              <p className=" text-black font-bold w-[200px]">Food Maker Email</p>
              <input type="text" name="food_maker_email" id="" defaultValue={user?.email} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>

            <div className="flex justify-center items-center w-full">
              <p className=" text-black font-bold w-[200px]">Food Origin(Country)</p>
              <input type="text" name="food_origin" id="" placeholder="Food Origin(Country)" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>


            <div className="flex justify-center items-center w-full">
              <p className=" text-black font-bold w-[200px]">Food Price</p>
              <input type="number" step="0.01" name="food_price" id="" required placeholder="Food Price" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>

            <div className="flex justify-center items-center w-full">
              <p className=" text-black font-bold w-[200px]">Food Description</p>
              <input type="text" name="food_description" id="" required placeholder="Food Description" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
            </div>

            <br />
          </div>
          <button className=" bg-yellow-600 hover:bg-yellow-800 m-3 w-3/4 p-3 text-white font-bold border rounded-lg" type="submit">Add Food</button>
        </form>
      </div>

    </div>
  );
};

export default Dashboard;