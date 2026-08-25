import express from "express";

const router = express.Router();

let id = 1;
const notes = [];

router.get("/", (_req, res) => {
  res.json({ data: notes, succes: true });
});

router.post("/", (req, res) => {
  const data = req.body;
  notes.push({ ...data, id: id++ });
  res.json({ data: notes, succes: true });
});

router.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  const noteIndex = notes.find((item) => item.id === parseInt(noteId));

  if (noteIndex === 1) {
    res.status(404).json({ message: "Note not found", succes: false });
  } else {
    const deleted = notes.splice(noteIndex, 1);
    res.json({ data: deleted, succes: true });
  }
});

export default router;
