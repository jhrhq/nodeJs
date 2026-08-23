import express from "express";
const router = express.Router();

let id = 1;
const notes = [];

router.get("/", (req, res) => {
  res.json({ succes: true, data: notes });
});

router.post("/", (req, res) => {
  const data = req.body;
  notes.push({ ...data, id: id++ });
  res.json({ succes: true, data: notes });
});

router.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  const noteIndex = notes.find((item) => item.id === parseInt(noteId));
  if (noteIndex === 1) {
    res.status(404).json({ succes: false, message: "Note not found" });
  } else {
    const deleted = notes.splice(noteIndex, 1);
    res.json({ succes: true, data: deleted });
  }
});

export default router;
