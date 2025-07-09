import asyncHandler from "../helpers/middlewares/asyncHandler.js";
import Doctor from "../models/Doctor.js";
import jwt from "jsonwebtoken";
const loginDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const staff = await Doctor.findOne({ email });

  if (staff && (await staff.checkPassword(password))) {
    const token = jwt.sign(
      { userID: staff._id, role: staff.role },
      process.env.SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: staff._id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      role: staff.role,
      ssn: staff.ssn,
      phone: staff.phone,
      firstLogin: staff.firstLogin,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password!");
  }
});

const logoutDoctor = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout staff" });
});

const getDoctors = asyncHandler(async (req, res) => {
  const staff = await Doctor.find({ role: "doctor" });
  res.status(200).json(staff);
});

const getLabs = asyncHandler(async (req, res) => {
  const staff = await Doctor.find({ role: "lab" });
  res.status(200).json(staff);
});

const getDoctorById = asyncHandler(async (req, res) => {
  const staff = await Doctor.findById(req.params.id).select("-password");
  res.status(200).json(staff);
});

const deleteDoctor = asyncHandler(async (req, res) => {
  const staff = await Doctor.findById(req.params.id);
  if (staff) {
    if (staff.role === "admin") {
      res.status(400);
      throw new Error("Cannot deleteStaff");
    }
    await Doctor.deleteOne({ _id: staff._id });
    res.status(200).json({ message: "Staff deleted " });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

const updateDoctor = asyncHandler(async (req, res) => {
  const staff = await Doctor.findById(req.params.id);
  if (staff) {
    staff.firstName = req.body.firstName || staff.firstName;
    staff.lastName = req.body.lastName || staff.lastName;
    staff.email = req.body.email || staff.email;
    staff.phone = req.body.phone || staff.phone;
    const updateStaff = await staff.save();
    res.status(200).json({
      _id: updateStaff._id,
      firstName: updateStaff.firstName,
      lastName: updateStaff.lastName,
      email: updateStaff.email,
      phone: updateStaff.phone,
    });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

const updateDoctorProfile = asyncHandler(async (req, res) => {
  const user = await Doctor.findById(req.body.doctorId);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.firstLogin = false;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      firstLogin: updatedUser.firstLogin,
      token: req.body.token,
    });
  } else {
    res.status(404);
    throw new Error("doctor not found");
  }
});

const registerDoctor = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, role } = req.body;
  const staff = await Doctor.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    role,
  });
  res.status(201).json({
    _id: staff._id,
    firstName: staff.firstName,
    lastName: staff.lastName,
    email: staff.email,
    role: staff.role,
    phone: staff.phone,
    firstLogin: staff.firstLogin,
  });
});

export {
  loginDoctor,
  logoutDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
  updateDoctor,
  registerDoctor,
  updateDoctorProfile,
  getLabs,
};
