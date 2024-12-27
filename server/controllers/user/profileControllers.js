import UserModel from '../../models/UserModel.js';

// Update the user Profile 

const update_profile = async (req, res) => {
    try {
      const { id, name, phone, password } = req.body;
  
      if (!id || !name || !phone || !password) {
        return res.status(400).json({ message: "All fields are required !" });
      }
  
  
      const currentUser = await UserModel.findById(id);
      if (!currentUser) {
        return res.status(400).json({ message: "User not found!" });
      }
  
  
      const updatedUser = {
        name,
        phone,
        password
      };
  
      const user = await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
  
      if (user) {
        res.status(200).json({
          message: "Updated Successfully",
          updatedUser: user,
        });
      } else {
        res.status(400).json({ message: "Update failed!" });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(400).json({ message: "Failed to update!" });
    }
  }

export {
    update_profile
}