import { platformClient } from "./BaseRepository";

export function fetchSiteDetails() {
  // var path = `/platform/module/sites?moduleName=Smart Man Power`; //Contains group,line,area
  var path = `/platform/sites?module_name=Smart Man Power`;
  return platformClient.get(path);
}
