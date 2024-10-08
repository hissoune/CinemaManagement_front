import { useContext, useState } from 'react';
import { ReservationContext } from '../context/ReservationContext';


function RoomSeats({ seats, session }) {
  const [selectedSeatIndex, setSelectedSeatIndex] = useState(null);
  const { createReservation } = useContext(ReservationContext);

  const handleSeatClick = (index) => {
    if (seats[index].available) {
      setSelectedSeatIndex(index);
    }
  };

  const handleReserveClick = () => {
    try {
      createReservation({ seats: selectedSeatIndex + 1, session: session._id });
      alert('Reservation successful!');
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{session.room.name}</h2>
      <h3 className="text-lg text-center font-semibold text-gray-600 mb-4">At: {new Date(session.dateTime).toLocaleString()}</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-4">
        {seats.map((seat, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition duration-200 ease-in-out
              ${seat.available
                ? selectedSeatIndex === index
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 hover:bg-green-300'
                : 'bg-red-500 text-white cursor-not-allowed opacity-50'}`}
            onClick={() => handleSeatClick(index)}
          >
            <img src={'../public/icons8-seat-50.png'} alt="Seat" className="h-12 w-12 mb-2" />
            <span className="font-semibold">{`Seat ${index + 1}`}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className={`w-full max-w-xs py-2 px-4 rounded-lg font-semibold transition-all text-white bg-blue-500 shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none 
            ${selectedSeatIndex === null ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="button"
          onClick={handleReserveClick}
          disabled={selectedSeatIndex === null}
        >
          {selectedSeatIndex === null ? 'Select a Seat' : 'Reserve Now'}
        </button>
      </div>
    </div>
  );
}

export default RoomSeats;
