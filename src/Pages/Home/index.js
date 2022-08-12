import { Link } from "react-router-dom"
import './home.css'

const Home = () => {
    return (
        <div className="form-register">
            <div>
                <h1>Home</h1>
                <Link to={"/login"}>
                    <button>Masuk</button>
                </Link>
                <Link to={"/register"}>
                    <button>Daftar</button>
                </Link>
            </div>
        </div>
    )
}

export default Home