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
    `https://api.opensea.io//api/v2/orders/ethereum/seaport/listings?asset_contract_address=0x9340204616750cb61e56437bEfC95172C6Ff6606&order_by=created_date&order_direction=desc&token_ids=${tokenId}`,
    options
  );

  return data?.orders;
};
