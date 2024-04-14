import { users } from "./users";

export const posts = [
  {
    imageUrl:
      "https://i.pinimg.com/736x/dd/97/3a/dd973ac116a977c8dd5296b0da504b8c.jpg",
    user: users[0].username,
    likes: 7870,
    caption: "Train Ride to Hogwarts.",
    profile_pic_url: users[0].profile_image,
    comments: [
      {
        user: "raj tawar",
        comment: "wow its fantastic",
      },
      {
        user: "tejas sharma",
        comment: "wow its understandable",
      },
    ],
  },
  {
    imageUrl:
      "https://i.pinimg.com/564x/7e/b5/6c/7eb56cde4f7d8c7405c407dbf41be87a.jpg",
    user: users[1].username,
    likes: 1870,
    caption: "something is very important in life.",
    profile_pic_url: users[2].profile_image,
    comments: [
      {
        user: "om pawar",
        comment: "wow its fantastic",
      },
      {
        user: "rajesh khana",
        comment: "wow its understandable",
      },
    ],
  },
];
