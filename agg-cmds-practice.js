// Find the maximum mark scored
db.students.aggregate([
  {
    $group: {
      _id: "",
      maxMark: {
        $max: "$marks",
      },
    },
  },
]);

// 2. find the minimum mark scored
db.students.aggregate([
  {
    $group: {
      _id: "",
      minMark: {
        $min: "$marks",
      },
    },
  },
]);

// 3. find the avg mark scored
db.students.aggregate([
  {
    $group: {
      _id: "",
      avgMark: {
        $avg: "$marks",
      },
    },
  },
]);

// with grouping
// find avg marks for each students
db.students.aggregate([
  {
    $group: {
      _id: "$name",
      avgMark: {
        $avg: "$marks",
      },
    },
  },
]);

// find the max marks for each students
db.students.aggregate([
  {
    $group: {
      _id: "$name",
      maxMark: {
        $max: "$marks",
      },
    },
  },
]);

// find the total marks for each students
db.students.aggregate([
  {
    $group: {
      _id: "$name",
      totalMarks: {
        $sum: "$marks",
      },
    },
  },
]);

// grouping with projection
// get the fields as name, totalMarks
db.students.aggregate([
  {
    $group: {
      _id: "$name",
      totalMarks: {
        $sum: "$marks",
      },
    },
  },
  {
    $project: {
      _id: 0,
      name: "$_id",
      totalMarks: 1,
    },
  },
]);

// Find the total marks only for Daniel
// Match --> filteration stage
db.students.aggregate([
  {
    $match: { name: "Daniel" },
  },
  {
    $group: {
      _id: "$name",
      totalMarks: {
        $sum: "$marks",
      },
    },
  },
  {
    $project: {
      _id: 0,
      name: "$_id",
      totalMarks: 1,
    },
  },
]);

// find the number todos for each userId
db.todos.aggregate([
  {
    $group: {
      _id: "$userId",
      noOfTodos: {
        $sum: 1,
      },
    },
  },
]);

// Find all the items which is urgent
db.items.aggregate([
  {
    $match: {
      status: "urgent",
    },
  },
]);

// find total urgent qty for each items
db.items.aggregate([
  {
    $match: {
      status: "urgent",
    },
  },
  {
    $group: {
      _id: "$product",
      totalQty: {
        $sum: "$qty",
      },
    },
  },
  {
    $project: {
      _id: 0,
      product: "$_id",
      totalQty: 1,
    },
  },
]);

// Insert a new Student with marks as below,

// Name: Ruthuraj
// English: 78, Science: 87, Maths: 100

// insertMany
db.students.insertMany([
  {
    name: "Ruthuraj",
    subject: "Maths",
    marks: 100,
  },
  {
    name: "Ruthuraj",
    subject: "English",
    marks: 78,
  },
  {
    name: "Ruthuraj",
    subject: "Science",
    marks: 87,
  },
]);

// Add a new requirement for in the items the
// 'Iron Rod', 'urgent', 50

db.items.insertOne({
  product: "Iron Rod",
  status: "urgent",
  qty: 50,
});

// User Id 1 has completed the coding project
// update the coding project todo as completed
db.todos.updateOne(
  { title: "Complete coding project" },
  { $set: { isCompleted: true } }
);

// complete all the below Todos
// ['Complete assignment', 'Go to the gym', 'Write a blog post']
db.todos.updateMany(
  {
    title: {
      $in: ["Complete assignment", "Go to the gym", "Write a blog post"],
    },
  },
  { $set: { isCompleted: true } }
);

// Seems like userId 1 has a todo call Buy Groceries, that is he actually meant Buy Books

// title: 'Buy Books', isCompleted: false, userId: 1
db.todos.replaceOne(
  { title: "Buy groceries" },
  { userId: 1, title: "Buy Books", isCompleted: false }
);

// Update the maths mark for Jadeja to be 100
db.students.updateOne(
  { name: "Jadeja" },
  { $set: { name: "Jadeja", subject: "Maths", marks: 100 } },
  { upsert: true }
);
