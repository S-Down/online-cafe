import dbConnect from "../../../lib/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method, query } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find(query);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      console.log(req.body);
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
