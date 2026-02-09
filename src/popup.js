import { waitreport, waittugas, clearreport, setreport, getdokum } from "./shared.js";
const tugas = document.getElementById("tugas");
const dokumentasi = document.getElementById("dokumentasi") 
const laporan = document.getElementById("laporan") 

const URL = process.env.PUBLIC_SERVER

window.addEventListener("content", () => {
  content.tugascontent = store.data
})

  const content = {tugascontent: null,

galericontent: `
<div class="flex flex-col gap-6 max-h-[70vh] py-16">

  <div id="albumsenin" class="album text-left">
    <h3 class="text-2xl font-semibold text-gray-700 mb-2">Senin</h3>
    <div class="aspect-4/3 w-full max-w-md">
      <img src="/img/Tak berjudul89_20251022173333.png" class="w-full h-full object-cover rounded-lg shadow-md" />
      
    </div>
  </div>

  <div id="albumselasa" class="album text-left">
    <h3 class="text-2xl font-semibold text-gray-700 mb-2">Selasa</h3>
    <div class="aspect-4/3 w-full max-w-md">
      <img src="/img/Tak berjudul89_20251022173333.png" class="w-full h-full object-cover rounded-lg shadow-md" />
  
    </div>
  </div>

  <div id="albumrabu" class="album text-left">
    <h3 class="text-2xl font-semibold text-gray-700 mb-2">Rabu</h3>
    <div class="aspect-4/3 w-full max-w-md">
      <img src="/img/Tak berjudul89_20251022173333.png" class="w-full h-full object-cover rounded-lg shadow-md" />
   
    </div>
  </div>

  <div id="albumkamis" class="album text-left">
    <h3 class="text-2xl font-semibold text-gray-700 mb-2">Kamis</h3>
    <div class="aspect-4/3 w-full max-w-md">
      <img src="/img/Tak berjudul89_20251022173333.png" class="w-full h-full object-cover rounded-lg shadow-md" />
    
    </div>
  </div>

  <div id="albumjumat" class="album text-left">
    <h3 class="text-2xl font-semibold text-gray-700 mb-2">Jumat</h3>
    <div class="aspect-4/3 w-full max-w-md">
      <img src="/img/Tak berjudul89_20251022173333.png" class="w-full h-full object-cover rounded-lg shadow-md" />
    </div>
  </div>
</div>
`,

laporancontent: `<div class="space-y-4 p-4">

<div class="flex flex-row">
<!-- Green check — use classes to control size/color -->
    <div class="flex bg-green-100 items-center justify-center p-2">
<svg role="img" aria-label="success" class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.00002 16.2L4.80002 12L3.40002 13.4L9.00002 19L21 7L19.6 5.6L9.00002 16.2Z"/>
</svg>
</div>
  
  <div class="flex items-center bg-white text-green-800 rounded-sm p-3 shadow-md w-full rounded-l-none">
    <p class="font-medium">18/11/2025 Piket telah dilaksanakan</p>
  </div>
</div>

  <div class="flex flex-row">
  <div class="flex bg-yellow-100 items-center justify-center p-3">
    <svg role="img" aria-label="bullet" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6"/>
</svg>
</div>

<div class="flex items-center bg-white text-yellow-800 rounded-sm p-3 shadow-md w-full rounded-l-none">
    <p class="font-medium">18/11/2025 Tidak semuanya hadir</p>
    </div>
  </div>
 
  <div class="flex flex-row">
  <div class="flex bg-red-100 items-center justify-center p-2">
    <svg role="img" aria-label="error" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <line x1="18" y1="6" x2="6" y2="18"/>
  <line x1="6" y1="6" x2="18" y2="18"/>
</svg>
</div>

<div class="flex items-center bg-white text-red-800 rounded-sm p-3 shadow-md w-full rounded-l-none">
    <p class="font-medium">10/11/2025 Koor tidak mengisi laporan</p>
  </div>
</div>
</div>
`} 

const showpopup = (title, options = {}) => {
  const {
    maxwidth = 'max-w-xl',
    maxheight = 'max-h-[80vh]'
  } = options

  document.body.style.overflow = 'hidden'

  const popup = document.createElement('div')
  popup.id = 'popupcont'
  popup.className =
    'fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[999] pointer-events-auto'

  popup.innerHTML = `
    <div class="bg-white p-8 rounded-xl shadow-xl ${maxwidth} w-[90%] relative ${maxheight} overflow-y-auto">
      <button class="close-popup absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold">&times;</button>
      <h2 class="text-2xl font-bold text-gray-700 mb-4">${title}</h2>
      <div id=content class="flex-1"></div>
    </div>
  `
 
  document.body.appendChild(popup)
  const closebtn = popup.querySelector(".close-popup")

  closebtn.addEventListener("click", () => {
      popup.remove();
      document.body.style.overflow = 'auto'
  });
  const content = popup.querySelector('#content')
  return {content, closebtn, popupid: popup}
}


