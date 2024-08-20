import { Link } from 'react-router-dom'
import img from '../../assets/view-3d-businessman_23-2150709832.avif'
import { useState } from 'react'
import useSingUp from '../../hooks/useSingUp'

function SingUp() {
    const [input, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { loading, singUp } = useSingUp()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await singUp(input)

    }

    return (
        <div className=' lg:pt-20 pt-40 px-4'>

            <div className=' lg:flex items-center justify-center lg:max-w-2xl lg:space-x-5 mx-auto p-3 rounded-xl border border-gray-600' >
                <div>
                    <img src={img} alt={'SingUp'} className=' h-96 rounded lg:block hidden' />
                </div>
                <form onSubmit={handleSubmit} >
                    <div className=" text-xl font-semibold text-center pb-7">SingUp</div>
                    <div className=" space-y-4">
                        <label className="input input-bordered flex items-center gap-2 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input value={input.username} onChange={(e) => setInputs({ ...input, username: e.target.value })} type="text" className="grow" placeholder="Username" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input value={input.email} onChange={(e) => setInputs({ ...input, email: e.target.value })} type="text" className="grow" placeholder="Email" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input value={input.password} onChange={(e) => setInputs({ ...input, password: e.target.value })} type="password" className="grow" placeholder="password" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <div><input value={input.confirmPassword} onChange={(e) => setInputs({ ...input, confirmPassword: e.target.value })} type="password" className="grow" placeholder="Confirm Password" /></div>
                        </label>
                        <button className=" btn btn-accent btn-sm w-full font-semibold">{loading ? <span className=' loading loading-infinity '></span> : 'SingUp'}</button>
                        <div>
                            <p> <span className='text-[14px] text-center pl-2'> Have An Account ? </span><Link to={'/login'} className=' font-semibold cursor-pointer text-cyan-400 hover:underline'>LogIn</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SingUp