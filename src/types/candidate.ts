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
