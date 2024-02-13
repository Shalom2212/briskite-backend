let requestedTime = {};

const add15Minutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  let newMinutes = minutes + 15;
  let newHours = hours;

  if (newMinutes >= 60) {
    newHours += 1;
    newMinutes -= 60;
  }

  const newHoursString = String(newHours).padStart(2, "0");
  const newMinutesString = String(newMinutes).padStart(2, "0");

  return `${newHoursString}:${newMinutesString}`;
};

const isValidTime = (time, lastTime) => {
  const referenceTime = add15Minutes(lastTime);
  const [timeHours, timeMinutes] = time.split(":").map(Number);
  const [refHours, refMinutes] = referenceTime.split(":").map(Number);

  const timeInMinutes = timeHours * 60 + timeMinutes;
  const refTimeInMinutes = refHours * 60 + refMinutes;

  return timeInMinutes >= refTimeInMinutes;
};

async function getRestaurantsWithinTimeRange(requestedTime, restaurantService) {
  const [hours, minutes] = requestedTime.split(":").map(Number);
  const requestedTimeInMinutes = hours * 60 + minutes;

  const restaurants = await restaurantService.getRestaurants(
    requestedTimeInMinutes
  );

  return restaurants;
}

const restaurantsController = async (
  { restaurantService },
  { phone, time }
) => {
  if (phone in requestedTime && isValidTime(time, requestedTime[phone])) {
    const resRestaurants = await getRestaurantsWithinTimeRange(
      requestedTime[phone],
      restaurantService
    );
    return resRestaurants;
  }
  if (!(phone in requestedTime)) {
    const resRestaurants = await getRestaurantsWithinTimeRange(
      time,
      restaurantService
    );
    requestedTime[phone] = time;
    return resRestaurants;
  }
};

module.exports = { restaurantsController };
