class dateFunctionality {

//Get week of goal
getWeek() {
    let curr = new Date;
    let week = [];
   
    for(let i=1; i <=7; i++)
    {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0,10);
      week.push(day);
    }
   return week;
}

//Get start and end dates of the week
getStartandEndDays(startDate) {
    let curr = new Date(startDate);
    let week = [];
   
    for(let i=1; i <=7; i++)
    {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0,10);
      week.push(day);
    }
   return week;
}

//Get dates to display first-last day of week

//Ensure that the startime < end time




}

module.exports = dateFunctionality;