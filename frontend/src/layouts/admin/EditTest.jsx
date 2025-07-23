import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import {
  useGetTestByIDQuery,
  useUpdateTestMutation,
} from "../../slices/doctorsApiSlice";

function EditTest() {
  const { id: testId } = useParams();
  const { data: test, isLoading: loadingDoc } = useGetTestByIDQuery(testId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [sched, setSched] = useState("");

  const ar = [];

  const sch = test?.schedule?.map((s) => ar.push(s.slot));
  const updatedSch = ar.join(",");

  const [updateDoctor, { isLoading: loadingUpdate }] = useUpdateTestMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const schedule = sched?.split(",").map((s) => ({ slot: s }));
    try {
      await updateDoctor({
        testId,
        name,
        description,
        price,
        schedule,
      });

      window.alert("Test is updated successfully");

      navigate("/admin/tests");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (test) {
      setName(test.name);
      setDescription(test.description);
      setPrice(test.price);
      setSched(updatedSch);
    }
  }, [test, updatedSch]);
  return (
    <Container className="py-3">
      <Link to="/admin/doctors">
        <Button type="button" className="btn-bg my-3">
          Go Back
        </Button>
      </Link>
      <>
        <h1>Edit Test Details</h1>
        {loadingDoc && <p>Loading...</p>}
        {loadingUpdate && <p>Loading...</p>}

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

          <Button type="submit" style={{ marginTop: "1rem" }}>
            Update
          </Button>
        </Form>
      </>
    </Container>
  );
}

export default EditTest;
