import React from "react";
import { Link } from "react-router-dom";
import { Table, Row, Col, Button } from "react-bootstrap";

import { useGetAppointmentsQuery } from "../../slices/appointmentsApiSlice";
function ReadyAppointments() {
  const { data, isLoading, error } = useGetAppointmentsQuery();

  const appointments = data?.filter(
    (a) => a.Status === "ready for doctor" || a.Status === "Completed"
  );

  return (
    <Row>
      <Col md={{ span: 10, offset: 1 }} className="text-center my-3">
        <h1 className="my-3">All Appointments</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Test Name</th>
              <th> Appointment Date</th>
              <th>Appointment Status</th>
              <th>Payment Info</th>
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
                  <td>
                    {item.user.firstName} {item.user.lastName}
                  </td>
                  <td>{item.details.testName}</td>
                  <td>{item.details.appointmentDate}</td>
                  <td>{item.Status}</td>
                  <td>
                    Paid On {new Date(item.paidAt).toLocaleDateString("en-US")}
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

export default ReadyAppointments;
