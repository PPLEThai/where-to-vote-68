import { useEffect, useState } from "react";

const provinces = [
  "กรุงเทพมหานคร",
  "กระบี่",
  "กาญจนบุรี",
  "กาฬสินธุ์",
  "กำแพงเพชร",
  "ขอนแก่น",
  "จันทบุรี",
  "ฉะเชิงเทรา",
  "ชลบุรี",
  "ชัยนาท",
  "ชัยภูมิ",
  "ชุมพร",
  "เชียงราย",
  "เชียงใหม่",
  "ตรัง",
  "ตราด",
  "ตาก",
  "นครนายก",
  "นครปฐม",
  "นครพนม",
  "นครราชสีมา",
  "นครศรีธรรมราช",
  "นครสวรรค์",
  "นนทบุรี",
  "นราธิวาส",
  "น่าน",
  "บึงกาฬ",
  "บุรีรัมย์",
  "ปทุมธานี",
  "ประจวบคีรีขันธ์",
  "ปราจีนบุรี",
  "ปัตตานี",
  "พระนครศรีอยุธยา",
  "พะเยา",
  "พังงา",
  "พัทลุง",
  "พิจิตร",
  "พิษณุโลก",
  "เพชรบุรี",
  "เพชรบูรณ์",
  "แพร่",
  "ภูเก็ต",
  "มหาสารคาม",
  "มุกดาหาร",
  "แม่ฮ่องสอน",
  "ยโสธร",
  "ยะลา",
  "ร้อยเอ็ด",
  "ระนอง",
  "ระยอง",
  "ราชบุรี",
  "ลพบุรี",
  "ลำปาง",
  "ลำพูน",
  "เลย",
  "ศรีสะเกษ",
  "สกลนคร",
  "สงขลา",
  "สตูล",
  "สมุทรปราการ",
  "สมุทรสงคราม",
  "สมุทรสาคร",
  "สระแก้ว",
  "สระบุรี",
  "สิงห์บุรี",
  "สุโขทัย",
  "สุพรรณบุรี",
  "สุราษฎร์ธานี",
  "สุรินทร์",
  "หนองคาย",
  "หนองบัวลำภู",
  "อ่างทอง",
  "อำนาจเจริญ",
  "อุดรธานี",
  "อุตรดิตถ์",
  "อุทัยธานี",
  "อุบลราชธานี",
]; // Add more provinces as needed

export default function YourPen() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [inputProvince, setInputProvince] = useState("");
  const [filteredProvinces, setFilteredProvinces] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const provinceFromUrl = searchParams.get("p");
    if (provinceFromUrl && provinces.includes(provinceFromUrl)) {
      setSelectedProvince(provinceFromUrl);
      setInputProvince(provinceFromUrl);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputProvince(value);
    setShowDropdown(true);

    const filtered = provinces.filter((province) =>
      province.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProvinces(filtered);
  };

  const selectProvince = (province: string) => {
    setSelectedProvince(province);
    setInputProvince(province);
    setShowDropdown(false);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("p", province);
    window.history.pushState(null, "", `?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-black p-4 flex justify-center items-center">
      <div className="max-w-[700px] bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 bg-gradient-to-br from-white to-blue-300">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          ปากกาของคุณ มีมูลค่าเท่าไหร่?
        </h1>

        <p className="text-lg text-[#222] font-regular font-body">
          กรุณาเลือกจังหวัดของคุณ
        </p>
        <div className="relative">
          <input
            type="text"
            value={inputProvince}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="พิมพ์เพื่อค้นหาจังหวัด..."
          />

          {showDropdown && filteredProvinces.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto z-10 text-lg">
              {filteredProvinces.map((province) => (
                <li
                  key={province}
                  onClick={() => selectProvince(province)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {province}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedProvince && (
          <div className="mt-2">
            <img
              src={`https://election-d10n-api.pplethai.org/poster/1/${encodeURIComponent(
                selectedProvince
              )}.png?v=2`}
              alt={`Poster for ${selectedProvince}`}
              className="w-full rounded-lg shadow-md"
            />
          </div>
        )}
        {selectedProvince && (
          <p className="text-lg text-[#222] font-regular font-body text-center">
            สามารถกดค้างที่รูป หรือคลิกขวาเพื่อดาวน์โหลดได้
          </p>
        )}
      </div>
    </div>
  );
}
