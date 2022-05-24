import "../assets/LoginPage.css";
import logo from "../assets/PlanNUS.png";

export default function LoginPage() {
    return (
        <div className="LoginPage">
            <div className="container">
                <img id="icon" src={logo} alt="Team PlanNUS" />
                <form>
                    <div className="form-group">
                        <label>Email </label>
                        <input type="text" name="email" placeholder="Email" />
                     </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" name="name" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label>
                            <a href="default.com">Forgot password?</a>
                        </label>
                        <label>
                            <a href="default.com">Sign up</a>
                        </label>
                    </div>
                    <div className="form-group">
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
