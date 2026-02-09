window.addEventListener("tugas", async (event) => {
  const token = localStorage.getItem("token")
  const { items } = event.detail;

  try {
    const response = await fetch('http://localhost:8001/api/tugas', {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'},
      body: JSON.stringify({ items })
    });

    const result = await response.json();

    if(!result) return console.log(`${result} undefied`)

  } catch (error) {
    console.error("Failed to sync with backend:", error);
  }
});

