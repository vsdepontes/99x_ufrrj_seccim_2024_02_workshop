import { configs } from './configs';

export const getSessionDateString = () => {
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1); // Get tomorrow's date
  return `${tomorrowDate.getDate()}/${tomorrowDate.getMonth()}/${tomorrowDate.getFullYear()} 
    ${configs.sessionId.slice(0, 2)}:${configs.sessionId.slice(2)}`;
}