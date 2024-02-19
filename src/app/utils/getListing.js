import axios from "axios";

export const getListing = async (tokenId) => {
  console.log({ tokenId });

  const options = {
    headers: {
      accept: "application/json",
      "X-API-KEY": "d68e4884a5124a018a8f088fc47abbff",
    },
  };

  const { data } = await axios.get(
    `https://api.opensea.io//api/v2/orders/base/seaport/listings?asset_contract_address=0x73682A7f47Cb707C52cb38192dBB9266D3220315&order_by=created_date&order_direction=desc&token_ids=${tokenId}`,
    options
  );

  return data?.orders;
};
