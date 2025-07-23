import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useCreateTestMutation } from "../../slices/doctorsApiSlice";

function AddTest() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [sched, setSched] = useState("");

  // const ar = [];

  // const sch = doctor?.schedule?.map((s) => ar.push(s.slot));
  // const updatedSch = ar.join(",");

  const [createDoctor, { isLoading: loadingcreate }] = useCreateTestMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const schedule = sched?.split(",").map((s) => ({ slot: s }));
    try {
      await createDoctor({
        name,
        description,
        price,
        schedule,
      });

      window.alert("Test is created successfully");

      navigate("/admin/tests");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="py-3">
      <Link to="/admin/tests">
        <Button type="button" className="btn-bg my-3">
          Go Back
        </Button>
      </Link>
      <>
        <h1>Add Test</h1>
        {loadingcreate && <p>Loading...</p>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title">
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Test Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="roomNumbers">
            <Form.Label>schedule</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Schedule in format of 10:00AM-11:00AM,12:00PM-1:00PM"
              value={sched}
              onChange={(e) => setSched(e.target.value)}
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

export default AddTest;
