import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  const result = await User.deleteMany({ name: "Pranav Vatsa" });

  res.status(200).json({
    message: "Deleted all users with name 'Pranav Vatsa'",
    deletedCount: result.deletedCount,
  });
}
