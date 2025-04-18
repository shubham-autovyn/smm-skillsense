import { platformClient,baseClient } from "./BaseRepository";
//Fetch accessible shops for Supervisor role
export function fetchSupervisorAccessData(payload) {
    var path = `/smm/ct/user/auth/role-master/validation`;
    return baseClient.get(path);
  }