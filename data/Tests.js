const tests = [
  {
    name: "test1",
    description: "sample description",
    price: 100,

    schedule: [
      {
        slot: "9:00AM-10:00AM",
        unavailableDates: ["2024-04-23T16:51:34.631Z"],
      },
      { slot: "10:00AM-11:00AM", unavailableDates: [] },
      {
        slot: "11:00AM-12:00PM",
        unavailableDates: ["2024-04-23T16:51:34.631Z"],
      },
      { slot: "12:00PM-1:00PM", unavailableDates: [] },
    ],
  },
  {
    name: "test2",
    description: "sample description",
    price: 100,

    schedule: [
      {
        slot: "9:00AM-10:00AM",
        unavailableDates: ["2024-04-23T16:51:34.631Z"],
      },
      { slot: "10:00AM-11:00AM", unavailableDates: [] },
      {
        slot: "11:00AM-12:00PM",
        unavailableDates: ["2024-04-23T16:51:34.631Z"],
      },
      { slot: "12:00PM-1:00PM", unavailableDates: [] },
    ],
  },
];

export default tests;
