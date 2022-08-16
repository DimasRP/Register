import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const params = useParams();

  const userId = params.id;

  useEffect(() => {
    const handleGetDetail = () => {
      axios
        .get(`https://reqres.in/api/users/${userId}`)
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    handleGetDetail();
  }, [userId]);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      first_name: firstName,
      email: email,
    };
    axios
      .put(`https://reqres.in/api/users/${userId}`, payload)
      .then((res) => {
        if (res.status === 200) {
          handleShowAlert();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>ini detail</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={userData.email}
            placeholder="Email"
          />
        </div>
        <div>
          <label>First Name</label>
          <br />
          <input
            onChange={(e) => setFirstName(e.target.value)}
            defaultValue={userData.first_name}
            placeholder="First Name"
          />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default Detail;