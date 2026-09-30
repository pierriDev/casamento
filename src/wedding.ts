export type ScheduleItem = {
  title: string
  detail: string
}

export type Wedding = {
  partnerOne: string
  partnerTwo: string
  /** ISO date, such as "2027-06-12". Leave null until the date is set. */
  dateISO: string | null
  dateLabel: string
  venue: string
  city: string
  dressCode: string
  welcome: string
  story: string[]
  schedule: ScheduleItem[]
}

export const wedding: Wedding = {
  partnerOne: "Name",
  partnerTwo: "Name",
  dateISO: null,
  dateLabel: "Date to be announced",
  venue: "Venue to be announced",
  city: "City",
  dressCode: "To be announced",
  welcome:
    "We are so glad you are here. This page will hold the date, the place, and how to celebrate with us.",
  story: [
    "A few lines about how you met will live here.",
    "Then the moment you decided to spend the rest of your lives together.",
    "And what you hope this day will feel like for the people you love.",
  ],
  schedule: [
    {
      title: "Ceremony",
      detail: "Time and place to be announced",
    },
    {
      title: "Celebration",
      detail: "Time and place to be announced",
    },
  ],
}
