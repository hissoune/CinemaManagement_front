import  { useContext, useState } from 'react';
import { ReservationContext } from '../context/ReservationContext';

// eslint-disable-next-line react/prop-types
function RoomSeats({ seats, session }) {
  const [selectedSeatIndex, setSelectedSeatIndex] = useState(null); 
     const {createReservation} = useContext(ReservationContext)
  const handleSeatClick = (index) => {
    // eslint-disable-next-line react/prop-types
    if (seats[index].available) { 
      setSelectedSeatIndex(index);
      }
    
    };
    const handleReserveClick = () => {
        try {
              createReservation({ seats: selectedSeatIndex, session: session._id })
            alert('reservation done !!!');
            window.location.reload();
        } catch (error) {
            alert(error)
        }
      }
    

  return (
      <div>
          <h2 className="text-2xl font-bold mb-4 text-center">{ session.room.name}</h2>
      <h3 className="text-xl font-bold">At : {new Date(session.dateTime).toLocaleString()}</h3>
      <div className="grid grid-cols-5 gap-4 my-4">
        {seats.map((seat, index) => (
          <div
            key={index}
            className={`border rounded-lg p-2 flex items-center justify-center cursor-pointer 
              ${seat.available 
                ? selectedSeatIndex === index 
                  ? 'bg-green-500' 
                  : 'bg-gray-200 hover:bg-green-300' 
                : 'bg-red-500 cursor-not-allowed'}`}
            onClick={() => handleSeatClick(index)}
          >
            <img src="../public/icons8-seat-50.png" alt="seat image" />
          </div>
        ))}
          </div>
          <div>
                  <button 
                      className="min-w-32 w-full rounded-md bg-white py-2 px-4 border border-transparent text-center text-sm text-slate-600 transition-all shadow-md hover:shadow-lg focus:bg-white/90 focus:shadow-none active:bg-white/90 hover:bg-white/90 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
                      type="button"
                      onClick={ handleReserveClick} 
                    >
                      Reserve Now
                    </button>
          </div>
    </div>
  );
}

export default RoomSeats;
