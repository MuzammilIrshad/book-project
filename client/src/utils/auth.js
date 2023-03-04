// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return JSON.parse(localStorage.getItem('id_token'));
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', JSON.stringify(idToken));
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem("saved_books")
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();


// import React, { createContext, useReducer, useContext } from 'react'
// import jwtDecode from 'jwt-decode'

// const AuthStateContext = createContext()
// const AuthDispatchContext = createContext()

// let user = null
// const token = localStorage.getItem('token')
// if (token) {
//   const decodedToken = jwtDecode(token)
//   const expiresAt = new Date(decodedToken.exp * 1000)

//   if (new Date() > expiresAt) {
//     localStorage.removeItem('token')
//   } else {
//     user = decodedToken
//   }
// } else console.log('No token found')

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       localStorage.setItem('token', action.payload.token)
//       return {
//         ...state,
//         user: action.payload,
//       }
//     case 'LOGOUT':
//       localStorage.removeItem('token')
//       return {
//         ...state,
//         user: null,
//       }
//     default:
//       throw new Error(`Unknown action type: ${action.type}`)
//   }
// }

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, { user })

//   return (
//     <AuthDispatchContext.Provider value={dispatch}>
//       <AuthStateContext.Provider value={state}>
//         {children}
//       </AuthStateContext.Provider>
//     </AuthDispatchContext.Provider>
//   )
// }

// export const useAuthState = () => useContext(AuthStateContext)
// export const useAuthDispatch = () => useContext(AuthDispatchContext)