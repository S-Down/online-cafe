import dbConnect from "../../../lib/mongo";
import Cart from "../../../models/Cart";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const cart = await Cart.findById(id);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "PUT") {
    try {
      const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
