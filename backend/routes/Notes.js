import express from "express"
import { createNotes, updateNotes,deleteNotes,getNotes } from "../controllers/Notes.js";
import VerificationToken from "../middleware/Verification.js";

const NotesRoutes = express.Router();

NotesRoutes.post("/createNotes",VerificationToken,createNotes);
NotesRoutes.put("/updateNotes/:id",VerificationToken,updateNotes);
NotesRoutes.delete("/deleteNotes/:id",VerificationToken,deleteNotes);
NotesRoutes.get("/getNotes",VerificationToken,getNotes);


export default NotesRoutes;