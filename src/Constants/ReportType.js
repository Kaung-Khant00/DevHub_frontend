const REPORTED_TYPES = ["user", "post", "group", "question", "answer", "simple"];

const REASON_OPTIONS = {
  user: [
    "Impersonation or Fake Profile",
    "Harassment / Hate Speech",
    "Spam / Unsolicited Messages",
    "Inappropriate Profile Content",
  ],
  post: [
    "Spam / Promotion",
    "Hate Speech or Violence",
    "Misinformation / False Claims",
    "Sexual or Explicit Content",
    "Copyright Violation",
  ],
  group: [
    "Violation of Community Rules",
    "Harassment in Group",
    "Illegal Content",
    "Spam / Low-Quality Content",
    "Hate/Extremism",
  ],
  question: ["Off-topic or Spam", "Duplicate Question", "Misinformation", "Abusive Language"],
  answer: ["Incorrect / Misleading Answer", "Abusive Language", "Spam or Link-Only Answer", "Plagiarism"],
  simple: ["Other"],
};

export { REPORTED_TYPES, REASON_OPTIONS };
