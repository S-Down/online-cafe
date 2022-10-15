import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: [Number],
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    tastes: {
      type: [
        {
          text: {
            type: String,
            required: true,
          },
          img: {
            type: String,
            required: true,
          },
          len: {
            type: Number,
            required: true,
          },
          desc: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    temp: {
      type: [
        {
          text: {
            type: String,
            required: true,
          },
          img: {
            type: String,
            required: true,
          },
          len: {
            type: Number,
            required: true,
          },
          desc: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
