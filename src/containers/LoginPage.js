import "../assets/LoginPage.css";
import logo from "../assets/PlanNUS.png";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'


export default function LoginPage() {
    return (
        <div className="LoginPage">
            <div className="container">
                <img id="icon" src={logo} alt="Team PlanNUS" />
                <form>
                    <div className="form-group">
                        <TextField id="outlined-basic" label="Email" variant="outlined" />
                     </div>
                    <div className="form-group">
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                    </div>
                    <div className="form-group">
                        <label>
                            <a href="#">Forgot password?</a>
                        </label>
                        <label>
                            <a href="#">Sign up</a>
                        </label>
                    </div>
                    <Button variant="contained" id="submit-button">
                    Login
                    </Button>
                </form>
            </div>
        </div>
    );
}
