import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetStaffQuery,
  useDeleteStaffMutation,
} from "../../slices/doctorsApiSlice";

function Doctors() {
  const { data: users, refetch, isLoading, error } = useGetStaffQuery();

  const [deleteStaff, { isLoading: loadingDelete }] = useDeleteStaffMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure to Delete Doctor?")) {
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
          <strong>List of All Doctors</strong>
        </h2>
        <Row>
          <Col className="d-flex justify-content-end m-3">
            <LinkContainer to="/admin/doctor/add">
              <Button variant="primary">Add Doctor</Button>
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
                <th>Doctor ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Phone</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user?.firstName}</td>
                  <td> {user?.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <>
                      <LinkContainer to={`/admin/doctor/${user._id}`}>
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

export default Doctors;
