import { createClient } from
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://DEIN-PROJEKT.supabase.co";
const supabaseAnonKey = "DEIN_PUBLIC_ANON_KEY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const form = document.querySelector("#loginForm");
const message = document.querySelector("#message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    message.textContent = "Anmeldung fehlgeschlagen.";
    return;
  }

  window.location.href = "dashboard.html";
});
