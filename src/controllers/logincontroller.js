import { saveSession } from "../utils.js";
import { navigateTo } from "../router/router.js";
import { http } from "../api/http.js";

export const loginController = () => {
  const form = document.querySelector("#loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const users = await http.get(
        `/users?email=${email}&password=${password}`,
      );

      if (!users.length) {
        alert("Credenciales incorrectas");
        return;
      }

      saveSession({
        id: users[0].id,
        name: users[0].name,
        role: users[0].role,
      });

      navigateTo("/home");
    } catch (error) {
      console.error(error);
      alert("Error conectando con la API");
    }
  });
};
