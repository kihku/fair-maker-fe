import { send_request } from "./util";

export async function registerUser(props) {
  let data = await send_request({
    method: "POST",
    url: `/auth/register_google`,
    body: {
      data: {
        ...props,
      },
    },
  });
  return data;
}

export async function getUserInfo(token) {
    let data = await send_request({
      method: "GET",
      url: `/user`,
      token
    });

    return data?.data;
}

export async function sendGoogleLogin(token){
    try{
        return await send_request({
            method: "POST",
            url: `/auth/login`,
            body: {
                "data":{
                    "google_token": token
                }
            }
        })
    } catch (error){

    }
}

export async function userMetaData(){
  let data = await send_request({
    method: "GET",
    url: `/metadata/user`
  });
  return data?.data;
}

export async function citiesOfCountries(country_id){
  console.log("Call fetch cities")
  let data = await send_request({
    method: "GET",
    url: `/metadata/cities/${country_id}`,
  });

  return data?.data;
}