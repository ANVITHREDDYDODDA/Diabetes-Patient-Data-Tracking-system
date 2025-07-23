import React from "react";
import { useGetTestsQuery } from "../slices/doctorsApiSlice";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Test from "../components/Test";
function Tests() {
  const { data: tests, isLoading, error } = useGetTestsQuery();
  return (
    <>
      {isLoading ? (
        <h1>.....</h1>
      ) : error ? (
        <h2>{error?.data?.message || error?.error}</h2>
      ) : (
        <>
          <LinkContainer to="/">
            <Button>Back</Button>
          </LinkContainer>
          <h1 className="text-center">TESTS</h1>
          <Row>
            {tests.map((d) => (
              <Col key={d._id} xs={6} md={4} lg={3} className="mb-4">
                <Test test={d} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default Tests;
