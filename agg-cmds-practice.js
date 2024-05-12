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
