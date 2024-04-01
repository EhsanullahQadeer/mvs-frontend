import axios from "util/axios";
import config from "config/config";

export async function subscrbePrograms() {
  return await axios.get(`${config.defaults.api_url}/programs/random`);
}
