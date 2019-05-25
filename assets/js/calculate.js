function addRow(tableID) {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var colCount = table.rows[0].cells.length;

    for(var i=0; i<colCount; i++) {

        var newcell = row.insertCell(i);

        newcell.innerHTML = table.rows[1].cells[i].innerHTML;

        switch(newcell.childNodes[0].type) {
            case "text":
                    newcell.childNodes[0].value = "";
                    break;
            case "checkbox":
                    newcell.childNodes[0].checked = false;
                    break;
            case "select-one":
                    newcell.childNodes[0].selectedIndex = 0;
                    break;
        }
    }
}

function deleteRow(tableID) {
    try {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;

    for(var i=1; i<rowCount; i++) {
        var row = table.rows[i];
        console.log(row.cells[0].childNodes);
        var chkbox = row.cells[0].childNodes[8];
        if(chkbox.checked == true) {
            if(rowCount <= 2) {
                alert("Why would you want to delete all the rows?");
                break;
            }
            table.deleteRow(i);
            rowCount--;
            i--;
        }
    }

    }catch(e) {
        alert(e);
    }
}

function deleteRowMobile(tableID) {
    try {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;

    for(var i=1; i<rowCount; i++) {
        var row = table.rows[i];
        var chkbox = row.cells[0].childNodes[16];
        if(chkbox.checked == true) {
            if(rowCount <= 2) {
                alert("Why would you want to delete all the rows?");
                break;
            }
            table.deleteRow(i);
            rowCount--;
            i--;
        }
    }

    }catch(e) {
        alert(e);
    }
}


