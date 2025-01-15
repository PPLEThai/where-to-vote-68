// "sobj_full_name": "พัฒน์พงศ์ กาลสงค์",
// "sobj_candidate_number": "1",
// "province": "สงขลา",
// "district": "หาดใหญ่",
// "district_no": "1",
// "region": "ภาคใต้",
// "sobj_color_name": "สีคราม",
// "sobj_color_code": "#0071C1",
// "obj_color_name": "สีแดงเลือดหมู",
// "obj_color_code": "#CC0001",
// "obj_full_name": "นิรันดร์ จินดานาค",
// "obj_profile_picture": "https://peoplesparty.or.th/wp-content/uploads/2024/11/สงขลา.png",
// "obj_candidate_number": "2"

export interface Candidate {
  sobj_full_name?: string;
  sobj_candidate_number?: string | null;
  province: string;
  district?: string;
  district_no?: string;
  region: string;
  sobj_color_name: string;
  sobj_color_code: string;
  obj_color_name: string;
  obj_color_code: string;
  obj_full_name: string | null;
  obj_profile_picture: string | null;
  obj_candidate_number: string | null;
}
