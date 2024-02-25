import { init } from "@airstack/airstack-react";
import { fetchQuery } from "@airstack/airstack-react";

export const getNFTImageUrl = async (tokenId) => {
  console.log({ tokenId });
  init(process.env.AIRSTACK_API_KEY);

  const query = `
  query MyQuery {
    TokenNft(input: {address: "0x9340204616750cb61e56437bEfC95172C6Ff6606", tokenId: "${tokenId}", blockchain: ethereum}) {
      contentValue {
        image {
          original
        }
      }
    }
  }
`;

  const { data, error } = await fetchQuery(query);
  console.log({ data });

  return data?.TokenNft?.contentValue?.image?.original;
};
