
let tugascontent 
let reportcontent
let profilestate = null

  export const settugas = (value) => tugascontent = value

  export const waittugas = async() => {
    while(!tugascontent) {
      await new Promise(resolve => setTimeout(resolve, 0))
    }
    return tugascontent
  }

//  export const waitreport = async () => reportcontent

//  export const setreport = (value) => reportcontent = value

//let resolveReport
//const reportPromise = new Promise(r => resolveReport = r)

//export const setreport = (value) => resolveReport(value)
//export const waitreport = () => reportPromise

export const setreport = (data) => {
  reportcontent = data
}

export const waitreport = () => reportcontent

export const clearreport = () => {
  reportcontent = null
}

export const setdokum = (profile) => {
  profilestate = profile
}

export const getdokum = () => profilestate
