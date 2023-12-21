import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Product'
    },
    products: [{
        product: String,
        quantity: Number
    }]
},
{ _id: false })

const CartModel = mongoose.model("carts", cartSchema)

// export { CartModel };
export default CartModel
