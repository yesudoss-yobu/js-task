var selectedRow = null

function onFormSubmit() {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }

function readFormData() {
    var formData = {};
    formData["rollno"] = document.getElementById("rollno").value;
    formData["fname"] = document.getElementById("fname").value;
    formData["age"] = document.getElementById("age").value;
    formData["subject"] = document.getElementById("subject").value;
    formData["mark"] = document.getElementById("mark").value;

    return formData;
    
}
let a = 1;

function insertNewRecord(formData) {
    var table = document.getElementById("studentTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = a++;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.rollno;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.fname;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.age;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = formData.subject;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = formData.mark;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<button class="btn btn-info btn-sm" onClick="onEdit(this)">Edit</button>
                       <button class="btn btn-info btn-sm" onClick="onDelete(this)">Delete</button>`;
                       
}

function resetForm() {

        document.getElementById("rollno").value = "";
        document.getElementById("fname").value = "";
        document.getElementById("age").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("mark").value = "";

    selectedRow = null;
}

function onEdit(td) {

    selectedRow = td.parentElement.parentElement;
      document.getElementById("rollno").value = selectedRow.cells[1].innerHTML;
      document.getElementById("fname").value = selectedRow.cells[2].innerHTML;
      document.getElementById("age").value = selectedRow.cells[3].innerHTML;
      document.getElementById("subject").value = selectedRow.cells[4].innerHTML;
      document.getElementById("mark").value = selectedRow.cells[5].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[1].innerHTML = formData.rollno;
    selectedRow.cells[2].innerHTML = formData.fname;
    selectedRow.cells[3].innerHTML = formData.age;
    selectedRow.cells[4].innerHTML = formData.subject;
    selectedRow.cells[5].innerHTML = formData.mark;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("studentTable").deleteRow(row.rowIndex);
        resetForm();
    }
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("studentTable");
    switching = true;
    
    dir = "asc"; 
    
    while (switching) {
      
      switching = false;
      rows = table.rows;
      
      for (i = 1; i < (rows.length - 1); i++) {
        
        shouldSwitch = false;
        
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        
        switchcount ++;      
      } else {
        
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("studentTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }