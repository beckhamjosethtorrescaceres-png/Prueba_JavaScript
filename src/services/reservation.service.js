import { http } from "@/api/http";

export const getReservation = () => http.get("/reservations");
export const createReservation = (data) => http.post("/reservations", data);

// NUEVA: Actualizar reserva completa (usada para Editar)
export const updateReservation = (id, data) =>
  http.put(`/reservations/${id}`, data);

// NUEVA: Eliminar reserva
export const deleteReservationById = (id) =>
  http.delete(`/reservations/${id}`);

// (Opcional) Si solo quieres actualizar el estado sin tocar lo demás
export const updateReservationStatus = (id, status) =>
  http.patch(`/reservations/${id}`, { status });   