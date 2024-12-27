import AddressModel from '../../models/AddressModel.js'
import UserModel from '../../models/UserModel.js';

// Add address for user

const add_address = async (req, res) => {
    try {
      const { id, name, phone, addressline1, addressline2, city, state, pincode } = req.body;
  
      if (!id || !name || !phone || !addressline1 || !city || !state || !pincode) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const addressData = {
        userId: id,  
        name,
        phone,
        addressline1,
        addressline2,
        city,
        state,
        pincode,
      };
  
      const existUser = await UserModel.findById(id);
  
      if (existUser) {
        const address = new AddressModel(addressData);
        await address.save();
        res.status(201).json({ message: 'Address added successfully', address });
      } else {
        res.status(400).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while adding the address' });
    }
  };
  
// get Address for user
  
const get_all_address = async (req, res) => {
    try {
      const { id } = req.params
  
      if (!id) {
        return res.status(400).json({ message: "Id is required!" })
      }
  
      const user = await UserModel.findById(id)
  
      if (!user) {
        return res.status(400).json({ message: "User not found!" })
      }
  
      const address = await AddressModel.find({ userId: id })
  
      if (address.length === 0) {
        return res.status(404).json({ message: "Address not found!" })
      }
  
      return res.status(200).json({ address })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal server error" }) // Return error response
    }
  }
  
// Get current address for Edit Address
  
const get_current_address = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: "Id is required" });
      }
  
      const address = await AddressModel.findById(id);
  
      if (!address) {
        return res.status(400).json({ message: "Address not found!" });
      }
  
      res.status(200).json({ message: "Successfully fetched!", address });
    } catch (error) {
      console.error('Error fetching address:', error.message);
      res.status(500).json({ message: "Internal server error" });
    }
}

export{
    get_all_address,
    add_address,
    get_current_address
}