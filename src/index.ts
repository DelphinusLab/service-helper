const axios = require('axios').default;

export class RestEndpoint {
  constructor(public endpoint: string, public username: string, public useraddress: string) { };
  async prepareRequest(method: "GET" | "POST", url: string, body: JSON | null) {
    if (method === 'GET') {
      console.log(this.endpoint + url);
      try {
        let response = await axios.get(this.endpoint + url, body ? { params: body! } : {});
        return response.data;
      } catch (e: any) {
        console.error(e);
        throw Error("RestEndpointGetFailure");
      }
    } else {
      try {
        let response = await axios.post(this.endpoint + url, body ? body! : {});
        return response.data;
      } catch (e: any) {
        console.log(e);
        throw Error("RestEndpointPostFailure");
      }
    }
  }

  async getJSONResponse(json: any) {
    if (json["success"] !== true) {
      console.error(json);
      throw new Error("RequestError:" + json["error"]);
    }
    return json["result"];
  }

  async invokeRequest(method: "GET"|"POST", url: string, body: JSON | null) {
    let response = await this.prepareRequest(method, url, body);
    return await this.getJSONResponse(response);
  }
}


