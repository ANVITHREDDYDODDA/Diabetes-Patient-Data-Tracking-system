import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
function Doctor({ doctor }) {
  return (
    <Card className="my-3 p-3 rounded text-center">
      <Card.Body>
        <Link to={`/doctor/${doctor._id}`}>
          <Card.Title as="div">
            <strong>
              Dr. {doctor.firstName} {doctor.lastName}
            </strong>
          </Card.Title>
        </Link>

        <Row>
          <Col>
            <Card.Text>Specialization: {doctor.specialization.name}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Text>
              Phone: <strong>{doctor.phone}</strong>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Doctor;
