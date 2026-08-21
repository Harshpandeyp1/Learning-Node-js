import express from "express";
import cors from "cors";
import db from "./config/db.js";
import User from "./Models/UserModel.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Node.js server is running!");
});

// Example API
app.get("/api/users", (req, res) => {
    res.json([
        { id: 1, name: "Harsh" },
        { id: 2, name: "Rahul" }
    ]);
});

app.post("/users", async (req,res)=>{
    try{

      const{name,email,password,age}=req.body;
      const user=new User({
            name,email,password,age
      })
      await user.save();

      return res.status(201).json({
        message:"new data saved"
      });
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
})
app.get("/getUsers", async (req, res)=>{
  try{
    const userId=req.params.id;
    const  user=await User.findById(userId);
    return res.status(200).json({
      message:"id fetched successfully",
      userId,
    });
  }catch(error){
    return res.status(500).json({
      message:"Internal server error",
      error:error.message,
    })
  }
})

app.put("/updateUsers/:id",async(req,res)=>{
    try{
      const {name,email,password,age}=req.body;
      const {id}=req.params;
      const updateUser=await User.findUserByIdAndUpdate(
         id,
         {name,email,password,age},
         {new:true}
      );
    return res.status(200).json({ message:"update successful",
   user:updateUser});
   

    }catch(err)
{
  return res.status(500).json({
     message:"Server error",
  error:err.message});
  }
   
})

app.delete("/deleteUser/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      message:"id deleted",
    })
  }catch(err){
      return res.status(500).json({
     message:"Server error",
  error:err.message});
  }
})
  
 








// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});