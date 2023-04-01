import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const limit = 15;

  const getData = () => {
    axios
      .get(
        `http://3.112.193.149/gmuser/leaderboard?skip=${
          limit * (page - 1)
        }&limit=${limit}`
      )
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log(page);
    getData();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="p-4">
      <Head>
        <title>Leaderboard</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4 text-center">
        GMCHAD Leaderboard
      </h1>
      <table className="w-full rounded-lg overflow-hidden bg-white shadow-md">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="text-left text-gray-500 uppercase tracking-wider py-3 px-4 cursor-pointer">
              Rank
            </th>
            <th className="text-left text-gray-500 uppercase tracking-wider py-3 px-4 cursor-pointer">
              Name
            </th>
            <th className="text-left text-gray-500 uppercase tracking-wider py-3 px-4 cursor-pointer">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ Rank, discord_id, discord_name, gm_streak }, index) => (
            <tr
              key={discord_id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } border-b border-gray-200`}
            >
              <td className="text-gray-600 py-3 px-4">{Rank}</td>
              <td className="text-gray-600 py-3 px-4">{discord_name}</td>
              <td className="text-gray-600 py-3 px-4">{gm_streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={handlePrevPage}
          disabled={page <= 1}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 ml-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={handleNextPage}
          disabled={!data?.length || data.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
}
