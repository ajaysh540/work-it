import "./LoginSignup.css"
import googleIcon from "../../Assets/google.png"
import React from "react";
import { auth, googleProvider } from "../../Services/Firebase"
import { useHistory } from "react-router";

type credentials = {
    fullName: string,
    password: string,
    email: string
}

const defaultCredentials: credentials = {
    fullName: "",
    password: "",
    email: ""
}

const LoginSignup = () => {
    const history = useHistory();
    const [loginCredentials, setLoginCredentials] = React.useState(defaultCredentials);
    const [login, setLogin] = React.useState(true);
    const [error, setError] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        auth.signInWithEmailAndPassword(loginCredentials.email, loginCredentials.password).then(user => {
            history.push("/")
            setLoading(false)
        }, e => {
            console.log(e)
            setError(e.message)
            setLoading(false)
        })
    }
    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        auth.createUserWithEmailAndPassword(loginCredentials.email, loginCredentials.password).then(user => {
            user.user?.updateProfile({
                displayName: loginCredentials.fullName
            })
            history.push("/")
        }, e => {
            console.log(e)
            setError(e.message)
        })
        setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let cr = loginCredentials;
        setLoginCredentials({
            ...cr,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    const changeLoginSignup = () => {
        setLogin(!login)
    }

    const googleSignIn = () => {
        setLoading(true)
        auth.signInWithPopup(googleProvider).then((res) => {
            history.push("/")
        }).catch((error) => {
            setError(error.message)
        })
        setLoading(false)
    }

    return <div className="row m-0 p-0">
        <div className="container d-flex sticky fixed-bottom justify-content-center">
            <button onClick={changeLoginSignup} className="switch-button border">{login ? "Sign Up" : "Log In"}</button>
        </div>
        {login ?
            <div className="container my-form p-2 text-center">
                <form className="form-box d-flex flex-column" onSubmit={handleLogin}>
                    <h5>Sign In</h5>
                    <hr className="bg-dark w-100" />
                    <input className="login-input" required placeholder="Email" onChange={handleChange} type="email" name="email" />
                    <input className="login-input" required placeholder="Password" onChange={handleChange} type="password" name="password" />
                    <button className="login-button mx-auto" disabled={isLoading} type="submit">
                        {isLoading ?
                            <div className="spinner-border" role="status">
                            </div> : "Submit"}</button><br />
                    <button className="login-button mx-auto" disabled={isLoading} onClick={googleSignIn} type="button">
                        {isLoading ?
                            <div className="spinner-border" role="status">
                            </div> :
                            <img className="google-signin" src={googleIcon} alt="Google Login" />}
                    </button>
                </form>
            </div> :
            <div className="container p-2 my-form text-center">
                <form className="form-box d-flex flex-column" onSubmit={handleSignup}>
                    <h5>Sign Up</h5>
                    <hr className="w-100 bg-dark" />
                    <input className="login-input" required placeholder="Full Name" onChange={handleChange} type="text" name="fullName" />
                    <input className="login-input" required placeholder="Email" onChange={handleChange} type="email" name="email" />
                    <input className="login-input" required placeholder="Password" onChange={handleChange} type="password" name="password" />
                    <button className="login-button mx-auto" disabled={isLoading}>
                        {isLoading ?
                            <div className="spinner-border" role="status">
                            </div> : "Submit"}
                    </button>
                </form>
            </div>}
        <div className="col-12 text-center text-danger">
            {error ? error : ""}

        </div>
    </div>
}

export default LoginSignup;

