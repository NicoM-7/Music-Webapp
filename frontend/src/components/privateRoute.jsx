// import React from 'react'
// // import AuthService from './Services/AuthService'
// import { redirect, Route } from 'react-router-dom'

// const PrivateRoute = ({ component: Component, ...rest }) => {

//   // Add your own authentication on the below line.
//   const isLoggedIn = AuthService.isLoggedIn()

//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return isLoggedIn ? (
//           <Component {...props} />
//         ) : (
//           <redirect to={{ pathname: '/login', state: {from: props.location}}}/>
//         )
//       }}
//     />
//   )
// }

// export default PrivateRoute