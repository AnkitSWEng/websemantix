document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact form");
  const thankYouSection = document.querySelector("#thankyou");
  const progressBar = document.querySelector("#hero progress");
  const requiredInputs = form.querySelectorAll("[required]");

  // Hide thank-you initially
  thankYouSection.style.display = "none";

  // Form submit handler
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent reload

    if (form.checkValidity()) {
      const today = new Date().toLocaleDateString();
      thankYouSection.querySelector("time").textContent = today;
      thankYouSection.style.display = "block";
      form.reset();
    }
  });

  // Live progress tracking
  form.addEventListener("input", () => {
    const filled = Array.from(requiredInputs).filter(input => input.value.trim() !== "").length;
    const percentage = Math.round((filled / requiredInputs.length) * 100);
    progressBar.value = percentage;
  });

  // Toggle article content
  document.querySelectorAll("#articles h4").forEach(heading => {
    heading.style.cursor = "pointer";
    heading.addEventListener("click", () => {
      const p = heading.nextElementSibling;
      if (p.style.display === "none") {
        p.style.display = "block";
      } else {
        p.style.display = "none";
      }
    });
  });
});


fetch("/api/visitors")
  .then(res => res.json())
  .then(data => {
    document.getElementById("visitorCount").textContent = data.count;
  })
  .catch(err => console.error("Error fetching visitor count", err));


  document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    country: document.getElementById("country").value,
    subscribe: document.querySelector('input[name="subscribe"]').checked
  };

  const res = await fetch("/api/formsubmit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const data = await res.json();
  document.getElementById("statusMsg").textContent = res.ok
    ? "✅ Form submitted for review."
    : `❌ ${data.error}`;
});
 