import NotesModel from "../models/Notes.js";



const createNotes = async (req,res)=>
{
    try {
       const userId = req.userId;
       const {title} = req.body;

       if(!title)
       {
        return res.status(303).message({success:false,message:"Title are Required!"})
       }

       const NewNotes = new NotesModel({
        title, userId
       });

       await NewNotes.save()

       res.status(200).json({successs:true,message:"Notes Created SUCCESSFULLY",Notes:NewNotes});



    } catch (error) {

        console.log(error);
        res.status(200).json({successs:true,message:"Internal Server Error!"});
    }
};

const updateNotes = async (req,res)=>
{

    try {
        const userId = req.userId
        const NotesId = req.params.id;
        const {title} = req.body;
       
        const FindNotes = await NotesModel.findById(NotesId)

        if(!FindNotes)
        {
            return res.status(404).json({success:true,message:"Notes Not Found!"})
        }
        const Notesuserid = FindNotes.userId

        if(userId != Notesuserid)
        {
        return res.status(404).json({success:false,message:"Unauthorizd user!"}) 
        }

      const updateNotes = await NotesModel.findByIdAndUpdate(
        {_id:NotesId},
        {title:title},{new:true}
      )

      res.status(200).json({success:true,message:"Notes Updated Successfully!",updateNotes})        
    } catch (error) {
        console.log(error);
        res.status(200).json({successs:true,message:"Internal Server Error!"});
    }
   
}

const deleteNotes = async (req,res)=>
{
   try {
    
    const userId = req.userId
        const NotesId = req.params.id;
        const {title} = req.body;

        const FindNotes = await NotesModel.findById(NotesId)

        if(!FindNotes)
        {
            return res.status(404).json({success:true,message:"Notes Not Found!"})
        }

        const Notesuserid = FindNotes.userId

        if(userId != Notesuserid)
        {
        return res.status(404).json({success:false,message:"Unauthorizd user!"}) 
        }

        const deletednote = await NotesModel.findByIdAndDelete( NotesId )
    
          res.status(200).json({success:true,message:"Notes Deleted Successfully!",deletednote})   
    
    
   } catch (error) {
    console.log(error);
        res.status(200).json({successs:true,message:"Internal Server Error!"});
   }
}

const getNotes = async (req,res)=>
{
    try {
        const userId = req.userId;
        const Notes = await NotesModel.find({userId});

        if(!Notes)
        {
            res.status(404).json({success:false,message:"No Data Found!"});
        }
        res.status(200).json({status:true,Notes})
        
    } catch (error) {
         console.log(error);
        res.status(200).json({successs:true,message:"Internal Server Error!"});
        
    }
}


export  {createNotes,updateNotes,deleteNotes,getNotes};