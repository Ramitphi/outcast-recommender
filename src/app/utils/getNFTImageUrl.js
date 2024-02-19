import axios from "axios";

export const getNFTImageUrl = async (address) => {
  console.log({ address });

  const options = {
    headers: {
      accept: "application/json",
      "X-API-KEY":
        "ramitag734_sk_0382b30d-9a72-41a2-a09e-5e961657b34e_o2uzx7n7yz4ii8vs",
    },
  };

  const { data } = await axios.get(
    `https://api.simplehash.com/api/v0/nfts/owners?chains=base&wallet_addresses=${address}&contract_addresses=0x73682A7f47Cb707C52cb38192dBB9266D3220315&limit=50`,
    options
  );
  console.log({ data: data.nfts[0]?.image_url });

  return data.nfts[0]?.image_url;
};
