export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  time: string;
}

export interface EventsByDate {
  [date: string]: Event[];
}

const sampleTitles = [
  "Team Sync",
  "Product Review",
  "Marketing Strategy",
  "Design Sprint",
  "Dev Workshop",
  "Client Call",
  "Code Review",
  "1:1 Meeting",
  "Networking Brunch",
  "Brainstorm Session",
  "Release Planning",
  "Customer Feedback Review",
  "Team Lunch",
  "UI/UX Review",
  "Yoga Break",
  "Sales Update",
  "Project Kickoff",
  "Investor Call",
  "Onboarding Session",
  "Performance Check-in",
];

const sampleDescriptions = [
  "Discuss progress and blockers, align for next steps.",
  "Deep dive into recent designs and user flows.",
  "Share marketing metrics and upcoming campaigns.",
  "A chance to reconnect and align on shared goals.",
  "Walkthrough code changes and review key updates.",
  "Connect with clients and review ongoing tasks.",
  "Prioritize backlog and set sprint goals.",
  "Gather team feedback and plan future improvements.",
  "Meditation and breathing session to reset your mind.",
  "Demo latest changes and capture stakeholder feedback.",
];

function getRandomTime(): string {
  const hour = Math.floor(Math.random() * 9) + 8; // 8 AM to 4 PM
  const minute = Math.random() > 0.5 ? "00" : "30";
  const ampm = hour < 12 ? "AM" : "PM";
  const formattedHour = hour <= 12 ? hour : hour - 12;
  return `${formattedHour}:${minute} ${ampm}`;
}

function getRandomEvent(idIndex: number): Event {
  const title = sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
  const description =
    sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
  const imageId = Math.floor(Math.random() * 1000); // for unique picsum image
  return {
    id: `event-${idIndex}`,
    title,
    description,
    imageUrl: `https://picsum.photos/id/${imageId}/1920/1080.jpg`,
    time: getRandomTime(),
  };
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function generateEvents(): EventsByDate {
  const eventsByDate: EventsByDate = {};
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - today.getDay() - 7); // start of previous week (Sunday)
  let eventId = 1;

  for (let i = 0; i < 21; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const formattedDate = formatDate(currentDate);
    const numEvents = Math.floor(Math.random() * 5) + 2; // 2 to 6 events per day

    const dailyEvents: Event[] = [];
    for (let j = 0; j < numEvents; j++) {
      dailyEvents.push(getRandomEvent(eventId++));
    }

    eventsByDate[formattedDate] = dailyEvents;
  }

  return eventsByDate;
}

const events: EventsByDate = generateEvents();

export default events;
