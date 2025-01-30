import { useEffect, useState } from "react";
import "./Static.css";
import logo from "./assets/logo.png";
import { Candidate } from "./types/candidate";
import { Checkbox } from "./components/Checkbox";

const thaiSort = (arr: string[]) => {
  return arr.sort((a, b) => {
    return a.localeCompare(b, undefined, { sensitivity: "accent" });
  });
};

const uniqueArray = (ar: string[]) => {
  const j: { [key: string]: string } = {};

  ar.forEach(function (v) {
    j[v + "::" + typeof v] = v;
  });

  return Object.keys(j).map(function (v) {
    return j[v];
  });
};

function Static() {
  const [candidates, setCandidates] = useState<{ [key: string]: Candidate }>(
    {}
  );

  useEffect(() => {
    async function loadCandidates() {
      const candidatesRaw = await import("./assets/candidates.json");
      setCandidates(candidatesRaw.default);
    }
    loadCandidates();
  }, []);

  const provinces = thaiSort(
    uniqueArray(Object.keys(candidates).map((key) => key.split("::")[0]))
  );

  const candidatesByProvince = provinces.map((province) => {
    const provinceCandidates = Object.values(candidates).filter(
      (candidate) => candidate.province == province
    );
    const objCandidate = provinceCandidates.find(
      (candidate) => !candidate.sobj_full_name
    );
    const districts = uniqueArray(
      thaiSort(
        provinceCandidates
          .filter((c) => c.district)
          .map((candidate) => candidate.district ?? "")
      )
    );
    const candidatesByDistrict = districts.map((district) => {
      return {
        district,
        candidates: provinceCandidates.filter(
          (candidate) => candidate.district == district
        ),
      };
    });

    return {
      province,
      objCandidate,
      districts: candidatesByDistrict,
    };
  });

  return (
    <div className="flex flex-col items-center pt-5 sm:pt-20 px-4 sm:px-6 pb-10">
      <div>
        <a href="https://peoplesparty.or.th/local-election-2025/">
          <img src={logo} alt="PPLE Logo" className="w-[200px] sm:w-[300px]" />
        </a>
      </div>
      <div className="w-full max-w-[600px] mx-auto mt-5 sm:mt-20 bg-white/40 rounded-[20px] p-6">
        <h1 className="text-center text-2xl font-bold">
          ตรวจสอบหมายเลขผู้สมัคร นายกอบจ. และ ส.อบจ.ของพรรคประชาชน
        </h1>
        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold mb-4">รายชื่อจังหวัด</h2>
          <div className="flex flex-col space-y-2">
            {provinces.map((province) => (
              <a
                key={province}
                href={`#${province}`}
                className="text-[#191E50] hover:text-[#242E91] transition-colors text-2xl underline"
              >
                {province}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Now you can use candidates data here */}
      {candidatesByProvince.map(({ province, objCandidate, districts }) => (
        <div className="w-full max-w-[600px] mx-auto mt-5 sm:mt-10 bg-white/40 rounded-[20px] p-6">
          <div key={province} id={province} className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">{province}</h2>

            {objCandidate && (
              <div className="py-10 border-b border-t border-gray-800 pb-10">
                <h3 className="text-3xl font-semibold mb-2">
                  ผู้สมัครนายก อบจ.
                </h3>
                <div className="ml-6">
                  <div className="flex flex-row gap-2 items-center font-body text-xl">
                    <span>บัตรสี{objCandidate.obj_color_name} หมายเลข</span>
                    <div className="max-w-[80px]">
                      <Checkbox
                        text={objCandidate.obj_candidate_number ?? ""}
                        fillColor={objCandidate.obj_color_code ?? ""}
                        animate={false}
                      />
                    </div>
                  </div>
                  <div className="text-3xl font-body font-bold">
                    {objCandidate.obj_full_name}
                  </div>
                </div>
              </div>
            )}

            {districts.map(({ district, candidates }) => (
              <div key={district} className="py-4 border-b border-gray-800">
                <h3 className="text-2xl font-semibold">อำเภอ{district}</h3>
                {candidates.map((candidate) => (
                  <>
                    <div
                      key={`${candidate.district}-${candidate.district_no}-t`}
                      className="ml-4 sm:ml-6 font-body text-lg pt-2"
                    >
                      <span className="font-bold">
                        เขต {candidate.district_no}
                      </span>{" "}
                      บัตรสี{candidate.sobj_color_name}
                    </div>
                    <div
                      key={`${candidate.district}-${candidate.district_no}-b`}
                      className="ml8 sm:ml-12 font-body text-lg flex flex-row gap-2 items-center pb-2"
                    >
                      หมายเลข
                      <div className="max-w-[80px]">
                        <Checkbox
                          text={candidate.sobj_candidate_number ?? ""}
                          fillColor={candidate.sobj_color_code ?? ""}
                          animate={false}
                        />
                      </div>
                      {candidate.sobj_full_name}
                    </div>
                  </>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className="text-white/60 text-center text-xs mt-4 font-body">
        ผลิตโดยพรรคประชาชน เลขที่ 167 ชั้น 4 ซอยรามคำแหง 42 แขวงหัวหมาก
        เขตบางกะปิ กรุงเทพมหานคร 10240 จำนวน 1 ชุด ผลิตวันที่ 30 มกราคม 2568
      </p>
    </div>
  );
}

export default Static;
