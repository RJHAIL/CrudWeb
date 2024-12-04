import mongoose from "mongoose";

const NotesSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true, 
        },
        userId: {
            type: String,
            required: true, 
        },
    },
    {
        timestamps: true,
    }
);

const NotesModel = mongoose.model("Notes", NotesSchema); 
export default NotesModel;
