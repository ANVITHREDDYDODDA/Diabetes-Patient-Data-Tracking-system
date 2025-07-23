import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Container,
  Badge,
  Button,
  ListGroup,
  Form,
} from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  useGetClientIDQuery,
  useCreatePreMutation,
  usePayAppointmentMutation,
  useGetAppointmentByIdQuery,
  useUpdateStatusMutation,
  useCancelAppointmentMutation,
  useCreateTestReportMutation,
} from "../slices/appointmentsApiSlice";
function Appointment() {
  const { id: appointmentId } = useParams();
  const {
    data: appointment,
    isLoading,
    refetch,
  } = useGetAppointmentByIdQuery(appointmentId);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bp, setBp] = useState("");
  const [hba1c, setHba1c] = useState("");
  const [fast, setFast] = useState("");
  const [post, setPost] = useState("");
  const [random, setRandom] = useState("");
  const [pulse, setPulse] = useState("");
  const [report, setReport] = useState("");
  const [medicine, setMedicine] = useState("");
  const [qty, setQty] = useState("");
  const [comment, setComment] = useState("");
  const [doccomment, setDoccomment] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [payAppointment, { isLoading: loadingPay }] =
    usePayAppointmentMutation();
  const [updateStatus, { isLoading: loadingUpdate }] =
    useUpdateStatusMutation();
  const [cancelAppointment, { isLoading: loadingCancel }] =
    useCancelAppointmentMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetClientIDQuery();

  const [createFeedback, { isLoading: loadingFeedback }] =
    useCreateTestReportMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createFeedback({
        appointmentId,
        report,
        name: userInfo.firstName + " " + userInfo.lastName,
        testId: appointment.test._id,
        weight,
        height,
        bp,
        age,
        hba1c,
        fast,
        post,
        random,
        pulse,
      }).unwrap();
      refetch();
      setReport("");
      window.alert("Report added successfully");
    } catch (err) {
      setReport("");
      window.alert(err?.data?.message || err.error);
    }
  };

  const [createpre, { isLoading: loadingPre }] = useCreatePreMutation();

  const submitHandler1 = async (e) => {
    e.preventDefault();

    try {
      await createpre({
        appointmentId,
        comment,
        doctorId: userInfo._id,
        name: userInfo.firstname + " " + userInfo.lastname,
        qty,
        medicine,
      }).unwrap();
      refetch();
      setMedicine("");
      setQty("");
      setComment("");
    } catch (err) {
      setMedicine("");
      setQty("");
      setComment("");
      window.alert(err?.data?.message || err.error);
    }
  };
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (appointment && !appointment?.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [appointment, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payAppointment({ appointmentId, details });
        refetch();
        window.alert("payment successful");
      } catch (err) {
        window.alert(err?.data?.message || err.message);
      }
    });
  }

  async function onApproveTest() {
    await payAppointment({ appointmentId, details: { payer: {} } });
    refetch();

    window.alert("payment successful");
  }
  function onError(err) {
    window.alert(err?.data?.message || err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: appointment.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const handleClick = async (e) => {
    e.preventDefault();
    await updateStatus({ appointmentId, comment: doccomment }).unwrap();
    refetch();
  };

  const handleCancel = async () => {
    await cancelAppointment({ appointmentId });
    window.alert("Appointment is Canceled. Refund will be Processed.");
    refetch();
  };

  return (
    <Container className="py-3">
      {userInfo.role === "user" && (
        <LinkContainer to="/myappointments">
          <Button>Back</Button>
        </LinkContainer>
      )}
      {userInfo.role === "admin" && (
        <LinkContainer to="/admin/appointments">
          <Button>Back</Button>
        </LinkContainer>
      )}
      {userInfo.role === "doctor" && (
        <LinkContainer to="/admin/readyappointments">
          <Button>Back</Button>
        </LinkContainer>
      )}
      {userInfo.role === "lab" && (
        <LinkContainer to="/admin/appointments">
          <Button>Back</Button>
        </LinkContainer>
      )}
      <Row>
        {isLoading ? (
          <p>Loading..</p>
        ) : (
          <>
            <h1 style={{ margin: "20px 0px" }}>
              Appointment ID: {appointment?._id}
            </h1>
            <Col md={{ span: 8 }}>
              <Card className="p-3">
                <Card.Text>
                  Patient Name:{" "}
                  <strong>
                    {appointment?.user.firstName} {appointment?.user.lastName}
                  </strong>
                </Card.Text>

                <Card.Text>
                  Test: <strong>{appointment?.details.testName}</strong>
                </Card.Text>
                <Card.Text>
                  Appointment Date :
                  <strong>{appointment?.details.appointmentDate}</strong>
                </Card.Text>
                <Card.Text>
                  {" "}
                  Appointment Time:{" "}
                  <strong>{appointment.details.appointmentTime}</strong>
                </Card.Text>
                <Card.Text>
                  Status:
                  <strong>{appointment.Status}</strong>
                </Card.Text>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-3">
                <Card.Title style={{ fontSize: "24px" }}>
                  Price Details
                </Card.Title>
                <Card.Text className="mt-2">
                  Price: <strong>${appointment.Price}</strong>
                </Card.Text>
                <Card.Text className="mt-2">
                  Tax: <strong>${appointment.taxPrice}</strong>
                </Card.Text>
                <Card.Text className="mt-2">
                  Total: <strong>${appointment.totalPrice}</strong>
                </Card.Text>
                <Card.Text>
                  Payment Status:{" "}
                  {appointment.isPaid ? (
                    <Badge bg="success">
                      <span className="pt-1">
                        {"Paid On "}
                        {new Date(appointment.paidAt).toLocaleDateString(
                          "en-US"
                        )}
                      </span>
                    </Badge>
                  ) : (
                    <Badge bg="danger">
                      <h6 className="pt-1">Pending</h6>
                    </Badge>
                  )}
                </Card.Text>
                <Row>
                  <Col
                    className="d-flex justify-content-end"
                    md={{ span: 8, offset: 2 }}
                  >
                    {!appointment?.isPaid && (
                      <div>
                        {loadingPay && <p>Loading...</p>}
                        {isPending ? (
                          <p>Loading...</p>
                        ) : (
                          <div>
                            <div>
                              <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                              ></PayPalButtons>
                            </div>
                          </div>
                        )}
                        {/* <Button onClick={onApproveTest}>Pay</Button> */}
                      </div>
                    )}
                    {isLoading && <p>Loadng</p>}
                  </Col>
                </Row>
              </Card>
            </Col>
          </>
        )}
      </Row>

      {appointment?.Status === "Paid" && (
        <Button onClick={handleCancel} variant="danger" className="mx-2">
          Cancel Appointment
        </Button>
      )}
      {loadingCancel && <p>Loading..</p>}
      {/* {userInfo.role === "doctor" &&
        appointment?.Status === "ready for doctor" && (
          <>
            <Button onClick={handleClick} variant="success">
              Mark as Visited
            </Button>
          </>
        )} */}
      {loadingUpdate && <p>Loading..</p>}

      {(userInfo.role === "doctor" || userInfo.role === "user") && (
        <Row className="review">
          <Col md={{ span: 6, offset: 3 }}>
            <h2>Patient Trackings</h2>
            <ListGroup>
              {appointment?.user?.readings.map((fb) => (
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
          </Col>
        </Row>
      )}
      {userInfo.role === "doctor" && (
        <>
          <Row className="review">
            <Col md={{ span: 6, offset: 3 }}>
              <h2>Patient History</h2>
              {appointment?.testReport && (
                <ListGroup>
                  {appointment?.user?.testReport.slice(0, -1).map((fb) => (
                    <ListGroup.Item key={fb._id}>
                      <Row>
                        <Col md={6}>Report By: </Col>
                        <Col md={6}> {fb.name}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient Weight</Col>
                        <Col md={6}>{fb.weight}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient Height</Col>
                        <Col md={6}>{fb.height}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient Age</Col>
                        <Col md={6}>{fb.age}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Patient Blood Pressure</Col>
                        <Col md={6}>{fb.bp}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Date</Col>
                        <Col md={6}>{fb.createdAt.substring(0, 10)}</Col>
                      </Row>
                      <Row>
                        <Col md={6}>Report</Col>
                        <Col md={6}>{fb.report}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
          </Row>
        </>
      )}

      <Row className="review">
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Latest Test Reports</h2>
          {appointment?.testReport?.length === 0 &&
            userInfo.role === "user" && (
              <p>No Test Reports Yet. please Give some time.</p>
            )}
          {appointment?.testReport && (
            <ListGroup>
              {appointment?.testReport.map((fb) => (
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
                  <Row>
                    <Col md={6}>Date:</Col>
                    <Col md={6}>{fb.createdAt.substring(0, 10)}</Col>
                  </Row>
                  <Row>
                    <Col md={6}>Report:</Col>
                    <Col md={6}>{fb.report}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {userInfo.role === "lab" && appointment?.Status === "Paid" && (
            <ListGroup>
              <ListGroup.Item>
                <h2>Enter Test Reports</h2>

                {loadingFeedback && <p>Loading...</p>}

                <Form onSubmit={submitHandler}>
                  <Form.Group className="my-2" controlId="comment1">
                    <Form.Label>Patient Weight</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-2" controlId="comment2">
                    <Form.Label>Patient Height</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-2" controlId="comment3">
                    <Form.Label>Patient DOB</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-2" controlId="comment2">
                    <Form.Label>Patient Blood Pressure</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={bp}
                      onChange={(e) => setBp(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-2" controlId="comment3">
                    <Form.Label>Patient HbA1C Reading</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={hba1c}
                      onChange={(e) => setHba1c(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="my-2" controlId="comment3">
                    <Form.Label>Patient Fasting Glucose levels</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={fast}
                      onChange={(e) => setFast(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-2" controlId="comment3">
                    <Form.Label>Patient Post Glucose levels</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={post}
                      onChange={(e) => setPost(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="my-2" controlId="comment3">
                    <Form.Label>Patient Random Glucose levels</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={random}
                      onChange={(e) => setRandom(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="my-2" controlId="comment3">
                    <Form.Label>Patient Pulse Rate</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={pulse}
                      onChange={(e) => setPulse(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="my-2" controlId="comment">
                    <Form.Label>Report</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      required
                      value={report}
                      onChange={(e) => setReport(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingFeedback}
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Col>
      </Row>
      {(appointment?.Status === "ready for doctor" ||
        appointment?.Status === "completed") && (
        <Row className="review">
          <Col md={{ span: 6, offset: 3 }}>
            <h2>Doctor Prescription</h2>
            {appointment?.prescription.length === 0 && (
              <p>You can Now Visit Docotor with Reports.</p>
            )}

            {appointment?.prescription && (
              <ListGroup>
                {appointment?.prescription[0]?.name && (
                  <ListGroup.Item>
                    Doctor : Dr {appointment?.prescription[0]?.name}
                  </ListGroup.Item>
                )}
                {appointment?.prescription.map((fb) => (
                  <ListGroup.Item key={fb._id}>
                    <Row>
                      <Col md={6}>Medicine:</Col>
                      <Col md={6}>{fb.medicine}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>qty:</Col>
                      <Col md={6}>{fb.qty}</Col>
                    </Row>
                    <Row>
                      <Col md={6}>Comment:</Col>
                      <Col md={6}>{fb.comment}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}

            {userInfo.role === "doctor" &&
              appointment?.Status === "ready for doctor" && (
                <ListGroup>
                  <ListGroup.Item>
                    <h2>Enter Medicine</h2>

                    {loadingPre && <p>Loading...</p>}

                    <Form onSubmit={submitHandler1}>
                      <Form.Group className="my-2" controlId="comment1">
                        <Form.Label>Medicine</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={medicine}
                          onChange={(e) => setMedicine(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group className="my-2" controlId="comment2">
                        <Form.Label>Qty</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group className="my-2" controlId="comment3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingFeedback}
                        type="submit"
                        variant="primary"
                      >
                        Add
                      </Button>
                    </Form>
                  </ListGroup.Item>
                </ListGroup>
              )}
          </Col>
        </Row>
      )}
      {appointment?.feedback && (
        <Row className="review">
          <Col md={{ span: 6, offset: 3 }}>
            <ListGroup>
              <ListGroup.Item>
                <h2>Doctor FeedBack</h2>
                <Row>
                  <Col md={4}>
                    <strong>FeedBack:</strong>
                  </Col>
                  <Col md={8}>{appointment?.feedback}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
      {userInfo.role === "doctor" && appointment?.Status !== "Completed" && (
        <Row className="review">
          <Col md={{ span: 6, offset: 3 }}>
            <ListGroup>
              <ListGroup.Item>
                <h2>Doctor FeedBack</h2>
                <Form onSubmit={handleClick}>
                  <Form.Group className="my-2" controlId="comment111">
                    <Form.Control
                      as="textarea"
                      row="3"
                      required
                      value={doccomment}
                      onChange={(e) => setDoccomment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="success">
                    Mark as visited
                  </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
}
export default Appointment;
