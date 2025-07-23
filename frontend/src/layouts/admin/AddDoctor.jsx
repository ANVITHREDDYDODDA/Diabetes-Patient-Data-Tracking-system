import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useCreateStaffMutation } from "../../slices/doctorsApiSlice";

function AddDoctor() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  // const ar = [];

  // const sch = doctor?.schedule?.map((s) => ar.push(s.slot));
  // const updatedSch = ar.join(",");

  const [createDoctor, { isLoading: loadingcreate }] = useCreateStaffMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createDoctor({
        firstName,
        lastName,
        phone,
        email,
        role: "doctor",
        password,
      });

      window.alert("Doctor is created successfully");

      navigate("/admin/doctors");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="py-3">
      <Link to="/admin/doctors">
        <Button type="button" className="btn-bg my-3">
          Go Back
        </Button>
      </Link>
      <>
        <h1>Add Doctor</h1>
        {loadingcreate && <p>Loading...</p>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title">
            <Form.Label>firstName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            style={{ marginTop: "1rem" }}
            className="btn-bg"
          >
            Add
          </Button>
        </Form>
      </>
    </Container>
  );
}

export default AddDoctor;
