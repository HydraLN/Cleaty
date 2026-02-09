

//wait for custom event albumcliked

window.addEventListener("albumclicked", function(){

    const koor = JSON.parse(sessionStorage.getItem("logged"));

//checking the dom elem created at popupjs every 10ms
//and if its still null skip but it already exist clear the interval

const checking = setInterval(() => {
    console.log("still waiting…")

    const galeripop = document.getElementById("divgalery");
    const galericontentpop = document.getElementById("content-galeri");
    const imagepop = document.getElementById("imagediv")

    if(galeripop && galericontentpop && imagepop) {
        clearInterval(checking);

        const albumkey = sessionStorage.getItem("clickedalbum");

        //makes the upload button matching with the day tasked

        if(albumkey === koor.day) {
            const uploadslot = document.createElement("div");
        uploadslot.className = "m-4 flex justify-center items-center";
        uploadslot.innerHTML = `
        <div class="p-3 pb-6 px-6 border border-gray-200 rounded-sm">
        <label for="upload-image" class="cursor-pointer text-6xl font-bold text-gray-500 hover:text-gray-700 transition">+</label>
        <input type="file" accept="image/*" id="upload-image" class="hidden" />
          </div>
        `;
        galeripop.querySelector(".bg-white").insertBefore(uploadslot, galericontentpop);

        // upload img stuff

        const inputimg = document.getElementById("upload-image")

        inputimg.addEventListener("change", function (event){
            const reader = new FileReader();
            const fileimg = event.target.files[0];
            
            console.log(fileimg)
            reader.onload = e => {
                window.dispatchEvent(new CustomEvent("newimg", 
                    
                    {detail: {imgsrc: e.target.result}}));
            };
            reader.readAsDataURL(fileimg);
            sessionStorage.setItem("fileimg", albumkey);
            
        })
        
      
        }
    }
}, 10);

})

