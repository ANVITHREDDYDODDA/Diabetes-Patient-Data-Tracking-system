import User from "../models/User.js";
import asyncHandler from "../helpers/middlewares/asyncHandler.js";
import Appointment from "../models/Appointment.js";
import Test from "../models/Test.js";
import Payment from "../models/payment.js";

const createAppointment = asyncHandler(async (req, res) => {
  const { appointmentItems, slot_id, Price, taxPrice, totalPrice, date } =
    req.body;

  if (appointmentItems && appointmentItems.length === 0) {
    res.status(400);
    throw new Error("no Appointment");
  }

  const appointment = new Appointment({
    details: {
      testName: appointmentItems.testName,
      appointmentDate: appointmentItems.date,
      appointmentTime: appointmentItems.slot,
    },
    date,
    slot_id,
    user: req.user._id,
    test: appointmentItems.test,
    Price,
    taxPrice,
    totalPrice,
  });

  const createdappointment = await appointment.save();
  res.status(201).json(createdappointment);
});

const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "user test"
  );
  if (appointment) {
    res.status(200).json(appointment);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

const updateStatus = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (appointment) {
    appointment.Status = "Completed";
    appointment.feedback = req.body.comment;
    const updatedappointment = await appointment.save();

    res.json(updatedappointment);
  } else {
    res.status(404);
    throw new Error("appointment not found");
  }
});

const updateAppointmentToPaid = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "user test"
  );

  const { id, status, update_time, email_address } = req.body;

  const payment = new Payment({ id, status, update_time, email_address });
  const createdPayment = await payment.save();

  if (appointment) {
    await Test.updateOne(
      { "schedule._id": appointment.slot_id },
      { $push: { "schedule.$.unavailableDates": appointment.date } }
    );

    appointment.isPaid = true;
    appointment.paymentID = createdPayment._id;
    appointment.paidAt = Date.now();
    appointment.Status = "Paid";
    const updatedappointment = await appointment.save();

    res.json(updatedappointment);
  } else {
    res.status(404);
    throw new Error("appointment not found");
  }
});

const updateAppointmentToCancel = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    "user test"
  );

  if (appointment) {
    await Test.updateOne(
      { "schedule._id": appointment.slot_id },
      { $pull: { "schedule.$.unavailableDates": appointment.date } }
    );
    appointment.Status = "Canceled";
    const updatedappointment = await appointment.save();

    res.json(updatedappointment);
  } else {
    res.status(404);
    throw new Error("appointment not found");
  }
});

const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.params.id }).populate(
    "test"
  );
  res.status(200).json(appointments);
});

const getDoctorAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({
    doctor: req.params.id,
  }).populate("user");
  res.status(200).json(appointments);
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({}).populate("user test");
  res.status(200).json(appointments);
});

const getReadyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({}).populate("user test");
  res.status(200).json(appointments);
});

const createTestReport = asyncHandler(async (req, res) => {
  const {
    report,
    testId,
    name,
    weight,
    height,
    age,
    bp,
    hba1c,
    fast,
    post,
    random,
    pulse,
  } = req.body;

  const appointment = await Appointment.findById(req.params.id);

  const user = await User.findById(appointment.user);

  if (appointment) {
    const feedback = {
      name: name,
      report,
      test: testId,
      weight,
      height,
      age,
      bp,
      hba1c,
      fast,
      post,
      random,
      pulse,
    };
    // appointment.patientInfo.weight = weight;
    // appointment.patientInfo.height = height;
    // appointment.patientInfo.age = age;
    // appointment.patientInfo.bp = bp;
    appointment.testReport.push(feedback);
    user.testReport.push(feedback);
    appointment.Status = "ready for doctor";
    await user.save();
    await appointment.save();
    res.status(201).json({ message: "report added" });
  } else {
    res.status(404);
    throw new Error("appointment not found");
  }
});

const createPrescription = asyncHandler(async (req, res) => {
  const { medicine, doctorId, name, qty, comment } = req.body;

  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    const pre = {
      name: name,
      doctor: doctorId,
      medicine,
      qty,
      comment,
    };
    appointment.prescription.push(pre);
    await appointment.save();
    res.status(201).json({ message: "report added" });
  } else {
    res.status(404);
    throw new Error("appointment not found");
  }
});
export {
  createAppointment,
  getAppointmentById,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentToPaid,
  updateStatus,
  getReadyAppointments,
  updateAppointmentToCancel,
  getDoctorAppointments,
  createTestReport,
  createPrescription,
};
