import ReservationCard from "../components/ReservationCard.js";
import { 
  getReservation, 
  createReservation, 
  updateReservation, // Importar nueva función
  deleteReservationById 
} from "../services/reservation.service.js";
import { getSession } from "../utils.js";

export const homeController = async () => {
  const container = document.querySelector("#reservationsContainer");
  const user = getSession();

  // Variables de estado para la edición
  let isEditing = false;
  let currentEditId = null;

  // 1. Cargar y renderizar
  try {
    const reservations = await getReservation();
    const filteredReservations = user.role === "admin"
      ? reservations
      : reservations.filter((res) => res.userId === user.id);

    container.innerHTML = filteredReservations?.length
      ? filteredReservations.map((res) => ReservationCard(res, user.role)).join("")
      : `<div class="w-full text-center py-8 col-span-2"><p class="text-slate-500">No hay reservas disponibles</p></div>`;
  } catch (error) {
    console.error("Error cargando reservas:", error);
    container.innerHTML = `<p class="text-red-500">Error al cargar datos</p>`;
  }

  // Referencias DOM
  const btnReservar = document.getElementById("reservar");
  const miModal = document.getElementById("miModal");
  const btnCerrar = document.getElementById("btnCerrar");
  const btnEnviar = document.getElementById("btnEnviar");
  
  // Inputs
  const inputNombre = document.getElementById("inputNombre");
  const inputFecha = document.getElementById("inputFecha");
  const inputLugar = document.getElementById("lugar");
  const inputDescripcion = document.getElementById("inputDescripcion");
  const inputHoraInicio = document.getElementById("inputHoraInicio");
  const inputHoraFin = document.getElementById("inputHoraFin");

  // Abrir Modal (Modo Crear)
  btnReservar?.addEventListener("click", (e) => {
    e.preventDefault();
    resetForm(); // Asegurar que el formulario esté limpio
    isEditing = false;
    currentEditId = null;
    btnEnviar.textContent = "Send"; // Texto original
    miModal?.classList.add("open");
  });

  // Cerrar Modal
  btnCerrar?.addEventListener("click", () => {
    miModal?.classList.remove("open");
  });

  //  Lógica del Botón Enviar (Crear O Actualizar)
  btnEnviar?.addEventListener("click", async () => {
    const workspace = inputLugar.value;
    const date = inputFecha.value;
    const startHour = inputHoraInicio.value;
    const endHour = inputHoraFin.value;
    const reason = inputDescripcion.value.trim();

    if (!workspace || !date || !startHour || !endHour || !reason) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const reservaData = {
      userId: user.id,
      workspace,
      date,
      startHour,
      endHour,
      reason,
      status: "pendiente" 
    };

    try {
      if (isEditing && currentEditId) {
        // --- MODO EDICIÓN ---
        await updateReservation(currentEditId, reservaData);
        alert("Reserva actualizada correctamente");
      } else {
        // --- MODO CREACIÓN ---
        await createReservation(reservaData);
        alert("Reserva creada con éxito");
      }

      resetForm();
      miModal.classList.remove("open");
      await homeController(); // Recargar lista
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al guardar los datos.");
    }
  });

  // 3. Funciones Globales para las Cards
  
  // Editar: Carga datos en el modal
  window.editReservation = async (id) => {
    try {
      const reservations = await getReservation();
      const reservaToEdit = reservations.find(r => r.id === id);

      if (!reservaToEdit) {
        alert("Reserva no encontrada");
        return;
      }

      // Rellenar inputs
      inputLugar.value = reservaToEdit.workspace;
      inputFecha.value = reservaToEdit.date;
      inputHoraInicio.value = reservaToEdit.startHour;
      inputHoraFin.value = reservaToEdit.endHour;
      inputDescripcion.value = reservaToEdit.reason;

      // Cambiar estado a "Edición"
      isEditing = true;
      currentEditId = id;
      btnEnviar.textContent = "Actualizar"; // Cambiar texto del botón

      miModal.classList.add("open");
    } catch (error) {
      console.error("Error cargando datos para editar:", error);
      alert("No se pudieron cargar los datos de la reserva");
    }
  };

  // Eliminar
  window.deleteReservation = async (id) => {
    if (!confirm("¿Eliminar esta reserva?")) return;
    try {
      await deleteReservationById(id);
      await homeController();
      alert("Reserva eliminada");
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  // Aprobar/Rechazar (Solo Admin)
  window.updateStatus = async (id, newStatus) => {
    if (!confirm(`¿Marcar como ${newStatus}?`)) return;
    try {
      // Asumiendo que tienes updateReservationStatus o usas updateReservation
      await updateReservation(id, { status: newStatus }); 
      await homeController();
      alert(`Estado actualizado a ${newStatus}`);
    } catch (error) {
      alert("Error actualizando estado");
    }
  };

  // Utilidad: Limpiar formulario
  function resetForm() {
    inputLugar.selectedIndex = 0;
    inputFecha.value = "";
    inputHoraInicio.value = "";
    inputHoraFin.value = "";
    inputDescripcion.value = "";
    if(inputNombre) inputNombre.value = "";
  }
};   