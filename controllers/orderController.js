

const orders = require("../models/orderModel");

// Get all orders of logged-in user
exports.getMyOrdersController = async (req, res) => {
  try {
    const userID = req.user.id;

    const userOrders = await orders
      .find({ userID })
      .sort({ createdAt: -1 });

    return res.status(200).json(userOrders);

  } catch (error) {
    console.error(error);
    return res.status(500).json("Failed to fetch orders");
  }
};


// Get single order by ID (only if it belongs to logged-in user)
exports.getSingleOrderController = async (req, res) => {
  try {
    const userID = req.user.id;
    const { id } = req.params;

    const order = await orders.findById(id);

    if (!order) {
      return res.status(404).json("Order not found");
    }

    // Ensure user can only access their own order
    if (order.userID.toString() !== userID) {
      return res.status(403).json("Unauthorized access to this order");
    }

    return res.status(200).json(order);

  } catch (error) {
    console.error(error);
    return res.status(500).json("Failed to fetch order");
  }
};