import UserModel from '../../models/UserModel.js';

// Get All Users

const get_all_users = async (req, res) => {
    try {
      const users = await UserModel.find()
      if (!users) {
        res.status(200).json({ message: "No users are found!" });
      }
      else {
        res.status(200).json(users)
      }
    } catch (error) {
  
    }
  }
  
// Block User
  
const block_users = async (req, res) => {
    try {
      console.log('Request body:', req.body);
  
      const { id, status } = req.body;
  
  
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      
      const user = await UserModel.findByIdAndUpdate(id, { status }, { new: true })
  
      if (user) {
        console.log(`User with id ${id} has been ${status === "active" ? 'active' : 'block'}.`);
  
        
        return res.status(200).json({ message: `User with id ${id} has been ${status === "active" ? 'Active' : 'Blocked'}.` });
      } else {
        console.log(`Product with id ${id} not found.`);
  
        return res.status(404).json({ message: `User with id ${id} not found.` });
      }
    } catch (error) {
      console.error('Error updating user status:', error);
  
  
      return res.status(500).json({ message: 'Error updating user status', error: error.message });
    }
  }


export {
    get_all_users,
    block_users,
}