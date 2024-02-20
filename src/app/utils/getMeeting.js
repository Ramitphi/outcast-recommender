import axios from "axios";

export const getMeeting = async (address1, address2) => {
  const { data } = await axios.post(
    "https://iriko.huddle01.media/api/v1/create-room",
    {
      title: "Huddle01-Test",
      hostWallets: [address1, address2],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "eei853S8vM40Dh0anAysfDwQ5cZCDDwh",
      },
    }
  );

  console.log({ ff: data.data.roomId });
  return data.data.roomId;
};
