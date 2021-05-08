class dateFunctionality {

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

}

module.exports = dateFunctionality;