import { init } from "@airstack/airstack-react";
import { fetchQuery } from "@airstack/airstack-react";

export const getNFTImageUrl = async (tokenId) => {
  console.log({ tokenId });
  init(process.env.AIRSTACK_API_KEY);

  const query = `
  query MyQuery {
    Base: TokenBalances(
      input: {filter: {tokenAddress: {_eq: "0x73682A7f47Cb707C52cb38192dBB9266D3220315"}, tokenId: {_eq: "${tokenId}"}}, blockchain: base, limit: 1}
    ) {
      TokenBalance {
        tokenNfts {
          contentValue {
            image {
              original
            }
          }
        }
      }
    }
  }
`;

  const { data, error } = await fetchQuery(query);
  console.log({ data: data.Base.TokenBalance[0]?.tokenNfts });

  return data.Base.TokenBalance[0]?.tokenNfts?.contentValue?.image?.original;
};
