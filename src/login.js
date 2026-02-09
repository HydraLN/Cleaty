import './input.css';

document.addEventListener("DOMContentLoaded", function() {
   
const nameinput = document.getElementById("name-input");
const passinput = document.getElementById("pass-input");
const donebtn = document.getElementById("done-btn");
const closebtn = document.getElementById("close-btn");

closebtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/index.html";
})

const login = async (e) => {
    e.preventDefault();
     try {
        const res = await fetch('http://localhost:8001/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: nameinput.value,
                pass: passinput.value
            })
        });

       console.log(nameinput.value, passinput.value)
        const result = await res.json()

        if(res.ok) {
            localStorage.setItem("token", result.token)
                window.location.href = "/index.html";
        } 
        else {
            throw new Error(result.message)
        }
    
     } catch (err) {
        console.error(err)
     }

    }

donebtn.addEventListener("click", login)
})
