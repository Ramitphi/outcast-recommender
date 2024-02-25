import { init } from "@airstack/airstack-react";
import { fetchQuery } from "@airstack/airstack-react";

export const getNFTOwner = async () => {
  init(process.env.AIRSTACK_API_KEY);

  const query = `
  query MyQuery {
    Ethereum: TokenBalances(
      input: {filter: {tokenAddress: {_eq: "0x9340204616750cb61e56437bEfC95172C6Ff6606"}}, blockchain: ethereum, limit: 200}
    ) {
      TokenBalance {
        owner {
          identity
        }
        tokenAddress
        tokenId
        tokenType
        tokenNfts {
          contentValue {
            image {
              small
            }
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }
`;

  const { data, error } = await fetchQuery(query);

  return data.Ethereum.TokenBalance;
};