function calculateMobile(tableID) {
    document.getElementById("Finals").innerHTML = "";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;

    // Iterate through rows after the header
    for(var i=1; i<rowCount; i++) {
        var row = table.rows[i];


        // Set the current cell to the Class Name cell.
        var cell = row.cells[0];
        // Store the Class Name. If not entered, use Class N, where N is the row #
        var courseName = cell.childNodes[4].value;


        // Set the current cell to the Common Exams cell (Desktop Only)
        // cell = row.cells[1];

        // Grab the common exam dropdown from the current cell
        var ceDropdown = cell.getElementsByTagName("select")[0];
        // Store the common exam selected or 'none' if one is not selected
        var commonExams = ceDropdown.options[ceDropdown.selectedIndex].value;

        // Set Class Name if a common exam is selected
        // If a common exam is selected and a class name is given add class in parenthesis
        if (commonExams != "none") {
            if (!courseName) courseName = commonExams;
            else courseName = courseName + " (" + commonExams + ")";
        }
        else if (!courseName) courseName = "Row " + i + " Class";
        // Add row number to courseName
        courseName = i + ". " + courseName;

        // Set the current cell to the Day(s) cell
        // cell = row.cells[2]; // (Desktop Only)
        cell = row.cells[1]; // (Mobile Only)
        var days = "";

        // Store the checked days
        for (var j=0; j < cell.childNodes.length; j++) {
            if (cell.childNodes[j].type == "checkbox") {
                if (cell.childNodes[j].checked == true) {

                    // daycode is the number of the childNode
                    // childNodes in cell[1] are #text, input, #brElement
                    // 1 = Mon, 7 = Tues, 13 = Wed, 19 = Thurs, 25 = Fri (Desktop)
                    // 3 = Mon, 9 = Tues, 15 = Wed, 21 = Thurs, 27 = Fri (Mobile)
                    var daycode = j;
                    days += daycode + " ";
                }
            }
        }


        // Set the current cell to the Start Time cell (Desktop Only)
        // cell = row.cells[3];

        // Store the selected startTime
        var dropDown = cell.getElementsByTagName("select")[0];
        var startTime = dropDown.options[dropDown.selectedIndex].value;


        // Determine the final exam time
        // If a common exam is selected, output the exam time and move to the next row
        if(commonExams != "none") {
            switch(commonExams) {
                case "ACC 210": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                break;
            }
            case "PY 211": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Thursday, May 3, 2018<br>\n";
                break;
            }
            case "PY 212": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Thursday, May 3, 2018<br>\n";
                break;
            }
            case "MAE 206": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                break;
            }
            case "PY 205": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, May 7, 2018<br>\n";
                break;
            }
            case "PY 208": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, May 7, 2018<br>\n";
                break;
            }
            case "ST 311": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Tuesday, May 8, 2018<br>\n";
                break;
            }
            case "ACC 220": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Tuesday, May 1, 2018<br>\n";
                break;
            }
            }
        }

        // If a common exam is not selected etermine the final exam time from checked days and class start time
        else {
          switch(days) {

            case "":
                document.getElementById("Finals").innerHTML += i + ". No days were selected.<br>\n";
                break;

            // Monday
            //case "1 ": // (Desktop)
            case "3 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "second" || startTime == "third") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "fourth" || startTime ==  "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "sixth" || startTime == "seventh" || startTime == "eighth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth" || startTime == "tenth" || startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "twelfth" || startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "fourteenth" || startTime == "fifteenth" || startTime == "sixteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Tuesday
            //case "7 ": // (Desktop)
            case "9 ": // (Mobile)
                if (startTime == "first" || startTime == "second") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Thursday, May 3, 2018<br>\n";
                }
                else if (startTime == "third" || startTime ==  "fourth" || startTime ==  "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Tuesday, May 1, 2018<br>\n";
                }
                else if (startTime == "sixth" || startTime == "seventh" || startTime == "eighth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Thursday, May 3, 2018<br>\n";
                }
                else if (startTime == "ninth" || startTime == "tenth" || startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Tuesday, May 8, 2018<br>\n";
                }
                else if (startTime == "twelfth" || startTime == "thirteenth" || startTime == "fourteenth" || startTime == "fifteenth" || startTime == "sixteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Thursday, May 3, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Wednesday
            //case "13 ": // (Desktop)
            case "15 ": // (Mobile)
                if (startTime == "first" || startTime == "second" || startTime == "third" || startTime ==  "fourth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime ==  "fifth" || startTime == "sixth" || startTime == "seventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "eighth" || startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "tenth" || startTime == "eleventh" || startTime == "twelfth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "thirteenth" || startTime == "fourteenth" || startTime == "fifteenth" || startTime == "sixteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Wednesday, May 9, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Thursday
            //case "19 ": // (Desktop)
            case "21 ": // (Mobile)
                if (startTime == "first" || startTime == "second" || startTime == "third" || startTime ==  "fourth" || startTime ==  "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Tuesday, May 8, 2018<br>\n";
                }
                else if (startTime == "sixth" || startTime == "seventh" || startTime == "eighth" || startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Tuesday, May 1, 2018<br>\n";
                }
                else if (startTime == "tenth" || startTime == "eleventh" || startTime == "twelfth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Tuesday, May 1, 2018<br>\n";
                }
                else if (startTime == "sixteenth" || startTime == "thirteenth" || startTime == "fourteenth" || startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Tuesday, May 8, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Friday
            // case "25 ": // (Desktop)
            case "27 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "second" || startTime == "third" || startTime ==  "fourth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "sixth" || startTime == "seventh" || startTime == "eighth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth" || startTime == "tenth" || startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "twelfth" || startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "sixteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Monday, Wednesday
            // case "1 13 ": // (Desktop)
            case "3 15 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "third") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "seventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Monday, Wednesday, Friday
            //case "1 13 25 ": // (Desktop)
            case "3 15 27 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "second") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "fourth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "sixth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "eighth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Tuesday, Thursday
            //case "7 19 ": //(Desktop)
            case "9 21 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Thursday, May 3, 2018<br>\n";
                }
                else if (startTime == "third") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Tuesday, May 8, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Tuesday, May 1, 2018<br>\n";
                }
                else if (startTime == "sixth" || startTime == "seventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Thursday, May 3, 2018<br>\n";
                }
                else if (startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Tuesday, May 1, 2018<br>\n";
                }
                else if (startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Tuesday, May 8, 2018<br>\n";
                }
                else if (startTime == "thirteenth" || startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Thursday, May 3, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Monday, Friday
            //case "1 25 ": // (Desktop)
            case "3 27 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "third") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "seventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Wednesday, Friday
            //case "13 25 ": // (Desktop)
            case "15 27 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "third") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "seventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            default:
                document.getElementById("Finals").innerHTML += i + ". There is no class with this start time and combination of days. Please verify you have you selected correctly.<br>\n";
        }
      }
    }

}

