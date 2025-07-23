import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/signin");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <header className="text-light">
      <Navbar expand="md" collapseOnSelect bg="primary">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-light">
              <strong>ProHealthCare</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" ms-auto">
              {userInfo ? (
                userInfo.role === "admin" ? (
                  <>
                    <NavDropdown
                      title={userInfo.firstName}
                      id="username"
                      className="text-light"
                    >
                      <LinkContainer to="/admin/appointments">
                        <NavDropdown.Item>Manage Appointments</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/doctors">
                        <NavDropdown.Item>Manage Doctors</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/labs">
                        <NavDropdown.Item>Manage Lab Officers</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/tests">
                        <NavDropdown.Item>Manage Tests</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                    <Nav.Link className="text-light" onClick={logoutHandler}>
                      Admin LogOut
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    {userInfo.role === "user" && (
                      <>
                        <LinkContainer to="/myprofile">
                          <Nav.Link className="text-light">My Profile</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/myappointments">
                          <Nav.Link className="text-light">
                            My Appointments
                          </Nav.Link>
                        </LinkContainer>
                        <Nav.Link
                          className="text-light"
                          onClick={logoutHandler}
                        >
                          LogOut
                        </Nav.Link>{" "}
                      </>
                    )}
                    {userInfo.role === "doctor" && (
                      <>
                        {/* <LinkContainer to="/doctorprofile">
                          <Nav.Link className="text-light">My Account</Nav.Link>
                        </LinkContainer> */}
                        <LinkContainer to="/admin/readyappointments">
                          <Nav.Link className="text-light">
                            Manage Appointments
                          </Nav.Link>
                        </LinkContainer>
                        <Nav.Link
                          className="text-light"
                          onClick={logoutHandler}
                        >
                          LogOut
                        </Nav.Link>{" "}
                      </>
                    )}
                    {userInfo.role === "lab" && (
                      <>
                        {/* <LinkContainer to="/doctorprofile">
                          <Nav.Link className="text-light">My Account</Nav.Link>
                        </LinkContainer> */}
                        <LinkContainer to="/admin/appointments">
                          <Nav.Link className="text-light">
                            Manage Appointments
                          </Nav.Link>
                        </LinkContainer>
                        <Nav.Link
                          className="text-light"
                          onClick={logoutHandler}
                        >
                          LogOut
                        </Nav.Link>{" "}
                      </>
                    )}
                  </>
                )
              ) : (
                <LinkContainer to="/signin">
                  <Nav.Link className="text-light">
                    <FaUserAlt /> SignIn
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
