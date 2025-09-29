export const Tabs = {
  ALL: "All",
  FICTION: "Fiction",
  NON_FICTION: "Non-Fiction",
  BUSINESS_TECH: "Business & Tech",
  CURRENTLY_READING: "Currently Reading",
  QUEUE: "Queue",
} as const;

export type TabType = typeof Tabs[keyof typeof Tabs];