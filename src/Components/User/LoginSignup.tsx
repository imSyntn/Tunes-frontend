import { } from 'react'
import '../../Styles/User/LoginSignup.scss'

const LoginSignup = () => {
    return (
        <div className='LoginSignup'>
            <div className="form-container">
                <p className="title">Login</p>
                <form className="form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="" />
                            <div className="forgot">
                                <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                            </div>
                    </div>
                    <button className="sign">Sign in</button>
                </form>
                <p className="signup">Don't have an account?
                    <a rel="noopener noreferrer" href="#" className="">Sign up</a>
                </p>
            </div>
            <img src="../../../login.svg" alt="" />
        </div>
    )
}

export default LoginSignup