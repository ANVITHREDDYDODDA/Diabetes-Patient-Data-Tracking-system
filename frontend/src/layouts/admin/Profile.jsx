import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useStaffprofileMutation } from "../../slices/doctorsApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
function Profile() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useStaffprofileMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          doctorId: userInfo._id,
          password,
          token: userInfo.token,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        window.alert("Password Changed successfully");
        if (res.role === "doctor") {
          navigate("/admin/readyappointments");
        } else {
          navigate("/admin/appointments");
        }
      } catch (err) {
        window.alert(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Container className="py-3">
      <>
        <h1>Change Password</h1>
        {loadingUpdateProfile && <p>Loading...</p>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="price3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            style={{ marginTop: "1rem" }}
            className="btn-bg"
          >
            Update
          </Button>
        </Form>
      </>
    </Container>
  );
}

export default Profile;
