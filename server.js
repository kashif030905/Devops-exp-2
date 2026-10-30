
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary student database
let students = [
    { id: 1, name: "Kashif", age: 21, course: "CSE" },
    { id: 2, name: "Rahul", age: 22, course: "IT" }
];

// 1. GET - Retrieve all students
app.get("/students", (req, res) => {
    res.status(200).json(students);
});

// 2. POST - Add a new student
app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
        ...req.body
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// 3. PUT - Update an existing student
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    Object.assign(student, req.body);
    res.status(200).json(student);
});

// 4. DELETE - Remove a student
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);
    res.status(200).json({ message: "Student deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
