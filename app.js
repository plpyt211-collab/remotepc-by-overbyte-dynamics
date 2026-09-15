import { createClient } from
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://DEIN-PROJEKT.supabase.co";
const supabaseAnonKey = "DEIN_PUBLIC_ANON_KEY";

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

const form = document.querySelector("#loginForm");
const message = document.querySelector("#message");
const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector("#togglePassword");

togglePassword?.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";

  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "◉" : "○";
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = passwordInput.value;
  const button = form.querySelector("button[type='submit']");

  button.disabled = true;
  button.querySelector("span").textContent = "Anmeldung läuft …";
  message.textContent = "";

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    message.textContent = "E-Mail oder Passwort ist nicht korrekt.";
    button.disabled = false;
    button.querySelector("span").textContent = "Anmelden";
    return;
  }

  window.location.href = "dashboard.html";
});
