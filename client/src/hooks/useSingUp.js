import { useState } from "react"
import toast from "react-hot-toast"
// import { useNavigate } from "react-router-dom"
// import { useAuthContext } from "../context/authContext"


const useSingUp = () => {
    const [loading, setLoading] = useState(false)

    const singUp = async ({ username, email, password, confirmPassword }) => {
        setLoading(true)
        const allInputs = { username, email, password, confirmPassword }
        try {
            if (username.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
                return toast.error('fill all the required field')
            }
            if (password !== confirmPassword) {
                return toast.error('password not match with confirmPassword')
            }
            if (password.length < 6) {
                return toast.error('password must be have 6 cheracter')
            }

            const res = await fetch('/api/auth/singup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(allInputs)
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

    return { loading, singUp }

}

export default useSingUp