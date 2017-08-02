import axios from 'axios'

// /**
//  * ACTION TYPES
//  */
// const GET_USER = 'GET_USER'
// const REMOVE_USER = 'REMOVE_USER'

// /**
//  * INITIAL STATE
//  */
// const defaultUser = {}

// /**
//  * ACTION CREATORS
//  */
// const getUser = user => ({type: GET_USER, user})
// const removeUser = () => ({type: REMOVE_USER})

// /**
//  * THUNK CREATORS
//  */
// export const me = () =>
//   dispatch =>
//     axios.get('/auth/me')
//       .then(res =>
//         dispatch(getUser(res.data || defaultUser)))
//       .catch(err => console.log(err))

// /**
//  * REDUCER
//  */
// export default function (state = defaultUser, action) {
//   switch (action.type) {
//     case GET_USER:
//       return action.user
//     case REMOVE_USER:
//       return defaultUser
//     default:
//       return state
//   }
// }
