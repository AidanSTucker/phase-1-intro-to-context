
  
  function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
 

  function createTimeInEvent(employeeData, dateStamp) {
    employeeData.timeInEvents.push(createTimeEntry(dateStamp, "TimeIn"));
    return employeeData;
  }
  
  function createTimeOutEvent(employeeData, dateStamp) {
    employeeData.timeOutEvents.push(createTimeEntry(dateStamp, "TimeOut"));
    return employeeData;
  }

  function hoursWorkedOnDate(employeeData, date) {
    const timeIn = employeeData.timeInEvents.find((event) => event.date === date);
    const timeOut = employeeData.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }


  function wagesEarnedOnDate(employeeData, date) {
    const hoursWorked = hoursWorkedOnDate(employeeData, date);
    return hoursWorked * employeeData.payPerHour;
  }

  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map((event) => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }


  function createTimeEntry(dateStamp, type) {
    const [date, hour] = dateStamp.split(" ");
    return {
      type: type,
      hour: parseInt(hour),
      date: date,
    };
  }