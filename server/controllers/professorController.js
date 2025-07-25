// controllers/professorController.js
import prisma from "../models/prismaClient.js";

export const createProfessor = async (req, res) => {
  const { name, email, departmentCode } = req.body;

  try {
    const department = await prisma.department.findUnique({
      where: { code: departmentCode },
    });

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    const prof = await prisma.professor.create({
      data: {
        name,
        email,
        departmentId: department.id,
      },
    });

    res.status(201).json(prof);
  } catch (err) {
    console.error("Error creating professor:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getAllProfessors = async (req, res) => {
  try {
    const professors = await prisma.professor.findMany({
      include: { department: true },
    });
    res.json(professors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching professors" });
  }
};
// UPDATE professor
export const updateProfessor = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updated = await prisma.professor.update({
      where: { id },
      data: { name, email },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating professor" });
  }
};

// DELETE professor
export const deleteProfessor = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.professor.delete({ where: { id } });
    res.json({ message: "Professor deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting professor" });
  }
};