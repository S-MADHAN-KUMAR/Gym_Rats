import mongoose from 'mongoose'

const ProductOfferShema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId},
   products: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId },
          name: { type: String },
          price: { type: Number },
          description: { type: String },
          image: { type: String },
        },
      ],
      discount: {
        type: Number,
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
      endDate: {
        type: Date,
      },
      status: {
        type : Boolean , default:true
    },
},{
    timestamps:true
})

const ProductOfferModel = mongoose.model('Addresses',ProductOfferShema)
export default ProductOfferModel
