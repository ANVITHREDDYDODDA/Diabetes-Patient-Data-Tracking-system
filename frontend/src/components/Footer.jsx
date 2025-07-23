import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className=" py-4 bg-primary text-light">
      <Container>
        <Row className="text-center">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} ProHealthCare</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
