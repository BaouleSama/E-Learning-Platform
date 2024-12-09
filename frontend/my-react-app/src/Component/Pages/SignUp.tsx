import { useState } from "react"
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css"

function SignUp() {
    // create a state variable to store the input value
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {

        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent page refresh
        console.log('Form Data:', formData); // Log or process form data
        alert(formData.username)


    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <section className={styles.form_header}>
                <h1>Create your account</h1>
                <p>Already have an account? <Link to="/signin">Sign In</Link> </p>

            </section>

            <section className={styles.form_body}>
                <div>
                    <label htmlFor=""> Username</label>
                    <input type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor=""> Password</label>
                    <input type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

            </section>

            <button className={styles.form_button} type="submit"> Sign Up</button>
        </form>
    )
}

export default SignUp