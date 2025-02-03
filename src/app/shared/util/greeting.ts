type Greeting = 'Buenos días' | 'Buenas tardes' | 'Buenas noches';
type GreetingResult = [string, Greeting];

const HOURS = {
  NIGHT_START: 18,
  NIGHT_END: 6,
  AFTERNOON_START: 13,
} as const;

export function generateGreeting(): GreetingResult {
  const today = new Date();
  const hour = today.getHours();

  const dateFormat = new Intl.DateTimeFormat("es-mx", {
    weekday: "long",
    day: "numeric",
  }).format(today);

  let greeting: Greeting;
  if (hour >= HOURS.NIGHT_START || hour < HOURS.NIGHT_END) {
    greeting = "Buenas noches";
  } else if (hour >= HOURS.AFTERNOON_START) {
    greeting = "Buenas tardes";
  } else {
    greeting = "Buenos días";
  }

  return [dateFormat, greeting];
};
