"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Tuition = () => {
  const [tuitionData, setTuitionData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTuitionData = async () => {
      const res = await fetch("https://backendminiapp.onrender.com/api/tuition");
      const data = await res.json();
      setTuitionData(data);
    };
    fetchTuitionData();
  }, []);

  if (!tuitionData) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4  justify-center flex">Học phí và Chính sách</h1>
      <Link className="text-blue-500 underline mb-4 block" href="/">
        Quay lại
      </Link>

      {/* Hiển thị thông tin học phí */}
      <h2 className="text-xl font-semibold mb-2">Thông tin học phí:</h2>
      <ul className="mb-4">
        {tuitionData.tuitionFees.map((fee, index) => (
          <li key={index} className="mb-2">
            <strong>{fee.system}</strong>: {fee.total} - {fee.average}
          </li>
        ))}
      </ul>

      {/* Thông tin thêm */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Thông tin thêm:</h2>
        <p>{tuitionData.additionalInfo}</p>
      </div>

      {/* Lưu ý về chính sách */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Lưu ý về học phí:</h2>
        <ul className="list-disc ml-6">
          {tuitionData.policyNotes.map((note, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded mb-1">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tuition;
