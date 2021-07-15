module.exports = {
  NOT_LOGGED_IN: 1,
  NO_PENDING_VISITS: 2,
  NO_REPORTS: 3,
  colors: [
    "#e34309",
    "#7d47bd",
    "#3f51b5",
    "#374874",
    "#3ede04",
    "#b71540",
    "#4a69bd",

    "#c653ff",

    "#6a89cc",
    "#82ccdd",
    "#b8e994",
    "#f8c291",
    "#e55039",
    "#fad390",
    "#78e08f",
    "#60a3bc",
    "#f6b93b",
    "#eb2f06",
    "#38ada9",
    "#1e3799",
    "#0c2461",
    "#0a3d62",

    "#079992",
  ],
  INDEX_OLD_REPORT: 0,
  INDEX_NEW_REPORT: 1,
  grievanceCategories: [
    "Academics",
    "Obedience",
    "Classroom",
    "Library",
    "Playground",
    "Computer Lab",
    "Science Lab",
    "Canteen",
    "Buses",
    "Toilet",
  ],
  parameterEstimateWarningThreshold: 50,
  QUESTION_TYPE_DATA: 1,
  QUESTION_TYPE_SCORE: 0,
  QUESTION_TYPE_YES_OR_NO: 2,
  MAX_SCORE: 5,
  qTypes: [
    { type: "Score", value: 0 },
    { type: "Data", value: 1 },
    { type: "Yes/No", value: 2 },
  ],
  // appUrl: "http://ec2-15-207-86-28.ap-south-1.compute.amazonaws.com:5000",
  // appUrl: "http://ec2-13-234-240-75.ap-south-1.compute.amazonaws.com:5000",
  appUrl: "https://smartindiahackathon-qilz-2020.herokuapp.com",
};