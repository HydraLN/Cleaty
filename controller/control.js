import { getsupabase, adminsupabase } from '../lib/supabase.js';
import { createClient } from '@supabase/supabase-js';

const supabaselogin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON
    )


const prod = process.env.NODE_ENV === `production`;

export const postlogin = async (req, res, next) => {
    const { id, pass } = req.body

    const email = `${id}@clubwarp.top`
    
    const { data, error } = await supabaselogin.auth.signInWithPassword({email, password: pass})

    if (error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(200).json({
      msg: "Logged in",
      token: data.session.access_token
      });
    }

}

export const getprofile = async (req, res, next) => {
  const supabase = getsupabase(req.supabasetoken)

    const { data: profile, error:errprof } = await supabase
    .from('profiles')
    .select('admin_name, role')
    .eq('uuid', (await supabase.auth.getUser()).data.user.id)
    .single();

    if (errprof) {
      return res.status(403).json({ error: errprof.message })
    }

    const { data: memberlist, error: errmem } = await supabase
    .from('authuser')
    .select('name')

    if(errmem) {
      return res.status(403).json({ error: errmem.message })
    }

    if (profile.role && profile.admin_name) res.status(200).json({
        profile:
        `<div id="profile" class="mb-16 flex items-center space-x-4 bg-white border border-gray-200 rounded-xl p-2 shadow-md">
                            <div>
                                <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="User Icon" class="w-16 h-16 rounded-full bg-gray-200 p-1">
                            </div>
                <div class="text-left">
                    <h3 class="font-semibold text-lg text-gray-800">${profile.admin_name}</h3>
                        <p class="text-gray-600">Koordinator Piket - ${profile.role}</p>
                </div>
        </div>`,
        tugas:
        `<div class="bg-gray-100 rounded-xl shadow-sm flex items-stretch group overflow-hidden active:scale-95 active:shadow-inner transition-transform duration-150">
            <div class="rounded-l-xl w-2 bg-blue-500 transition-all origin-left duration-500 ease-in-out group-hover:scale-x-0"></div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-700 mb-2 delay-50 duration-500 ease-in-out group-hover:-translate-y-1 group-hover:text-blue-600 group-hover:-translate-x-1">Tugas</h3>
                        <p class="text-gray-600 transition-transform delay-50 duration-500 group-hover:-translate-x-1">Daftar siswa yang piket hari ini akan muncul di sini.</p>
            </div>
        </div>`,
        tugascontent: `
    <div class="gap-6 flex flex-col"> 
      <table class="w-full text-center border-collapse border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border border-gray-300">Nama</th>
            <th class="p-2 border border-gray-300">Sapu</th>
            <th class="p-2 border border-gray-300">Pel</th>
            <th class="p-2 border border-gray-300">Buang Sampah</th>
            <th class="p-2 border border-gray-300">Cek Meja</th>
            <th class="p-2 border border-gray-300">Lap Kaca</th>
          </tr>
        </thead>
        <tbody id="table">
          ${memberlist.map(nam => `
            <tr>
              <td class="p-2 border border-gray-300 font-medium">${nam.name}</td>
              ${Array(5).fill(`
                <td class="p-2 border border-gray-300">
                  <input type="checkbox" data-name="${nam.name}" class="w-5 h-5 accent-blue-500 cursor-pointer">
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="flex justify-end">
        <button id="submittugas" class="bg-blue-600 size-fit hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-sm shadow-md transition-all duration-200 active:scale-95">
          Submit
        </button>
      </div>
    </div>`,  
        authbutton: [
            {text: `Log Out`, id: `logout`}
        ], canupload: {roleicon: Boolean(profile.role),
          roleitself: profile.role
        }
        })
}


//this shit do nothing lol
export const logout = async (req, res, next) => {

  const supabase = getsupabase(req.supabasetoken)

  const { error } = await supabase.auth.signOut()

  if(error) return res.status(500).json({ message: error })

    res.status(200).json({ message: 'Logout berhasil' })
}

export const tugaspost = async (req, res, next) => {
  const supabase = getsupabase(req.supabasetoken)

  const { items } = req.body; 

  const zero = items.filter(i => i.count === 0).map(i => i.name);
  const finalstatus = zero.length === 0 ? "green" : "yellow";


  const { data: { user }, error } = await supabase.auth.getUser()

if(error || !user) return res.status(500).json({ message: error.message })

  await supabase
    .from('report')
    .insert([{
      admin_id: user.id,
      status: finalstatus,
      missing: zero,
    }]);

  res.json({ status: finalstatus, missing: zero });
}

export const getreport = async(req, res, next) => {
  const { data, error } =  await supabaselogin
  .from('report')
  .select('status, created_at, missing')

  if (error) return res.status(500).json({ message: error.message })

    res.status(200).json(data)
}

export const getalbum = async (req, res, next) => {
  const { data, error } = await supabaselogin
  .from('gallery_items')
  .select('role, path, created_at')

  if (error) {
    return res.status(500).json({ message: error.message })
  }

  const albums = {}



  for (const row of data) {
    const { data: urlData } = await supabaselogin
      .storage
      .from('public_gallery')
      .getPublicUrl(row.path)

    if (!albums[row.role]) {
      albums[row.role] = {
        role: row.role,
        title: row.role.charAt(0).toUpperCase() + row.role.slice(1),
        images: []
      }
    }

    albums[row.role].images.push({
      url: urlData.publicUrl,
      created_at: row.created_at
    })
  }

    const ORDER = ['senin', 'selasa', 'rabu', 'kamis', 'jumat']

const sortedalbums = Object.values(albums).sort(
  (a, b) => ORDER.indexOf(a.role) - ORDER.indexOf(b.role)
)
  res.json(sortedalbums)
}


export const albumrole = async (req,res,next) => {
  const supabase = getsupabase(req.supabasetoken)
  const admin = adminsupabase()
  const file = req.file
  const { role } = req.body

  console.log(file, role)

  if(!file || !role) return res.status(400).json({ error:`file or role is undefined` })

  const { data: { user }, error: errorsupa} = await supabase.auth.getUser();

  if(errorsupa || !user) return res.status(401).json({ error: "error" })

    const { data: profilealbum } = await supabase
    .from("profiles")
    .select("role")
    .eq("uuid", user.id)
    .single();

  if (!profilealbum || profilealbum.role.toLowerCase() !== role.toLowerCase()) return res.status(403).json({ error: 'whatever happens' });
  
 
  const filename = `${Date.now()}-${file.originalname}`;
  const path = `${role.toLowerCase()}/${filename}`;

  const { error: uploaderror } = await admin
  .storage
    .from("public_gallery")
    .upload(path, file.buffer, {
      contentType: file.mimetype,
      upsert: false
  });

  if(uploaderror) return res.status(500).json({ error: uploaderror })
  
  const { data: album } = await supabase
    .from("albums")
    .select("id")
    .eq("role", role.toLowerCase())
    .single();

    if(!album) return res.status(500).json({ error: "not found" })

  const { error: inserterror } = await admin
    .from("gallery_items")
    .insert({
      album_id: album.id,
      role,
      path,
      uploaded_by: user.id
    });

  if (inserterror) return res.status(500).json({ error: inserterror.message });
  

  const { data: urldata } = supabase
  .storage
  .from("public_gallery")
  .getPublicUrl(path);

  res.status(200).json({
    url: urldata.publicUrl,
    created_at: new Date().toISOString()
  });
};
