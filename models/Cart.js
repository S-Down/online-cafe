import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      maxlength: 60,
    },
    products: {
      type: [
        {
          img: {
            type: String,
          },
          name: {
            type: String,
          },
          category: {
            type: [String],
          },
          extras: {
            type: String,
          },
          price: {
            type: Number,
          },
          quantity: {
            type: Number,
          },
        },
      ],
    },
    counts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
