// without grouping max mark

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

// with projection
db.students.aggregate([
  {
    $group: {
      _id: "",
      maxMark: {
        $max: "$marks",
      },
    },
  },
  {
    $project: {
      _id: 0,
      maxMark: 1,
    },
  },
]);

// With Grouping find the following,

// 1. avg marks for each student
db.students.aggregate([
  {
    $group: {
      _id: "$name",
      avgMark: {
        $avg: "$marks",
      },
    },
  },
  {
    $project: {
      _id: 0,
      name: "$_id",
      avgMark: 1,
    },
  },
]);

// find the total marks scored by each student
db.students.aggregate([
  {
    $group: {
      _id: "$name",
      totalMark: {
        $sum: "$marks",
      },
    },
  },
  {
    $project: {
      _id: 0,
      name: "$_id",
      totalMark: 1,
    },
  },
]);

// find the total mark only for Daniel
db.students.aggregate([
  {
    $match: { name: "Daniel" },
  },
  {
    $group: {
      _id: "$name",
      totalMark: {
        $sum: "$marks",
      },
    },
  },
  {
    $project: {
      _id: 0,
      name: "$_id",
      totalMark: 1,
    },
  },
]);

// Count of todos for each user
db.todos.aggregate([
  {
    $group: {
      _id: "$userId",
      noOfTodos: {
        $sum: 1,
      },
    },
  },
  {
    $project: {
      _id: 0,
      userId: "$_id",
      noOfTodos: 1,
    },
  },
]);

// find all the items which urgent
db.items.aggregate([
  {
    $match: {
      status: "urgent",
    },
  },
]);

// Q5: find total urgent qty for each items
// Step 1:
// filter the urgent items using $match
// Step 2:
// group with item name
db.items.aggregate([
  {
    $match: {
      status: "urgent",
    },
  },
  {
    $group: {
      _id: "$product",
      qtyUrgent: {
        $sum: "$qty",
      },
    },
  },
  {
    $project: {
      _id: 0,
      qtyUrgent: 1,
      product: "$_id",
    },
  },
]);

// InsertMany
db.items.insertMany([
  { qty: 50, status: "new" },
  { qty: 100, status: "urgent" },
]);

// insertOne
db.items.insertOne({ qty: 50, status: "new" });

// Update a record as completed
db.todos.updateOne(
  { title: "Visit the museum" },
  {
    $set: { isCompleted: true },
  }
);

// Upsert a record if it is not present in collection
db.todos.updateOne(
  { title: "Visit Taj Mahal" },
  {
    $set: { isCompleted: false },
  },
  {
    upsert: true,
  }
);

// Replace
db.todos.replaceOne(
  { title: "Complete assignment" },
  { userId: 2, title: "Do Home Work", isCompleted: true, dueDate: "2023-11-28" }
);

// Delete Todos
// delete the Todo with title Read a book
db.todos.deleteOne({ title: "Read a book" });

// Delete all the Todos which belongs to userId 3
db.todos.deleteMany({ userId: 3 });
