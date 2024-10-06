import { useContext } from "react";
import { ReservationContext } from "../context/ReservationContext";

export default function Reservations() {
    const { reservations, reservLoading } = useContext(ReservationContext);

    const handleConfirmClick = (reservationId) => {
        alert(`Reservation ${reservationId} confirmed`);
        // You can add logic here to handle the confirmation process (e.g., update reservation status in the backend).
    };

    const handleCancelClick = (reservationId) => {
        alert(`Reservation ${reservationId} canceled`);
        // You can add logic here to handle the cancellation process (e.g., update reservation status in the backend).
    };

    if (reservLoading) {
        return <div>Loading . . .</div>;
    }

    if (reservations.length === 0) {
        return <div>No reservations available.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Reservations</h2>
            <div className="grid grid-cols-12 gap-6">
                {reservations.map((reservation, index) => (
                    <div key={index} className={`max-w-sm rounded-sm overflow-hidden shadow-lg bg-slate-50 border-3 ${(reservation.confirmed)?'border-green-600':'border-red-700'} col-span-4 p-4`}>
                        <div
                            className="h-64 bg-cover hover:bg-gray"
                            style={{ backgroundImage: `url(http://localhost:3000/uploads/${reservation.session.movie.posterImage})` }}
                        ></div>
                        <div className="mx-6 my-4 border-b border-gray-light">
                            <div className="font-medium text-base text-gray-darker mb-4">
                                {reservation.session.room.name} - {new Date(reservation.session.dateTime).toLocaleString()}
                            </div>
                        </div>
                        <div className="mx-6 my-4 flex justify-between items-center">
                            {/* Confirm Button */}
                            <span 
                                className="bg-green-500 rounded-full p-2 flex items-center space-x-2 cursor-pointer"
                                onClick={() => handleConfirmClick(reservation._id)}
                            >
                                <svg fill="white" width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                                </svg>
                                <span className="text-white">Confirm</span>
                            </span>
                            {/* Cancel Button */}
                            <span 
                                className="bg-red-500 rounded-full p-2 flex items-center space-x-2 cursor-pointer"
                                onClick={() => handleCancelClick(reservation._id)}
                            >
                                <svg fill="white" width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                                </svg>
                                <span className="text-white mx-1">Cancel</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
