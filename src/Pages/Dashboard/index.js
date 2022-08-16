import axios from "axios"
import React, { useEffect, useState } from "react"
import './dashboard.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link, useNavigate} from "react-router-dom"
import { ToggleButton } from "react-bootstrap";

const Dashboard = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userId, setUserId ] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {
        getData()
    },[])

    const getData = () => {
        axios
        .get("https://reqres.in/api/users?page=2")
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err))
    }
    const handleDelete = (id) =>{
        axios.delete(`https://reqres.in/api/users/${id}`)
        .then((res) => {
            if (res.status == 204){
                setShow(false)
            }
        })
        .catch()
        console.log(id);
    }
    const handleLogout = () =>{
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div>
          <h1>Dashboard</h1>
          <button onClick={handleLogout}>Logut</button>
          <div className="item">
          {data.map((item) => (
            <div>
                <p>{item.first_name}</p>
                <img src={item.avatar}/>
                <div>
                    <Link
                    to={`/detail/${item?.id}`}>
                        <Button variant="primary">
                        Edit
                        </Button>
                    </Link>
                    <Button variant="danger" onClick={()=>{setUserId(item.id);
                         handleShow()}}>
                    Delete
                    </Button>&nbsp;
                </div>
                
            </div>
          ))}
          <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>{userId}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(userId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
          </div>
        </div>
    )
}

export default Dashboard