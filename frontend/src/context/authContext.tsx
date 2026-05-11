import {createContext, useState, useEffect} from "react"
import { useCartStore } from "../store/useCartStore"

export const AuthContext = createContext<any>(null)

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const fetchCart = useCartStore((s) => s.fetchCart)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        if (token && userData) {
            setUser(JSON.parse(userData))
            fetchCart()
        }
        setLoading(false)
    }, [])
    return (
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

