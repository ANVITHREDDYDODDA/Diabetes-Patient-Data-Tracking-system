import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetTestsQuery,
  useDeleteTestMutation,
} from "../../slices/doctorsApiSlice";

function TestList() {
  const { data: tests, refetch, isLoading, error } = useGetTestsQuery();

  const [deleteStaff, { isLoading: loadingDelete }] = useDeleteTestMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure to Delete Test?")) {
      try {
        await deleteStaff(id);
        refetch();
      } catch (err) {
        window.alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row>
      {" "}
      <Col md={{ span: 12 }}>
        <h2 className="text-center my-4">
          <strong>List of All Tests</strong>
        </h2>
        <Row>
          <Col className="d-flex justify-content-end m-3">
            <LinkContainer to="/admin/test/add">
              <Button variant="primary">Add Test</Button>
            </LinkContainer>
          </Col>
        </Row>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <Table hover striped>
            <thead>
              <tr>
                <th>Test ID</th>
                <th>Test name</th>
                <th>Description</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tests.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user?.name}</td>
                  <td> {user?.description}</td>
                  <td>${user.price}</td>
                  <td>
                    <>
                      <LinkContainer to={`/admin/test/${user._id}`}>
                        <Button className="btn-sm mx-1">Edit</Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm mx-1"
                        variant="danger"
                        onClick={() => deleteHandler(user._id)}
                      >
                        Delete
                      </Button>
                      {loadingDelete && <p>Loading...</p>}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default TestList;
