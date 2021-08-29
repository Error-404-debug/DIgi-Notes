showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {

    let addTxt = document.getElementById("addTxt");
    console.log(addTxt.value)
    let addTitle = document.getElementById("addTitle");

    // console.log(addTitle.value);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
            // isImportant: false
    }
    if (myObj.text && myObj.title) {
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        addTitle.value = "";
    } else {
        alert("Please add title and note text");
    }
    showNotes();
});
// function to show from local storage;
function showNotes(element, index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {

        html += ` 
    <div class="noteCard my-2 mx-2 card" id="same" style="width: 18rem; ">
    <div class="card-body">
    <h5 style="color:black;" class="card-title">  ${element.title}</h5>
    <p style="color:red;" class="card-text"> ${element.text}</p>
    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary " id="delTxt"> Delete Note.</button>
    <br/>
    <br/>
    </div> 
</div>`;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Add a note to fill this space using the "Add a note" section.`;
    }

}
// function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    // console.log(notes);
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}



let search = document.getElementById('searchTxt');
search.addEventListener("input", function() {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})