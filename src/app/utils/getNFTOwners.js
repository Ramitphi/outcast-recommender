import { init } from "@airstack/airstack-react";
import { fetchQuery } from "@airstack/airstack-react";

export const getNFTOwner = async () => {
  init(process.env.AIRSTACK_API_KEY);

  const query = `
  query MyQuery {
    Base: TokenBalances(
      input: {filter: {tokenAddress: {_eq: "0xc056375aa215C2Ac3211Cd9fb5bf69a43Bd481c4"}}, blockchain: base, limit: 200}
    ) {
      TokenBalance {
        owner {
          identity
        }
        amount
        tokenAddress
        tokenId
        tokenType
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }
`;

  const { data, error } = await fetchQuery(query);
  console.log({ data });

  return data.Base.TokenBalance;
};
