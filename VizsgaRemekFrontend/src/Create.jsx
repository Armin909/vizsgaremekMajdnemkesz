import './App.css'
import RestaurantForm from './Components/RestaurantForm';


function Create() {

  return (
    <>
      <RestaurantForm restaurantId={window.location.pathname.split("/").slice(-1)[0]} />
    </>
  )
}

export default Create;