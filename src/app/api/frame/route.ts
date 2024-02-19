import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { getNFTOwner } from "../../utils/getNFTOwners";
import { getAccount } from "../../utils/getAccount";
import { getNFTImageUrl } from "../../utils/getNFTImageUrl";

import { Redis } from "@upstash/redis";

const NEXT_PUBLIC_URL = "https://outcast-recommender.vercel.app";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = "";
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: "9269D1DF-9073-4D62-96AD-E8AA03CD9C12",
  });
  let count;

  let user;
  const redis = new Redis({
    url: "https://primary-blowfish-43231.upstash.io",
    token:
      "AajfACQgZWNjMjhkYWUtYTdkMC00MmNjLWFlYjYtOWVkZjMxZGZiOTg3ODllMTE0OGJjMmY0NDYxYThjODUxN2QyOTRmZjZjN2Y=",
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
    const d: number | null = await redis.get(accountAddress);

    console.log({ d });

    const res = await getNFTOwner(accountAddress);
    console.log({ res });
    let tokenId;
    let uAddress;
    let metadata;
    if (d) {
      count = d;
    } else {
      count = 0;
    }
    let showuser;

    for (let i = Math.floor(count) + 1; i < res?.length; i++) {
      console.log(i);

      uAddress = res[i]?.owner?.identity;
      tokenId = res[i]?.tokenId;
      user = await getAccount(uAddress);
      metadata = await getNFTImageUrl(uAddress);

      if (user && metadata) {
        showuser = user[0].profileName;
        console.log({ showuser });
        console.log({ metadata });
        const it = Math.random() * 190;
        await redis.set(accountAddress, it);
        break;
      }
    }

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "Next",
          },
          {
            action: "link",
            label: `${showuser} 📖`,
            target: `https://warpcast.com/${showuser}`,
          },
          {
            action: "link",
            label: "Bid on Opensea",
            target: `https://opensea.io/assets/base/0x73682a7f47cb707c52cb38192dbb9266d3220315/${tokenId}`,
          },
        ],
        image: `${metadata}`,
        post_url: `${NEXT_PUBLIC_URL}/api/frame`,
      })
    );
  }
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Auth Failed`,
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/failure.png`,
        aspectRatio: "1:1",
      },
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
