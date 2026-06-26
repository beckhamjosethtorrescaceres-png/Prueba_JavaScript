import Sidebar from "../components/Sidebar.js";
import { getSession } from "../utils.js";
import { homeController } from "../controllers/homecontroller.js";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p bg-slate-100 min-h-screen">

        <div class="">

          <h1 class="text-sm font-bold">
            Bienvenido ${user?.name}
          </h1>

          <p class="text-orange-900">
            Rol: ${user?.role}
          </p>

        </div>

        ${
          user?.role === "admin"
            ? `
              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Administrador
                </h2>

                <p>
                  Puedes visualizar todas las reservas.
                </p>

              </section>
            `
            : `
              <section
                class="bg-white p-5"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Usuario
                </h2>

                <p>
                  Puedes visualizar únicamente tus reservas.
                </p>

                <button id = "reservar"
                  class="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Nueva Reserva
                </button>

              </section>
            `
        }

        <section
          class="bg-white p-5 rounded-lg shadow"
        >
      <div id="miModal" class="modal-overlay">
        <section class="modal-content">
          <h2>Agregar reserva</h2>


          <label for="inputFecha">Fecha</label>
          <input id="inputFecha" class="input-add" type="date">

        <label for="lugar">Lugar</label>
        <select id="lugar" class="input-add">
          <option value="" disabled selected>Selecciona un espacio...</option>
          <option value="Oficinas privadas">Oficinas privadas</option>
          <option value="Salas de reuniones">Salas de reuniones</option>
          <option value="Espacios de coworking">Espacios de coworking</option>
          <option value="Auditorios">Auditorios</option>
        </select>

        <label for="inputDescripcion">Descripción</label>
        <input id="inputDescripcion" class="input-add" type="text">
        <!-- Agrega esto después del input de Descripción -->
        <label for="inputHoraInicio">Hora Inicio</label>
        <input id="inputHoraInicio" class="input-add" type="time" required>

        <label for="inputHoraFin">Hora Fin</label>
        <input id="inputHoraFin" class="input-add" type="time" required>    


        <button class="btnCerrar" id="btnCerrar">Cerrar</button>
        <button class="btnCerrar" id="btnEnviar">Send</button>
      </section>
    </div>

          <div
            class="flex justify-between items-center mb-4"
          >
            <h2 class="font-bold text-xl">
              Reservas
            </h2>

            <span
              class="text-sm text-slate-500"
            >
              ${
                user?.role === "admin"
                  ? "Mostrando todas las reservas"
                  : "Mostrando únicamente tus reservas"
              }
            </span>
          </div>

          <div
            id="reservationsContainer"
            class="grid gap-4 md:grid-cols-2"
          >
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">
                Cargando reservas ...
              </p>
            </div>
          </div>

        </section>

      </main>

    </div>
    
  `;
}
