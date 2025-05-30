// logout.js
document.getElementById("logoutBtn").addEventListener("click", async (e) => {
  // Prevent the default button behavior
  e.preventDefault();

  try {
    const response = await fetch("api/logout.php", {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (result.status === "success") {
      // Redirect to login page after successful logout
      window.location.href = "index.html";
    } else {
      console.error("Logout failed");
      alert("Logout fehlgeschlagen. Bitte nochmals versuchen.");
    }
  } catch (error) {
    console.error("Logout error:", error);
    alert("Etwas ist beim Ausloggen schiefgelaufen!");
  }
});
