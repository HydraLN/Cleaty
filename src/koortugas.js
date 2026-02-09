/*
window.addEventListener("tugas", function () {
  const table = document.getElementById("table");
//querying the table tr
  const rows = table.querySelectorAll("tbody tr");
//making the condition true
  let allRowsHaveAtLeastOne = true;

  //looping rows using "of"
  for (const row of rows) {
    //making the nodelist to array using arrayfrom
    const checkboxes = Array.from(row.querySelectorAll("input[type='checkbox']"));
    // check each input[type='checkbox'] as "box" and check whther all box is checked
    // if all checked true
    //if one isnt checked false
    const rowHasOneChecked = checkboxes.some(box => box.checked);

    //checking whther its true or not
    if (!rowHasOneChecked) {
      allRowsHaveAtLeastOne = false;
      break; 
    }
  }

  const today = new Date()
  if (allRowsHaveAtLeastOne) {
    
    window.dispatchEvent(new CustomEvent("greenresult", {detail: { stats : "green", date: today.toLocaleDateString()
  }}))
    console.log("GREEN — every person has at least one checkbox checked");
  } else {
    window.dispatchEvent(new CustomEvent("yellowresult", {detail: {stats: "yellow", date: today.toLocaleDateString()}}))
    console.log("YELLOW — at least one person has zero checked boxes");
  }
});
*/