import asyncHandler from "../helpers/middlewares/asyncHandler.js";
import Test from "../models/Test.js";
const getTests = asyncHandler(async (req, res) => {
  const tests = await Test.find({});
  res.status(200).json(tests);
});

const getTestById = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  res.status(200).json(test);
});

const deleteTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (test) {
    await Test.deleteOne({ _id: test._id });
    res.status(200).json({ message: "test deleted " });
  } else {
    res.status(404);
    throw new Error("Cannot find Test");
  }
});

const updateTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (test) {
    test.name = req.body.name || test.name;
    test.description = req.body.description || test.description;
    test.price = req.body.pice || test.price;

    test.schedule = req.body.schedule || test.schedule;
    const updatetest = await test.save();
    res.status(200).json({
      _id: updatetest._id,
      name: updatetest.name,
      description: updatetest.description,
      price: updatetest.price,
      schedule: updatetest.schedule,
    });
  } else {
    res.status(404);
    throw new Error("Cannot find test");
  }
});

const addTest = asyncHandler(async (req, res) => {
  const { name, description, price, schedule } = req.body;
  const test = await Test.create({
    name,
    description,
    price,
    schedule,
  });
  res.status(201).json({
    _id: test._id,
    name: test.name,
    description: test.description,
    schedule: test.schedule,
    price: test.price,
  });
});
export { getTests, getTestById, deleteTest, updateTest, addTest };
