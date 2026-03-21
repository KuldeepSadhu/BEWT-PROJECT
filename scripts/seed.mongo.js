const userIds = {
  admin: ObjectId("660000000000000000000001"),
  faculty1: ObjectId("660000000000000000000002"),
  faculty2: ObjectId("660000000000000000000003"),
  student1: ObjectId("660000000000000000000004"),
  student2: ObjectId("660000000000000000000005"),
  student3: ObjectId("660000000000000000000006"),
  student4: ObjectId("660000000000000000000007"),
};

const groupIds = {
  group1: ObjectId("660000000000000000000101"),
  group2: ObjectId("660000000000000000000102"),
};

db.users.deleteMany({
  _id: { $in: Object.values(userIds) },
});
db.students.deleteMany({
  userId: {
    $in: [userIds.student1, userIds.student2, userIds.student3, userIds.student4],
  },
});
db.staff.deleteMany({
  email: { $in: ["admin@college.edu", "coordinator@college.edu"] },
});
db.projecttypes.deleteMany({
  type: { $in: ["Minor Project", "Major Project"] },
});
db.academicyears.deleteMany({
  year: { $in: ["2025-2026", "2024-2025"] },
});
db.groups.deleteMany({
  _id: { $in: Object.values(groupIds) },
});
db.meetings.deleteMany({
  title: { $in: ["Project Inception", "Phase 1 Update", "Design Review"] },
});
db.submissions.deleteMany({
  title: { $in: ["Project Proposal", "SRS Document", "Design Document"] },
});

db.users.insertMany([
  {
    _id: userIds.admin,
    name: "Admin User",
    email: "admin@college.edu",
    password: "$2b$10$replace_with_real_hash",
    role: "admin",
    department: "Administration",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: userIds.faculty1,
    name: "Prof. Rajesh Sharma",
    email: "rajesh@college.edu",
    password: "$2b$10$replace_with_real_hash",
    role: "faculty",
    department: "Computer Science",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: userIds.faculty2,
    name: "Dr. Anjali Verma",
    email: "anjali@college.edu",
    password: "$2b$10$replace_with_real_hash",
    role: "faculty",
    department: "Information Technology",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: userIds.student1,
    name: "Kuldeep Sadhu",
    email: "kuldeep@example.com",
    password: "$2b$10$replace_with_real_hash",
    role: "student",
    department: "Computer Science",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: userIds.student2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    password: "$2b$10$replace_with_real_hash",
    role: "student",
    department: "Information Technology",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: userIds.student3,
    name: "Mike Ross",
    email: "mike@example.com",
    password: "$2b$10$replace_with_real_hash",
    role: "student",
    department: "Computer Science",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: userIds.student4,
    name: "Rachel Zane",
    email: "rachel@example.com",
    password: "$2b$10$replace_with_real_hash",
    role: "student",
    department: "Information Technology",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

db.students.insertMany([
  {
    userId: userIds.student1,
    name: "Kuldeep Sadhu",
    rollNo: "CS2021001",
    email: "kuldeep@example.com",
    department: "Computer Science",
    year: "Final Year",
    status: "Active",
    marks: { mid: 24, end: 41, internal: 18 },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: userIds.student2,
    name: "Sarah Smith",
    rollNo: "IT2021005",
    email: "sarah@example.com",
    department: "Information Technology",
    year: "Final Year",
    status: "Active",
    marks: { mid: 22, end: 39, internal: 17 },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: userIds.student3,
    name: "Mike Ross",
    rollNo: "CS2021012",
    email: "mike@example.com",
    department: "Computer Science",
    year: "Third Year",
    status: "Active",
    marks: { mid: 21, end: 35, internal: 16 },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: userIds.student4,
    name: "Rachel Zane",
    rollNo: "IT2021018",
    email: "rachel@example.com",
    department: "Information Technology",
    year: "Final Year",
    status: "Active",
    marks: { mid: 25, end: 44, internal: 19 },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

db.staff.insertMany([
  {
    name: "Admin User",
    role: "Super Admin",
    email: "admin@college.edu",
    lastLogin: "2026-03-18 10:30 AM",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Project Coordinator",
    role: "Coordinator",
    email: "coordinator@college.edu",
    lastLogin: "2026-03-18 02:15 PM",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

db.projecttypes.insertMany([
  {
    type: "Minor Project",
    semester: "6th Sem",
    credits: 2,
    description: "Small scale project for third year students.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: "Major Project",
    semester: "8th Sem",
    credits: 8,
    description: "Final year capstone project.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

db.academicyears.insertMany([
  {
    year: "2025-2026",
    startDate: "2025-07-01",
    endDate: "2026-06-30",
    isCurrent: true,
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    year: "2024-2025",
    startDate: "2024-07-01",
    endDate: "2025-06-30",
    isCurrent: false,
    status: "Closed",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

db.groups.insertMany([
  {
    _id: groupIds.group1,
    project: "Smart Attendance System",
    students: ["Kuldeep Sadhu", "Mike Ross"],
    guide: "Prof. Rajesh Sharma",
    status: "Approved",
    progress: 75,
    domain: "Artificial Intelligence & Machine Learning",
    abstract: "Attendance system using face recognition and automated logging.",
    technologies: ["Python", "OpenCV", "React.js", "Node.js", "MongoDB"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: groupIds.group2,
    project: "AI Resume Parser",
    students: ["Sarah Smith", "Rachel Zane"],
    guide: "Dr. Anjali Verma",
    status: "Approved",
    progress: 40,
    domain: "Natural Language Processing",
    abstract: "Resume analysis platform for structured profile extraction.",
    technologies: ["Python", "FastAPI", "React.js", "MongoDB"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

db.meetings.insertMany([
  {
    groupId: groupIds.group1,
    title: "Project Inception",
    type: "Review",
    date: "2026-03-10",
    time: "10:00 AM",
    status: "Completed",
    location: "Online",
    attendanceStatus: "Present",
    remarks: "-",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    groupId: groupIds.group1,
    title: "Phase 1 Update",
    type: "Progress Check",
    date: "2026-03-24",
    time: "02:00 PM",
    status: "Scheduled",
    location: "Lab 4",
    attendanceStatus: "Present",
    remarks: "-",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    groupId: groupIds.group2,
    title: "Design Review",
    type: "Review",
    date: "2026-03-28",
    time: "11:30 AM",
    status: "Upcoming",
    location: "Online",
    attendanceStatus: "Absent",
    remarks: "Medical Leave",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

db.submissions.insertMany([
  {
    groupId: groupIds.group1,
    title: "Project Proposal",
    date: "2026-03-05",
    student: "Kuldeep Sadhu",
    status: "Approved",
    remarks: "Good scope.",
    size: "2.4 MB",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    groupId: groupIds.group2,
    title: "SRS Document",
    date: "2026-03-11",
    student: "Sarah Smith",
    status: "Pending Review",
    remarks: "-",
    size: "1.8 MB",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    groupId: groupIds.group1,
    title: "Design Document",
    date: "2026-03-16",
    student: "Kuldeep Sadhu",
    status: "Rejected",
    remarks: "Needs more diagrams.",
    size: "3.1 MB",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);
