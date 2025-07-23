import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useGetTestByIDQuery } from "../slices/doctorsApiSlice";
import { useState } from "react";
import { addTocart } from "../slices/cartSlice";
function TestInfo() {
  const [selectedSlot, setSelectedSlot] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: testId } = useParams();
  const { data: test, isLoading, error } = useGetTestByIDQuery(testId);
  const dates = JSON.parse(localStorage.getItem("dates"));
  const apponitmentDate = new Date(dates).toLocaleDateString("en-US");

  const isAvailable = (d) => {
    const isFound = d.unavailableDates.some((date) =>
      apponitmentDate.includes(new Date(date).toLocaleDateString("en-US"))
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedSlot(
      checked
        ? [...selectedSlot, value]
        : selectedSlot.filter((item) => item !== value)
    );
  };

  const handleClick = () => {
    const slot = test.schedule.filter(
      (slot) => slot._id === selectedSlot?.join(" ")
    );

    dispatch(
      addTocart({
        name: test.name,
        test: test._id,
        slot_id: selectedSlot[0],
        apponitmentDate,
        dates,
        slot: slot[0].slot,
        price: test.price,
      })
    );
    navigate("/confirm");
  };
  return (
    <div>
      <LinkContainer to="/tests">
        <Button>Back</Button>
      </LinkContainer>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <>
          <Row>
            <h4 className="text-center my-4">
              Appointment Date: {apponitmentDate}
            </h4>
            <Col md={{ span: 6, offset: 3 }}>
              <Card className="p-2">
                <Card.Title className="p-3">
                  <h1>
                    <strong>{test.name}</strong>
                  </h1>
                </Card.Title>
                <Card.Body>
                  <Card.Text>
                    <h2>Description: {test.description}</h2>
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Text>
                    <h2>Price: ${test.price}</h2>
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Col className="py-2">
                    <strong>Select Time Slot For Appointment:</strong>
                  </Col>
                  <Col className="py-2">
                    <div className="rSelectRooms">
                      {test.schedule.map((slot) => (
                        <>
                          {isAvailable(slot) && (
                            <div className="room" key={slot.slot}>
                              <>
                                <input
                                  style={{ width: "20px", height: "20px" }}
                                  type="checkbox"
                                  value={slot._id}
                                  onChange={handleSelect}
                                  disabled={!isAvailable(slot)}
                                />
                                <label>{slot.slot} </label>
                              </>
                            </div>
                          )}
                        </>
                      ))}

                      {/* {test.schedule.map((slot) => (
                        <div className="room" key={slot.slot}>
                          {isAvailable(slot) && (
                            <>
                              <input
                                style={{ width: "20px", height: "20px" }}
                                type="checkbox"
                                value={slot._id}
                                onChange={handleSelect}
                                disabled={!isAvailable(slot)}
                              />
                              <label>{slot.slot} </label>
                            </>
                          )}
                        </div>
                      ))} */}
                    </div>
                  </Col>
                </Card.Body>
                <Card.Body>
                  <Button onClick={handleClick}>Confirm</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
export default TestInfo;
