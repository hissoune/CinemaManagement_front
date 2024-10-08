import { useEffect, useState } from "react";
import { fetchReservations, confirmReservation, cancelReservation } from '../api/reservationsApi';
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";

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
        return <div><Loading /></div>;
    }

    if (!reservations || reservations.length === 0) {
        return <div className="text-center text-xl font-semibold text-gray-300">No reservations available.</div>;
    }

    if (error) {
        return <h1 className="text-red-500">{error.message}</h1>;
    }

    return (
        <div className="container mx-auto p-6 bg-gray-900">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Your Reservations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reservations.map((reservation, index) => (
                    <div key={index} className={`max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 ${(reservation.confirmed) ? 'border border-green-600' : 'border border-red-700'} bg-gray-800 p-4`}>
                        <div
                            className="h-64 bg-cover rounded-lg"
                            style={{ backgroundImage: `url(http://localhost:3000/uploads/${reservation.session.movie.posterImage})` }}
                        ></div>
                        <div className="mx-6 my-4 border-b border-gray-600 pb-2">
                            <div className="font-medium text-lg text-gray-300 mb-1">
                                {reservation.session.room.name} - {new Date(reservation.session.dateTime).toLocaleString()}
                            </div>
                        </div>
                        {!reservation.confirmed ? (
                            <div className="mx-6 my-4 flex justify-between items-center">
                                <span
                                    className="bg-green-600 rounded-full p-2 flex items-center space-x-2 cursor-pointer hover:bg-green-700 transition-colors duration-300"
                                    onClick={() => handleConfirmClick(reservation._id)}
                                >
                                    <svg fill="white" width="16" height="16" viewBox="0 0 24 24">
                                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                                    </svg>
                                    <span className="text-white">Confirm</span>
                                </span>
                                <span
                                    className="bg-red-600 rounded-full p-2 flex items-center space-x-2 cursor-pointer hover:bg-red-700 transition-colors duration-300"
                                    onClick={() => handleCancelClick(reservation._id)}
                                >
                                    <svg fill="white" width="16" height="16" viewBox="0 0 24 24">
                                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
                                    </svg>
                                    <span className="text-white">Cancel</span>
                                </span>
                            </div>
                        ) : (
                            <span className="text-green-500 text-lg font-bold">Reservation confirmed</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
