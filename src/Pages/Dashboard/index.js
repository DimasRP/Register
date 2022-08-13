import axios from "axios"
import React, { useEffect, useState } from "react"
import './dashboard.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Dashboard = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
    return (
        <div>
          <h1>Dashboard</h1>
          <div className="item">
          {data.map((item) => (
            <div>
                <p>{item.first_name}</p>
                <img src={item.avatar}/>
                <div>
                    <Button variant="primary" onClick={handleShow}>
                    Edit
                    </Button>
                    <Button variant="danger" onClick={handleShow}>
                    Delete
                    </Button>
                </div>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>{item.first_name}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(item.id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
          ))}
          </div>
        </div>
    )
}

export default Dashboard