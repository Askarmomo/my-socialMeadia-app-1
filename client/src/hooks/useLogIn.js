import { useState } from "react"
import toast from "react-hot-toast"



const useLogIn = () => {
    const [loading, setLoading] = useState(false)

    const logIn = async ({ email, password }) => {
        setLoading(true)
        const allInput = { email, password }
        try {

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(allInput)
            })
            const data = await res.json()

            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem('user', JSON.stringify(data))
            window.location.reload()
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }
    return { loading, logIn }
}

export default useLogIn