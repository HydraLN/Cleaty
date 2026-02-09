import { settugas, setdokum } from './shared.js';
import './input.css';
import { REALTIME_CHANNEL_STATES } from '@supabase/supabase-js';

window.addEventListener("DOMContentLoaded", async () => {
  await koordinator()
  });
  
  const loginbtn = document.getElementById("login") || document.getElementById("logout");
  


  const koordinator = async () => {
    const token = localStorage.getItem("token")

    try {
      const res = await fetch('http://localhost:8001/api/auth', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
      const text = await res.json()

      settugas(text.tugascontent)
      setdokum(text.canupload)

        const containerpro = document.getElementById("containerprofile");
        const containertug = document.getElementById("tugas");

      containerpro.innerHTML = text.profile
      containertug.innerHTML = text.tugas
      loginbtn.innerText = text.authbutton[0].text
      loginbtn.id= text.authbutton[0].id
      }

    } catch (err) {
      console.error(err)
    }

  }

const del = async () => {
  const token = localStorage.getItem("token")
    const res = await fetch ("http://localhost:8001/api/logout", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    try {
      const result = await res.json()
  if(res.ok) {
    localStorage.removeItem("token")
    window.location.reload()
  }

  } catch (err) {
    console.error(err)
  };

}  

loginbtn.addEventListener("click", (e) => {
  if(e.target.id === 'login') return window.location.href = "/nested/login.html";


  if(e.target.id === 'logout') {
    del()
}
})












