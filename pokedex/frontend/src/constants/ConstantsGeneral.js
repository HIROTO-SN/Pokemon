/* サインアップ時*/
// VerifyAccount
export const p_username =
  "Your username is the name you will use to log in to your account. Only you will see this name.";
export const p_password =
  "Your password must include at least one uppercase and one lowercase letter, a number, and at least one other character that is not a letter or digit, such as *, ', (, etc. We recommend inserting numbers and symbols into the beginning, middle, and end to make your password difficult to guess.";
export const p_email = "Your Email will be used to verify your account.";
export const lal_email_receive_title =
  "Your Email will be used to verify your account.";
export const p_disp_question_title =
  "Do you want to display your Pokémon Trainer Club profile publicly? This includes content such as your screen name. Personal information such as your real name is always kept private.";
export const p_continue_warning =
  " By continuing to use the Services, you acknowledge that you have read, understood, and agree to our ";
export const lal_news_check = "News and information about Pokémon";
export const lal_updates_check =
  "News and updates about Pokémon Center (our official online shop)";
export const lal_term_check = "I accept the Pokemon.com Terms of Use.";

/* POKEDEX */
export const NUMBER_RANGE = {
  MIN: 1,
  MAX: 1025,
};
export const CLICKED_COLOR = {
  TW: "#30a7d7",
  HW: "#ee6b2f",
};

export const HEIGHT_LIST = [
  {
    name: "short",
    height: "45%",
    top: "35%",
    urlB: "/icons/heightShort.png",
  },
  {
    name: "middle",
    height: "52%",
    top: "35%",
    urlB: "/icons/heightMiddle.png",
  },
  { name: "tall", height: "90%", top: "45%", urlB: "/icons/heightTall.png" },
];

export const WEIGHT_LIST = [
  { name: "light", height: "45%", top: "35%", urlB: "/icons/ball.png" },
  { name: "middle", height: "50%", top: "38%", urlB: "/icons/ball.png" },
  { name: "heavy", height: "60%", top: "45%", urlB: "/icons/ball.png" },
];

/* POKEDEX - DETAILS */
export const TODAY = {
  DATE:
    String(new Date().getFullYear()).padStart(4, '0') +
    "-" +
    String(new Date().getMonth()).padStart(2, '0') +
    "-" +
    String(new Date().getDay()).padStart(2, '0'),
  YEAR: new Date().getFullYear(),
  MONTH: new Date().getMonth(),
  DAY: new Date().getDate(),
};

export const STATS_INFO = {
  MAX: 250,
  GAUGE_BAR_HEIGHT: 15,
};

export const versionLabelList = [{ name: "x" }, { name: "y" }];

export const noEvolution = "This Pokémon does not evolve.";
