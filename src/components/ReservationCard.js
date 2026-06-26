export default function ReservationCard(reservation, userRole) {
  const { id, workspace, date, startHour, endHour, reason, status } = reservation;
  
  const showAdminActions = userRole === "admin";
  const isPending = status === "pendiente";

  // Clases dinámicas para el estado
  const statusColors = {
    'aprobada': 'text-green-700 bg-green-50 border-green-200',
    'rechazada': 'text-red-700 bg-red-50 border-red-200',
    'pendiente': 'text-yellow-700 bg-yellow-50 border-yellow-200'
  };
  
  const currentStatusClass = statusColors[status] || 'text-slate-600 bg-slate-50';

  return `
    <article class="bg-white rounded-lg shadow-md border border-slate-200 p-5 flex flex-col h-full relative overflow-hidden transition-shadow hover:shadow-lg">
      
      <!-- Encabezado -->
      <div class="flex justify-between items-start mb-3">
        <h3 class="font-bold text-lg text-slate-800 leading-tight">${workspace}</h3>
        <span class="text-xs font-semibold px-2 py-1 rounded-full border ${currentStatusClass}">
          ${status}
        </span>
      </div>
      
      <!-- Cuerpo de la información -->
      <div class="space-y-2 text-sm text-slate-600 flex-grow">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span>${date}</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>${startHour} - ${endHour}</span>
        </div>
        <div class="flex items-start gap-2 mt-2">
          <svg class="w-4 h-4 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <p class="italic text-slate-500 text-xs">"${reason}"</p>
        </div>
      </div>

      <!-- Separador -->
      <div class="mt-4 pt-3 border-t border-slate-100"></div>

      <!-- Botones de Acción -->
      <div class="mt-2 flex flex-wrap gap-2 justify-end">
        ${showAdminActions && isPending ? `
          <button onclick="window.updateStatus('${id}', 'aprobada')" class="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors shadow-sm">
            Aprobar
          </button>
          <button onclick="window.updateStatus('${id}', 'rechazada')" class="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors shadow-sm">
            Rechazar
          </button>
        ` : ''}
        
        ${showAdminActions ? `
          <button onclick="window.editReservation('${id}')" class="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors shadow-sm">
            Editar
          </button>
          <button onclick="window.deleteReservation('${id}')" class="px-3 py-1.5 bg-slate-700 text-white text-xs font-medium rounded hover:bg-slate-800 transition-colors shadow-sm">
            Eliminar
          </button>
        ` : ''}

        ${!showAdminActions && isPending ? `
          <button onclick="window.deleteReservation('${id}')" class="w-full px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition-colors shadow-sm">
            Cancelar reserva
          </button>
        ` : ''}
      </div>
    </article>
  `;
}   