const openalbumpopup = (album) => {
  const popup = showpopup(album.title,
    {
      maxwidth: 'max-w-6xl',
      maxheight: 'max-h-[90vh]'
    }
  );

  const dokumrole = getdokum()
  
  const canupload =
    dokumrole &&
    dokumrole.roleicon === true &&
    dokumrole.roleitself.toLowerCase() === album.role.toLowerCase();

  popup.content.innerHTML = `
      ${
        canupload
          ? `
          <div class="flex">
              <button id="upload-btn" class="items-center justify-center p-4 rounded-md hover:bg-gray-100">
               <img src="/icons/upload-svgrepo-com.svg" class="w-12 h-12" />
              </button> 
              <input
                type="file"
                id="file-input"
                accept="image/*"
                class="hidden"
              />
          </div>`
          : ""
      }


    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${album.images.map(img => `
        <div class="relative group">
          <img
            src="${img.url}"
            class="w-full object-contain rounded-lg shadow-md"
          />
           <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end">
      <span class="text-white text-sm p-2">
        ${new Date(img.created_at).toLocaleString()}
      </span>
    </div>
        </div>
      `).join("")}
    </div>
  `;
  
  if (canupload) {
  const uploadbtn = popup.content.querySelector("#upload-btn");
  const fileinput = popup.content.querySelector("#file-input");

  uploadbtn.onclick = () => {
    fileinput.click();
  };

  fileinput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

  const token = localStorage.getItem("token");
  const formdata = new FormData();
  formdata.append("image", file);
  formdata.append("role", album.role);

    console.log(file);

    for (const [key, value] of formdata.entries()) {
  console.log(key, value);
}
    
    const res = await fetch(`${URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formdata
      }
    )

    const newimage = await res.json();

    if(!newimage) {
      return console.error("shine on")
    }

    const grid = popup.content.querySelector(".grid");

  grid.insertAdjacentHTML(
    "afterbegin",
    `<div class="relative group">
    <img src="${newimage.url}" class="w-full object-contain rounded-lg shadow-md" />
    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end">
      <span class="text-white text-sm p-2">
        ${new Date(newimage.created_at).toLocaleString()}
      </span>
    </div>
  </div>`
      )
    };
  }

}
    

    
const renderalbumcovers = (container, albums) => {
  container.innerHTML = `
    <div class="flex flex-col gap-6 py-4">
      ${albums.map(album => `
        <div
          class="album cursor-pointer"
          data-role="${album.role}"
        >
          <h3 class="text-2xl font-semibold text-gray-700 mb-2">
            ${album.title}
          </h3>

          <div class="aspect-4/3 w-full max-w-md">
            <img
              src="${album.images[0]?.url ?? ""}"
              class="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      `).join("")}
    </div>
  `;

  container.querySelectorAll(".album").forEach(el => {
    el.onclick = () => {
      const role = el.dataset.role;
      const album = albums.find(a => a.role === role);
      openalbumpopup(album);
    };
  });
}


const renderreportrow = ({ status, created_at, missing }) => {
  
  const map = {
    green: {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: `
        <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6Z"/>
        </svg>
      `,
      message: "Piket telah dilaksanakan"
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      icon: `
        <svg class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="6"/>
        </svg>
      `,
      message: "Tidak semuanya hadir"
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-800",
      icon: `
        <svg class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      `,
      message: "Koor tidak mengisi laporan"
    }
  }

  const ismissing = status === "yellow" && Array.isArray(missing)
   ? `<span class="ml-2 text-sm text-yellow-700">
         Murid yang tidak piket: ${missing.join(", ")}
       </span>`
    : ""

  const cfg = map[status];

  const wrapper = document.createElement("div");
  wrapper.className = "flex w-full mb-3";

  wrapper.innerHTML = `
    <div class="items-center flex ${cfg.bg} justify-center p-2">
      ${cfg.icon}
    </div>
    <div class="flex flex-col bg-white ${cfg.text} p-3 shadow-md w-full rounded-l-none text-left">
      <p class="font-medium">
        ${new Date(created_at).toLocaleDateString()} ${cfg.message} 
      </p>
      <div>
      ${ismissing}
      </div>
    </div>
  `;

  return wrapper;
}

tugas.addEventListener("click", async() => { 
  const cont = showpopup("Tugas");
  const tugascontent = await waittugas()

  cont.content.innerHTML = tugascontent
document.getElementById("submittugas").addEventListener("click", () => {
  const rows = document.querySelectorAll("#table tr");

    const rowdata = Array.from(rows).map(row => ({
    name: row.querySelector("td").textContent.trim(),
    count: row.querySelectorAll("input:checked").length
  }));

   window.dispatchEvent(new CustomEvent("tugas", {detail: {items: rowdata}}))
  
    cont.popupid.remove();
    document.body.style.overflow = 'auto';
  })
})

dokumentasi.addEventListener("click", async () => {
  const container = showpopup("Galeri")
  try {
    const res = await fetch(`${URL}/api/album`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const result = await res.json()

  renderalbumcovers(container.content, result)
  
  } catch (error) {
    console.error(error)
  }
})

laporan.addEventListener("click", async () => {
      try {
        const res = await fetch(`${URL}/api/laporan`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    
    const result = await res.json()
    console.log(result)
    
    if(!result) return console.log('something in the way she moves...')
    
      setreport(result)
      
    
    } catch (err) {
        console.error(err)
    }
    const cont = showpopup("Laporan");
    const reportcontent = await waitreport()
    cont.content.innerHTML = ""

    const normalized = reportcontent.map(r => ({
  ...r,
  missing: typeof r.missing === "string"
    ? JSON.parse(r.missing)
    : r.missing
}));


    normalized.forEach(r => {
      cont.content.appendChild(renderreportrow(r))
    })
})

