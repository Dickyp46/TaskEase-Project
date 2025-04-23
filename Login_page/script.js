document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
  
    if (!email || !password) {
      alert("Email dan password wajib diisi.");
      return;
    }
  
    // Simulasi login (bisa dihubungkan ke backend nanti)
    alert(`Login berhasil!\nEmail: ${email}`);
  });
  