function deleteRow(tableID) {
    try {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;

    for(var i=1; i<rowCount; i++) {
        var row = table.rows[i];
        console.log(row.cells[0].childNodes);
        var chkbox = row.cells[0].childNodes[8];
        if(chkbox.checked == true) {
            if(rowCount <= 2) {
                alert("Why would you want to delete all the rows?");
                break;
            }
            table.deleteRow(i);
            rowCount--;
            i--;
        }
    }

    }catch(e) {
        alert(e);
    }
}


function calculate(tableID) {
    document.getElementById("Finals").innerHTML = "";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;

    // Iterate through rows after the header
    for(var i=1; i<rowCount; i++) {
        var row = table.rows[i];


        // Set the current cell to the Class Name cell.
        var cell = row.cells[0];
        // Store the Class Name. If not entered, use Class N, where N is the row #
        var courseName = "";
        courseName = cell.childNodes[3].value;


        // Set the current cell to the Common Exams cell
        cell = row.cells[1];

        // Grab the common exam dropdown from the current cell
        var ceDropdown = cell.getElementsByTagName("select")[0];
        // Store the common exam selected or 'none' if one is not selected
        var commonExams = ceDropdown.options[ceDropdown.selectedIndex].value;

        // Set Class Name if a common exam is selected
        // If a common exam is selected and a class name is given add class in parenthesis
        if (commonExams != "none") {
            if (!courseName) courseName = commonExams;
            else courseName = courseName + " (" + commonExams + ")";
        }
        else if (!courseName) courseName = "Row " + i + " Class";
        // Add row number to courseName
        courseName = i + ". " + courseName;

        // Set the current cell to the Day(s) cell
        cell = row.cells[2];
        var days = "";

        // Store the checked days
        for (var j=0; j < cell.childNodes.length; j++) {
            if (cell.childNodes[j].type == "checkbox") {
                if (cell.childNodes[j].checked == true) {

                    // daycode is the number of the childNode
                    // childNodes in cell[1] are #text, input, #brElement
                    // 1 = Mon, 7 = Tues, 13 = Wed, 19 = Thurs, 25 = Fri
                    var daycode = j;
                    days += daycode + " ";
                }
            }
        }


        // Set the current cell to the Start Time cell
        cell = row.cells[3];
        // Store the selected startTime
        var dropDown = cell.getElementsByTagName("select")[0];
        var startTime = dropDown.options[dropDown.selectedIndex].value;


        // Determine the final exam time
        // If a common exam is selected, output the exam time and move to the next row
        if(commonExams != "none") {
            switch(commonExams) {
                case "ACC 210": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                break;
            }
            case "PY 211": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Thursday, May 3, 2018<br>\n";
                break;
            }
            case "PY 212": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Thursday, May 3, 2018<br>\n";
                break;
            }
            case "MAE 206": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                break;
            }
            case "PY 205": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, May 7, 2018<br>\n";
                break;
            }
            case "PY 208": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, May 7, 2018<br>\n";
                break;
            }
            case "ST 311": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Tuesday, May 8, 2018<br>\n";
                break;
            }
            case "ACC 220": {
                document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Tuesday, May 1, 2018<br>\n";
                break;
            }
            }
        }

        // If a common exam is not selected etermine the final exam time from checked days and class start time
        else {
          switch(days) {

            case "":
                document.getElementById("Finals").innerHTML += i + ". No days were selected.<br>\n";
                break;

            // Monday
            case "1 ": // (Desktop)
            //case "3 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "second" || startTime == "third") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "fourth" || startTime ==  "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "sixth" || startTime == "seventh" || startTime == "eighth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth" || startTime == "tenth" || startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "twelfth" || startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "fourteenth" || startTime == "fifteenth" || startTime == "sixteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Tuesday
            case "7 ": // (Desktop)
            //case "9 ": // (Mobile)
                if (startTime == "first" || startTime == "second") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Thursday, May 3, 2018<br>\n";
                }
                else if (startTime == "third" || startTime ==  "fourth" || startTime ==  "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Tuesday, May 1, 2018<br>\n";
                }
                else if (startTime == "sixth" || startTime == "seventh" || startTime == "eighth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Thursday, May 3, 2018<br>\n";
                }
                else if (startTime == "ninth" || startTime == "tenth" || startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Tuesday, May 8, 2018<br>\n";
                }
                else if (startTime == "twelfth" || startTime == "thirteenth" || startTime == "fourteenth" || startTime == "fifteenth" || startTime == "sixteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Thursday, May 3, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Wednesday
            case "13 ": // (Desktop)
            //case "15 ": // (Mobile)
                if (startTime == "first" || startTime == "second" || startTime == "third" || startTime ==  "fourth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime ==  "fifth" || startTime == "sixth" || startTime == "seventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "eighth" || startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "tenth" || startTime == "eleventh" || startTime == "twelfth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "thirteenth" || startTime == "fourteenth" || startTime == "fifteenth" || startTime == "sixteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Wednesday, May 9, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Thursday
            case "19 ": // (Desktop)
            //case "21 ": // (Mobile)
                if (startTime == "first" || startTime == "second" || startTime == "third" || startTime ==  "fourth" || startTime ==  "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Tuesday, May 8, 2018<br>\n";
                }
                else if (startTime == "sixth" || startTime == "seventh" || startTime == "eighth" || startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Tuesday, May 1, 2018<br>\n";
                }
                else if (startTime == "tenth" || startTime == "eleventh" || startTime == "twelfth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Tuesday, May 1, 2018<br>\n";
                }
                else if (startTime == "sixteenth" || startTime == "thirteenth" || startTime == "fourteenth" || startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Tuesday, May 8, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Friday
            case "25 ": // (Desktop)
            //case "27 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "second" || startTime == "third" || startTime ==  "fourth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "sixth" || startTime == "seventh" || startTime == "eighth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth" || startTime == "tenth" || startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "twelfth" || startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "sixteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Monday, Wednesday
            case "1 13 ": // (Desktop)
            //case "3 15 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "third") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "seventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Monday, Wednesday, Friday
            case "1 13 25 ": // (Desktop)
            //case "3 15 27 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "second") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "fourth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "sixth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "eighth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Tuesday, Thursday
            case "7 19 ": //(Desktop)
            //case "9 21 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Thursday, May 3, 2018<br>\n";
                }
                else if (startTime == "third") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Tuesday, May 8, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Tuesday, May 1, 2018<br>\n";
                }
                else if (startTime == "sixth" || startTime == "seventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Thursday, May 3, 2018<br>\n";
                }
                else if (startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Tuesday, May 1, 2018<br>\n";
                }
                else if (startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Tuesday, May 8, 2018<br>\n";
                }
                else if (startTime == "thirteenth" || startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Thursday, May 3, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Monday, Friday
            case "1 25 ": // (Desktop)
            //case "3 27 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "third") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "seventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            // Wednesday, Friday
            case "13 25 ": // (Desktop)
            //case "15 27 ": // (Mobile)
                if (startTime == "first") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Wednesday, May 9, 2018<br>\n";
                }
                else if (startTime == "third") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "fifth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 8:00 - 11:00 AM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "seventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, April 30, 2018<br>\n";
                }
                else if (startTime == "ninth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "eleventh") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 1:00 - 4:00 PM / Monday, May 7, 2018<br>\n";
                }
                else if (startTime == "thirteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Friday, May 4, 2018<br>\n";
                }
                else if (startTime == "fifteenth") {
                    var currentRow = i;
                    document.getElementById("Finals").innerHTML += courseName + " Final Exam: 6:00 - 9:00 PM / Monday, April 30, 2018<br>\n";
                }
                else document.getElementById("Finals").innerHTML += i + ". There is no class with this start time on this day. Please verify you have you selected correctly.<br>\n";
                break;

            default:
                document.getElementById("Finals").innerHTML += i + ". There is no class with this start time and combination of days. Please verify you have you selected correctly.<br>\n";
        }
      }
    }

}
