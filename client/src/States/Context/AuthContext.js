import { createContext } from 'react'

function noop() {} //i am noop, i do nothing :)
// thats how I share params using context
export const AuthContext = createContext({
    // token: null,
    // userId: null,
    // login: noop,
    // logout: noop,
    // isAuthenticated: false

})