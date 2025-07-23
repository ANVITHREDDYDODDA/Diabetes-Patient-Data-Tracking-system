import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useCreateAppointmentMutation } from "../slices/appointmentsApiSlice";
import { clearcart } from "../slices/cartSlice";
function Details() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = cart;

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
  const checkoutHandler = async () => {
    try {
      const res = await createAppointment({
        token: userInfo.token,
        appointmentItems: {
          ...cart.cartItems,
          testName: cart.cartItems.name,
          date: cartItems.apponitmentDate,
          clot: cartItems.slot,
        },
        slot_id: cartItems.slot_id,
        date: cartItems.dates,
        Price: cart.Price,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearcart());
      navigate(`/appointment/${res._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="py-3">
      <LinkContainer to="/confirm">
        <Button>Back</Button>
      </LinkContainer>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h1 style={{ margin: "20px 0px" }}>Review and Pay</h1>
          {cartItems.length === 0 ? (
            <div className="my-3 text-center">
              <p>
                There are no Appointments. <Link to="/">Go Back</Link>
              </p>
            </div>
          ) : (
            <Row>
              <Col md={{ span: 6, offset: 1 }}>
                <Card className="p-3">
                  <Card.Text>
                    Patient Name:{" "}
                    <strong>
                      {userInfo.firstName} {userInfo.lastName}
                    </strong>
                  </Card.Text>

                  <Card.Text>
                    Test: <strong>{cartItems.name} </strong>
                  </Card.Text>
                  <Card.Text>
                    Appointment Date :
                    <strong>{cartItems.apponitmentDate}</strong>
                  </Card.Text>
                  <Card.Text>
                    {" "}
                    Appointment Time: <strong>{cartItems.slot}</strong>
                  </Card.Text>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="p-3">
                  <Card.Title>
                    <h2>Fee Details</h2>
                  </Card.Title>
                  <Card.Text className="mt-2">
                    Consulting Fee: <strong>${cart.Price}</strong>
                  </Card.Text>
                  <Card.Text className="mt-2">
                    Tax: <strong>${cart.taxPrice}</strong>
                  </Card.Text>
                  <Card.Text className="mt-2">
                    Total: <strong>${cart.totalPrice}</strong>
                  </Card.Text>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end" md={{ span: 8, offset: 2 }}>
          <Button className="mt-3 " onClick={checkoutHandler}>
            Go To Payment
          </Button>
          {isLoading && <p>Loadng</p>}
        </Col>
      </Row>
    </Container>
  );
}
export default Details;
