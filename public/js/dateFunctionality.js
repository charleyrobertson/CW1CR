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
sortDates(entries) {
    var sortedJsObjects = entries.sort(function(a,b){ 
        return Math.abs(new Date(a.date) - new Date(b.date)) 
    });
}


}

module.exports = dateFunctionality;