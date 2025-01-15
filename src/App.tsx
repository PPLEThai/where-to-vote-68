import { useState, useCallback } from "react";
import "./App.css";
import { Candidate } from "./types/candidate";
import candidatesRaw from "./assets/candidates.json";
import { BoraResponse } from "./types/bora";
import { Checkbox } from "./components/Checkbox";
import logo from "./assets/logo.png";
import { FormattedInput } from "@buttercup/react-formatted-input";
const candidates = candidatesRaw as { [key: string]: Candidate };
function App() {
  const [boraResult, setBoraResult] = useState<BoraResponse[]>();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = useCallback(async () => {
    const resp = await fetch(
      `${
        import.meta.env.VITE_BORA_CORS_URL
      }https://boraservices.bora.dopa.go.th/api/eleloc/v1/eleloccheck/${inputValue.replace(
        /-/g,
        ""
      )}`
    );
    if (resp.ok) {
      const data = await resp.json();
      data.filter((item: BoraResponse) => item.eledate === 25680201);
      setBoraResult(data);
      if (data.length === 0) {
        setError(
          "ไม่พบข้อมูลสิทธิการเลือกตั้งท้องถิ่นของท่านในวันที่ 1 กุมภาพันธ์ นี้"
        );
      }
    } else {
      setBoraResult([]);
      setError(
        "ไม่พบข้อมูลสิทธิการเลือกตั้งท้องถิ่นของท่านในวันที่ 1 กุมภาพันธ์ นี้"
      );
    }
  }, [inputValue, setBoraResult]);
  let candidateKey = "";
  let candidate = null;
  const idPattern = [
    { char: /\d/, repeat: 1 },
    { exactly: "-" },
    { char: /\d/, repeat: 4 },
    { exactly: "-" },
    { char: /\d/, repeat: 5 },
    { exactly: "-" },
    { char: /\d/, repeat: 2 },
    { exactly: "-" },
    { char: /\d/, repeat: 1 },
  ];
  if (boraResult && boraResult.length > 0) {
    const item: BoraResponse = boraResult[0];
    const description: string = item.desp;
    const matchDistrict = description.match(/อำเภอ(.+) จังหวัด/);
    const matchProvince = description.match(/จังหวัด(.+)$/);
    candidateKey = `${matchProvince?.[1].trim()}::${matchDistrict?.[1].trim()}::${
      item.earea
    }`;
    // TODO: remove this
    // candidateKey = "นครปฐม::สามพราน::3";
    // candidateKey = "จันทบุรี::สอยดาว::2";
    candidate = candidates[candidateKey as keyof typeof candidates];
    console.log("candidate", candidate);
    if (!candidate) {
      candidateKey = `${matchProvince?.[1].trim()}`;
      candidate = candidates[candidateKey as keyof typeof candidates];
      console.log("candidate2", candidate);
    }
  }
  return (
    <div className="flex flex-col items-center pt-5 sm:pt-20 px-4 sm:px-6 pb-10">
      <div>
        <img src={logo} alt="PPLE Logo" className="w-[200px] sm:w-[300px]" />
      </div>
      <div className="max-w-[600px] mx-auto mt-5 sm:mt-20 bg-white/40 rounded-[20px] p-6">
        <h1 className="text-center text-2xl font-bold">
          ตรวจสอบหน่วยเลือกตั้งและหมายเลขผู้สมัคร นายกอบจ. และ
          ส.อบจ.ของพรรคประชาชน
        </h1>
        <div className="flex flex-col space-y-2 mt-5">
          <label htmlFor="inputValue" className="text-lg">
            เลขบัตรประจำตัวประชาชน
          </label>
          <FormattedInput
            format={idPattern}
            id="inputValue"
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={(formattedValue: string) => setInputValue(formattedValue)}
            className="px-4 py-2 border border-black text-lg rounded-lg flex-1 bg-white/40 hover:bg-white/70 transition-colors"
          />
          {error && <p className="text-[#6E0B0B]">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={inputValue.replace(/-/g, "").length !== 13}
            className="px-4 text-xl py-2 bg-[#191E50] text-[#ddd] rounded-lg disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#242E91] transition-colors"
          >
            ตรวจสอบ
          </button>
          <p className="text-sm text-[#222] font-regular">
            ข้อมูลเลขบัตรประจำตัวประชาชนของท่านจะถูกนำไปตรวจสอบกับเว็บไซต์ของสำนักบริหารการทะเบียน
            กรมการปกครอง โดยไม่มีการเก็บบันทึกไว้ในทุกกรณี
          </p>
          <p className="text-sm text-[#222] font-regular">
            หากท่านไม่ประสงค์ที่จะกรอกเลขบัตรประจำตัวประชาชน สามารถ
            <a
              href="https://boraservices.bora.dopa.go.th/election/enqelection-local/"
              target="_blank"
              className="underline"
            >
              คลิกที่นี่
            </a>
            เพื่อตรวจสอบสิทธิเลือกตั้งท้องถิ่นที่เว็บไซต์ของสำนักบริหารการทะเบียนด้วยตนเอง
            จากนั้นเมื่อทราบเขตเลือกตั้งของท่านแล้ว ให้กดปุ่ม
            ตรวจสอบโดยทราบเขตเลือกตั้ง ด้านล่าง
          </p>
          <button className="px-4 color-[#222] text-md py-2 bg-[#fff]/0 rounded-lg hover:bg-[#fff]/20 transition-colors">
            ตรวจสอบโดยทราบเขตเลือกตั้ง
          </button>
        </div>
      </div>

      {boraResult && boraResult.length > 0 && (
        <div className="max-w-[600px] mx-auto mt-8 bg-white/60 rounded-[20px] p-6 flex flex-col">
          <p className="text-md text-[#222] font-regular text-center mb-2">
            ท่านสามารถบันทึกหน้าจอนี้ไว้ได้เพื่อความสะดวกในการไปใช้สิทธิเลือกตั้ง
          </p>
          <h2 className="text-center text-3xl font-bold">
            หน่วยเลือกตั้งของท่าน
          </h2>
          <div className="grid grid-cols-[30%_70%] gap-x-4 gap-y-2 text-lg my-4">
            <div className="text-right">จังหวัด</div>
            <div className="">{boraResult[0].desc}</div>
            <div className="text-right">เขตเลือกตั้งที่</div>
            <div>
              {boraResult[0].earea}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หน่วยเลือกตั้งที่&nbsp;&nbsp;&nbsp;
              {boraResult[0].eunit}
            </div>
            <div className="text-right">สถานที่เลือกตั้ง</div>
            <div>{boraResult[0].desp}</div>
          </div>
          <h2 className="text-center text-3xl font-bold">
            ผู้สมัครของพรรคประชาชน
          </h2>
          <div className="my-3 flex flex-col items-center">
            <h2 className="text-center text-2xl font-bold mb-4 underline">
              ผู้สมัครนายกอบจ. {candidate?.province}
            </h2>
            {candidate?.obj_full_name && (
              <div className="flex flex-col items-center">
                <img
                  src={candidate?.obj_profile_picture ?? ""}
                  alt="Candidate"
                  className="w-[30%] rounded-2xl"
                />
                <p className="text-3xl mt-4">
                  {candidate?.obj_full_name ?? ""}
                </p>
                <p className="text-5xl font-bold">
                  เบอร์ {candidate?.obj_candidate_number ?? ""}
                </p>
              </div>
            )}
            {!candidate?.obj_full_name && (
              <>
                <p>ไม่มีผู้สมัครนายกอบจ.ในนามพรรคประชาชน</p>
                <p>
                  หรือในการเลือกตั้งวันที่ 1 กุมภาพันธ์ นี้
                  ไม่มีการเลือกนายกอบจ.
                </p>
              </>
            )}
          </div>

          <div className="my-3 flex flex-col items-center">
            {candidate?.sobj_full_name && (
              <div>
                <h2 className="text-center text-2xl font-bold mt-8 mb-4 underline">
                  ผู้สมัครส.อบจ. อำเภอ{candidate?.district} เขต{" "}
                  {candidate?.district_no}
                </h2>
                <p className="text-center text-3xl font-regular">
                  {candidate?.sobj_full_name}
                </p>
                <p className="text-center text-5xl font-bold">
                  เบอร์ {candidate?.sobj_candidate_number}
                </p>
              </div>
            )}
            {!candidate?.sobj_full_name && (
              <>
                <h2 className="text-center text-2xl font-bold mt-8 mb-4 underline">
                  ผู้สมัครส.อบจ.
                </h2>
                <p>ไม่มีผู้สมัครส.อบจ.ในนามพรรคประชาชน</p>
                <p>
                  หรือในการเลือกตั้งวันที่ 1 กุมภาพันธ์ นี้ ไม่มีการเลือกส.อบจ.
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              {candidate?.obj_full_name && (
                <p className="mt-4 text-center rounded-lg text-xl">
                  บัตรสี{" "}
                  <span className="font-bold">{candidate?.obj_color_name}</span>{" "}
                  กาเบอร์{" "}
                  <span className="font-bold">
                    {candidate?.obj_candidate_number}
                  </span>
                </p>
              )}

              {candidate?.obj_full_name && (
                <Checkbox
                  text={candidate.obj_candidate_number ?? ""}
                  fillColor={candidate.obj_color_code ?? ""}
                />
              )}
            </div>

            <div>
              {candidate?.sobj_full_name && (
                <p className="mt-4 rounded-lg text-xl text-center">
                  บัตรสี{" "}
                  <span className="font-bold">
                    {candidate?.sobj_color_name}
                  </span>{" "}
                  กาเบอร์{" "}
                  <span className="font-bold">
                    {candidate?.sobj_candidate_number}
                  </span>
                </p>
              )}
              {candidate?.sobj_full_name && (
                <Checkbox
                  text={candidate.sobj_candidate_number ?? ""}
                  fillColor={candidate.sobj_color_code ?? ""}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
