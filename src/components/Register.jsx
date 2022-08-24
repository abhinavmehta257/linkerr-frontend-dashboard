import React from 'react'
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
const  registerUser = async (formData, setError, setRes) => {
    await axios.post(process.env.REACT_APP_API_URL_BASE+'/auth/register', formData)
        .then(res => {
            console.log(res);
            setRes('user registered successfully, please login');
        }).catch(err => {
            console.log(err);
            setError(err.response.data.error);
        })
}

function Register() {

    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [res, setRes] = React.useState(null);
    const handleSubmit = async (e) => {
        setError(null);
        e.preventDefault()
        const userName = e.target.user_name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        if(userName && email && password){
            let formData = {
                userName: e.target.user_name.value,
                email: e.target.email.value,
                password: e.target.password.value,
            };
            console.log(formData);
            setProcessing(true);
            await registerUser(formData, setError,setRes);
            setProcessing(false);
        }
    }

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Register</h1>
        <p className="text-slate-500">Hi, Welcome 🙏</p>
        {res && <p className="text-green-500">{res}</p>}

        {/* <div className="my-5">
            <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt=""/> <span>Login with Google</span>
            </button>
        </div> */}
        <form onSubmit={handleSubmit} className="my-10">
            <div className="flex flex-col space-y-5 text-left">
                <label for="user-name">
                    <p className="font-medium text-slate-700 pb-2">User Name</p>
                    <input id="user-name" name="user_name" type="text" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter User Name"/>
                </label>
                <label for="email">
                    <p className="font-medium text-slate-700 pb-2">Email address</p>
                    <input id="email" name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address"/>
                </label>
                <label for="password">
                    <p className="font-medium text-slate-700 pb-2">Password</p>
                    <input id="password" name="password" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password"/>
                </label>
                {/* <div className="flex flex-row justify-between">
                    <div>
                        <label for="remember" className="">
                            <input type="checkbox" id="remember" className="w-4 h-4 border-slate-200 focus:dark:bg-gray-800"/>
                            Remember me
                        </label>
                    </div>
                    <div>
                        <a href="#" className="font-medium text-gray-800">Forgot Password?</a>
                    </div>
                </div> */}
                <button disabled={processing} className=" disabled:bg-gray-500  w-full py-3 font-medium text-white dark:bg-gray-800 hover:bg-gray-500 rounded-lg border-gray-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    {
                        processing ? (
                            <>
                            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                            </svg>
                            Processing...
                            </>
                        ) : (
                            <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Register</span>
                            </>
                        )
                    }
                    
                </button>
                {
                    error ? (
                        <div className="text-red-500 text-sm font-medium">{error}</div>
                    ) : null
                }
                <p className="text-center">already registered ? <NavLink to="/login" className="text-gray-800 font-medium inline-flex space-x-1 items-center"><span>Login now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg></span></NavLink></p>
            </div>
        </form>
    </div>
    
  )
}

export default Register