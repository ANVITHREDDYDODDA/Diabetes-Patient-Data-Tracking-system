import React from "react";
import { Link } from "react-router-dom";
import { Table, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useGetMyAppointmentsQuery } from "../slices/appointmentsApiSlice";
function MyAppointments() {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: appointments,
    isLoading,
    error,
  } = useGetMyAppointmentsQuery(userInfo._id);
  return (
    <Row>
      <Col md={{ span: 12 }} className="text-center my-3">
        <h1 className="my-3">My Appointments</h1>
        <Table hover striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th> Test Name</th>
              <th>Appointment Status</th>
              <th>Payment Status</th>
              <th></th>
            </tr>
          </thead>

          {isLoading ? (
            <span>Loading...</span>
          ) : error ? (
            <span>{error?.data?.message || error.error}</span>
          ) : (
            <tbody>
              {appointments.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.details.appointmentDate}</td>
                  <td>{item.details.testName} </td>
                  <td>{item.Status}</td>
                  <td>
                    {!item.isPaid ? (
                      <strong style={{ color: "red" }}>Pending</strong>
                    ) : (
                      <strong style={{ color: "green" }}>
                        Paid On{" "}
                        {new Date(item.paidAt).toLocaleDateString("en-US")}
                      </strong>
                    )}
                  </td>
                  <td>
                    <Link to={`/appointment/${item._id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </Col>
    </Row>
  );
}

export default MyAppointments;
