import { useEffect, useState } from "react";
import { fetchReservations, confirmReservation, cancelReservation } from '../api/reservationsApi';
import { useQuery } from "@tanstack/react-query";

export default function Reservations() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

   
    const { data: reservations, isLoading, error } = useQuery({
        queryKey: ['reservations', token],
        queryFn: () => fetchReservations(token),
        enabled: !!token,
    });

 const handleConfirmClick = async (reservationId) => {
    if (!token) {
        console.error('No token available');
        return;
    }

    try {
        await confirmReservation({ reservationId, token });
        alert(`Reservation ${reservationId} confirmed`);
        window.location.reload();  
    } catch (error) {
        console.error('Confirmation failed:', error);
    }
};


const handleCancelClick = async (reservationId) => {
    try {
        await cancelReservation({ reservationId, token });
        alert(`Reservation ${reservationId} canceled`);
        window.location.reload();
    } catch (error) {
        console.error("Cancellation failed:", error);
    }
};


    if (isLoading) {
        return <div>Loading . . .</div>;
    }

    // Ensure that `reservations` is defined and an array
    if (!reservations || reservations.length === 0) {
        return <div>No reservations available.</div>;
    }

    if (error) {
        return <h1>{error.message}</h1>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Reservations</h2>
            <div className="grid grid-cols-12 gap-6">
                {reservations.map((reservation, index) => (
                    <div key={index} className={`max-w-sm rounded-sm overflow-hidden shadow-lg bg-slate-50 border-3 ${(reservation.confirmed) ? 'border-green-600' : 'border-red-700'} col-span-4 p-4`}>
                        <div
                            className="h-64 bg-cover hover:bg-gray"
                            style={{ backgroundImage: `url(http://localhost:3000/uploads/${reservation.session.movie.posterImage})` }}
                        ></div>
                        <div className="mx-6 my-4 border-b border-gray-light">
                            <div className="font-medium text-base text-gray-darker mb-4">
                                {reservation.session.room.name} - {new Date(reservation.session.dateTime).toLocaleString()}
                            </div>
                        </div>
                        {!reservation.confirmed ? (
                            <div className="mx-6 my-4 flex justify-between items-center">
                                <span
                                    className="bg-green-500 rounded-full p-2 flex items-center space-x-2 cursor-pointer"
                                    onClick={() => handleConfirmClick(reservation._id)}
                                >
                                    <svg fill="white" width="16" height="16" viewBox="0 0 24 24">
                                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                                    </svg>
                                    <span className="text-white">Confirm</span>
                                </span>
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
                        ) : (
                            <span className="text-green-600 text-2xl font-bold">Reservation confirmed</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
