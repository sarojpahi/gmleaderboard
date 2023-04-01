import axios from "axios";

export default async function handler(req, res) {
  const { page = 1 } = req.query;
  const skip = (page - 1) * 15;

  try {
    const response = await axios.get(
      `http://3.112.193.149/gmuser/leaderboard?skip=${skip}&limit=15`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
