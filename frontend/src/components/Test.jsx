import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
function Test({ test }) {
  return (
    <Card className="my-3 p-3 rounded text-center">
      <Card.Body>
        <Link to={`/test/${test._id}`}>
          <Card.Title as="div">
            <strong>{test.name}</strong>
          </Card.Title>
        </Link>

        <Row>
          <Col>
            <Card.Text>Description: {test.description}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Text>
              Price: <strong>{test.price}</strong>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Test;
