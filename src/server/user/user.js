import fetcher from "../fetcher";
import getFetcher from "../getFetcher";


const addUser = async (data , type) => {
  const result = await fetcher("POST", data, "/register", type);
  return result;
};

const getUsers = async (data , type) => {
  const result = await getFetcher("GET", data, "/users", type);
  return result;
}

export {addUser} ;
