import { useState } from "react"
import toast from "react-hot-toast"


const useLogOut = () => { 

    const [loading, setLoading] = useState(false)

    const logOut = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.removeItem('user')
            window.location.reload()
        } catch (error) {
            toast.error(error.message)

        } finally {
            setLoading(false)
        }

    }
    return { loading, logOut }
}
export default useLogOut