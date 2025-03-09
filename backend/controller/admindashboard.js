import Payment from "../model/Payment.js";
import { User } from "../model/user.model.js";
import Video from "../model/video.model.js";
import Workshop from "../model/workshop.js";


export const UserCount = async (req, res) => {
  const count = await User.countDocuments();
  console.log(count);
  
  res.json({ count });
};

export const VideoCount = async (req, res) => {
  const count = await Video.countDocuments();
  res.json({ count });
};

export const PaymentCount = async (req, res) => {
  const totalAmount = await Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
  res.json({ total: totalAmount[0]?.total || 0 });
};


export const WorkshopCount = async (req, res) => {
  const count = await Workshop.countDocuments();
  res.json({ count });
};

export const monthly = async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          totalPayments: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const videos = await Video.aggregate([
      {
        $group: {
          _id: { $month: "$uploadDate" },
          totalVideos: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const workshops = await Workshop.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          totalWorkshops: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const data = monthNames.map((month, index) => ({
      name: month,
      payments: payments.find(p => p._id === index + 1)?.totalPayments || 0,
      videos: videos.find(v => v._id === index + 1)?.totalVideos || 0,
      workshops: workshops.find(w => w._id === index + 1)?.totalWorkshops || 0,
    }));
    console.log(data);
    
    res.json(data);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
