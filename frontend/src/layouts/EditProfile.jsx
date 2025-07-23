import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  useProfileMutation,
  useGetUserByIDQuery,
  useCreateReadingMutation,
} from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link } from "react-router-dom";
function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sugar, setSugar] = useState("");
  const [weight, setWeight] = useState("");
  const [bp, setBp] = useState("");
  const [a1c, setA1c] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: user, refetch, isLoading } = useGetUserByIDQuery(userInfo._id);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const [createReading, { isLoading: loadingReading }] =
    useCreateReadingMutation();

  const submitHandler1 = async (e) => {
    e.preventDefault();
    try {
      await createReading({
        sugar,
        bp,
        weight,
        a1c,
        userId: userInfo._id,
      }).unwrap();
      refetch();
      setA1c("");
      setBp("");
      setSugar("");
      setWeight("");
      window.alert("Readings Added successfully");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  const latestTest = user?.testReport[user?.testReport.length - 1];

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
  }, [userInfo.email, userInfo.firstName, userInfo.lastName, userInfo.phone]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          userId: userInfo._id,
          firstName,
          lastName,
          email,
          phone,
          password,
          token: userInfo.token,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        window.alert("Profile updated successfully");
      } catch (err) {
        window.alert(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Container className="py-3">
      <Link to="/">
        <Button type="button" className="btn-bg my-3">
          Go Back
        </Button>
      </Link>
      <>
        <h1>Edit Profile</h1>
        {loadingUpdateProfile && <p>Loading...</p>}

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
          <Form.Group controlId="price3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            style={{ marginTop: "1rem" }}
            className="btn-bg"
          >
            Update
          </Button>
        </Form>
      </>
      <>
        <Row className="review">
          <Col md={{ span: 6, offset: 3 }}>
            <h2>Your Tracker</h2>
            <ListGroup>
              {user?.readings.map((fb) => (
                <ListGroup.Item key={fb._id}>
                  <Row>
                    <Col md={6}>Date:</Col>
                    <Col md={6}>{fb.createdAt.substring(0, 10)}</Col>
                  </Row>
                  <Row>
                    <Col md={6}>Weight:</Col>
                    <Col md={6}>{fb.weight}</Col>
                  </Row>
                  <Row>
                    <Col md={6}>Sugar Level:</Col>
                    <Col md={6}>{fb.sugar}</Col>
                  </Row>
                  <Row>
                    <Col md={6}>Blood Pressure:</Col>
                    <Col md={6}>{fb.bp}</Col>
                  </Row>
                  <Row>
                    <Col md={6}>A1c Value:</Col>
                    <Col md={6}>{fb.a1c}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <ListGroup>
              <ListGroup.Item>
                <h2>Enter Reading</h2>

                {loadingReading && <p>Loading...</p>}

                <Form onSubmit={submitHandler1}>
                  <Form.Group className="my-2" controlId="comment1">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-2" controlId="comment2">
                    <Form.Label>Blood Pressure</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={bp}
                      onChange={(e) => setBp(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-2" controlId="comment3">
                    <Form.Label>Sugar Levels</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={sugar}
                      onChange={(e) => setSugar(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="my-2" controlId="comment4">
                    <Form.Label>A1c Reading</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={a1c}
                      onChange={(e) => setA1c(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Add
                  </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Row className="review">
            {user?.testReport.length !== 0 && (
              <Col md={{ span: 6, offset: 3 }}>
                <h2>Medical History</h2>

                <ListGroup>
                  {user?.testReport.slice(0, -1).map((fb) => (
                    <ListGroup.Item key={fb._id}>
                      <Row>
                        <Col md={6}>Report By: </Col>
                        <Col md={6}> {fb?.name}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient Weight:</Col>
                        <Col md={6}>{fb.weight}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient Height:</Col>
                        <Col md={6}>{fb.height}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient DOB:</Col>
                        <Col md={6}>{fb.age}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient HbA1c Levels:</Col>
                        <Col md={6}>{fb.hba1c}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient Fasting Glucose Levels:</Col>
                        <Col md={6}>{fb.fast}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient Fasting Glucose Levels:</Col>
                        <Col md={6}>{fb.post}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient Random Glucose Readings:</Col>
                        <Col md={6}>{fb.random}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient Heart Rate:</Col>
                        <Col md={6}>{fb.pulse}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            )}
          </Row>
          <Row className="review">
            {user?.testReport.length !== 0 && (
              <Col md={{ span: 6, offset: 3 }}>
                <h2>Latest Test Report</h2>
                <ListGroup>
                  <ListGroup.Item key={latestTest._id}>
                    <Row>
                      <Col md={6}>Report By: </Col>
                      <Col md={6}> {latestTest.name}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Patient Weight</Col>
                      <Col md={6}>{latestTest.weight}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Patient Height</Col>
                      <Col md={6}>{latestTest.height}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Patient Age</Col>
                      <Col md={6}>{latestTest.age}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Patient Blood Pressure</Col>
                      <Col md={6}>{latestTest.bp}</Col>
                    </Row>

                    <Row>
                      <Col md={6}>Patient HbA1c Levels:</Col>
                      <Col md={6}>{latestTest.hba1c}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Patient Fasting Glucose Levels:</Col>
                      <Col md={6}>{latestTest.fast}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Patient Fasting Glucose Levels:</Col>
                      <Col md={6}>{latestTest.post}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Patient Random Glucose Readings:</Col>
                      <Col md={6}>{latestTest.random}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Patient Heart Rate:</Col>
                      <Col md={6}>{latestTest.pulse}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Date</Col>
                      <Col md={6}>{latestTest.createdAt.substring(0, 10)}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Report</Col>
                      <Col md={6}>{latestTest.report}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            )}
          </Row>
        </>
      )}
    </Container>
  );
}

export default EditProfile;
