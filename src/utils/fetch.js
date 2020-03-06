export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://api.files.crandall.dev'


export const setCSRF = token => {
  try {
    window.localStorage.setItem('csrf' , token)    
  } catch (e) {
    alert('There was an error setting your CSRF token.')
    console.log(e)
  }
}

export const getCSRF = () => {
  try {
    return window.localStorage.csrf
  } catch (e) {
    // This is the only `alert` that breaks the build,
    // even without the `return` in the `try` block.
    // The cause is SSR, though the others work.     
    if (typeof window !== 'undefined') {
      alert('Unable to retrieve CSRF token from local storage.')
    }
    console.log(e)
  }
}

export const deleteCSRF = () => {
  try {
    window.localStorage.removeItem('csrf')    
  } catch (e) {
    alert('There was an error removing your CSRF token from local storage.')
    console.log(e)
  }
}

export default { BASE_URL, setCSRF, getCSRF, deleteCSRF }