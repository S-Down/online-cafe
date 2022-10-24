import User from "../../../models/User";
import Cart from "../../../models/Cart";
import dbConnect from "../../../lib/mongo";
import { hashPassword } from "../../../lib/authHelpers";
import NextCors from "nextjs-cors";

const handler = async (req, res) => {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    try {
      const { name, email, password } = req.body;
      const isExisting = await User.findOne({ email: email });
      // check whether the user's email exists
      if (isExisting) {
        res.status(422).json({ msg: "该邮箱已绑定用户" });
      } else {
        // create new user in the db
        const user = await User.create({
          name,
          email,
          password: await hashPassword(password, 12),
        });
        // create cart for the new user
        const cart = await Cart.create({
          user: user.email,
        });
        console.log("cart: ", cart);
        const newUser = await User.findByIdAndUpdate(
          user._id,
          { cart: cart._id },
          { new: true }
        );
        console.log("newUser: ", newUser);
        res.status(200).json({ msg: "新用户创建成功", newUser });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // if (method === "OPTIONS") {
  //   return res.status(200).send("ok");
  // }
};

export default handler;
