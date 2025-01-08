import toast from "react-hot-toast"
import { create } from "zustand"

export const useUserStrore = create((set) => (
    {

        loading: false,
        user: false,
        allusers: [],
        usersProfile: {},
        singUp: async ({ username, email, password, confirmPassword }) => {
            set({ loading: true })
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
                    toast.error(data.error)
                } else {
                    set({ user: data })
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                set({ loading: false })
            }
        },
        logIn: async ({ email, password }) => {
            set({ loading: true })

            try {

                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })

                const data = await res.json()

                if (!data.error) {
                    set({ user: data })
                } else {
                    toast.error(data.error)
                }

            } catch (error) {
                console.log(error);

            } finally {
                set({ loading: false })
            }

        },
        getUserProfile: async () => {
            set({ loading: true })
            try {
                const res = await fetch('/api/auth/profile')
                const data = await res.json()
                if (data.error) {
                    toast.error(data.error)
                } else {
                    set({ user: data })
                }
            } catch (error) {
                console.log(error);

            } finally {
                set({ loading: false })
            }
        },
        logOut: async () => {
            set({ loading: true })
            try {
                const res = await fetch('/api/auth/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }
                window.location.reload()
                toast.success("logout successfully")
            } catch (error) {
                toast.error(error.message)

            } finally {
                set({ loading: false })
            }

        },
        getAllUsers: async () => {

            try {

                const res = await fetch('/api/auth/allusers')
                const data = await res.json()
                if (!data.error) {
                    set({ allusers: data })
                } else {

                    toast.error(data.error)
                }
            } catch (error) {
                console.log(error);

            }

        },
        updateProfile: async (updateData, user, setUser) => {
            try {

                const res = await fetch('/api/auth/updateuser/' + user._id, {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(updateData)
                })
                const data = await res.json()
                if (data.error) {
                    toast.error(data.error)
                } else {
                    set({ user: data })
                    setUser(data)
                    window.location.reload()
                }
            } catch (error) {
                console.log(error);

                // toast.error(error.message)
            }
        },
        handleFollowAndUnfollow: async (userData) => {
            try {
                set({ loading: true })
                const res = await fetch('/api/auth/follow/' + userData?._id, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                })

                const data = await res.json()
                if (data.error) {
                    toast.error(data.error)
                }

                set((prevState) => {
                    let loginUser = { ...prevState.user }
                    let anotherUser = { ...userData }
                    const isFollowing = prevState.user.following.includes(anotherUser._id)

                    if (isFollowing) {
                        loginUser.following = loginUser.following.filter((item) => item !== anotherUser._id)
                        anotherUser.followers = anotherUser.followers.filter((item) => item !== loginUser._id)
                    } else {
                        loginUser.following = [...loginUser.following, anotherUser._id]
                        anotherUser.followers = [...anotherUser.followers, loginUser._id]
                    }
                    
                    const filteredUser = prevState.allusers.map((user) => user._id === anotherUser._id ? { ...user, ...anotherUser } : user)
                    return { user: loginUser, allusers: filteredUser }
                })

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            } finally {
                set({ loading: false })
            }
        }


    }
))
