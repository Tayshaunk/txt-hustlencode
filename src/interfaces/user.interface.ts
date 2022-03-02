export interface IHustlencodeUser {
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  isActive: boolean;
  accountStatus: string;
  email: string;
  username: string;
  organization: string | null;
  password: string;
  phoneNumber: number | null;
  gender: string;
  dob: Date;
  profileImg: string | null;
  coverImg: string;
  onBoardingComplete: boolean;
  resetToken: string | null;
  layoutWidget: {
    css: string;
    js: string;
    linesOfCode: number;
  };
  aboutWidget: {
    html: string;
    css: string;
    js: string;
    linesOfCode: number;
  };
  interestsWidget: {
    html: string;
    css: string;
    js: string;
    linesOfCode: number;
  };
  otherWidgets: [
    {
      html: string | null;
      css: string | null;
      js: string | null;
      linesOfCode: number;
    },
  ];
  friendsList: any[]; // get friend interface
  team: string[];
  codeScore: number;
  loginTally: [
    {
      loginTimestamp: Date;
      sessionToken: string | null;
      sessionLength: number;
    },
  ];
  challenges: {
    one: boolean;
    two: boolean;
    three: boolean;
  };
  metrics: string;
}

export interface IHustlencodeUserSession {
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  isActive: boolean;
  accountStatus: string;
  email: string;
  username: string;
  profileImg: string | null;
}
