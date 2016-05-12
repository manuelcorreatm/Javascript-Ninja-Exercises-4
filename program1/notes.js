function saveNote() {
    var title = document.getElementById("titleTxt").value;
    var content = document.getElementById("contentTxa").value;
    var created = document.getElementById("createdTxt").value;
    var note = {
        title: title,
        content: content,
    };
    if (created != "") {
        console.log("Edited");
        note.created = parseInt(created);
        note.edited = Date.now();
    } else {
        console.log("Added");
        note.created = Date.now();
        note.edited = null;
    }

    localStorage.setItem("note" + note.created, JSON.stringify(note));

}

function editNote() {
    var note = JSON.parse(localStorage.getItem(event.target.value));
    document.getElementById("titleTxt").value = note.title;
    document.getElementById("contentTxa").value = note.content;
    document.getElementById("createdTxt").value = note.created;
    document.getElementById("submitBtn").value = "Save changes";
}

function deleteNote() { 
    localStorage.removeItem(event.target.value);
    getNotes();
}

function getNotes() {
    var notesDiv = document.getElementById("notes");
    notesDiv.innerHTML = null;
    var frag = document.createDocumentFragment();

    for (var key in localStorage) {
        if (key.startsWith("note")) {
            var article = document.createElement("article");
            var h2 = document.createElement("h2");
            var p = document.createElement("p");
            var footer = document.createElement("footer");
            var divForLbls = document.createElement("div");
            var createdLbl = document.createElement("label");
            var editedLbl = document.createElement("label");
            var editBtn = document.createElement("button");
            var deleteBtn = document.createElement("button");

            var note = JSON.parse(localStorage.getItem(key));
            var datediff;
            if (note.edited) {
                datediff = Math.round((Date.now() - note.edited) / (1000 * 60 * 60 * 24));
                if (datediff < 1) {
                    datediff = "Today";
                } else if (datediff == 1) {
                    datediff = "Yesterday";
                } else {
                    datediff = datediff + " days ago";
                }
            } else {
                datediff = "Never";
            }

            article.id = key;
            h2.textContent = note.title;
            p.textContent = note.content;
            createdLbl.textContent = "Created: " + new Date(note.created).toLocaleDateString();
            editedLbl.textContent = "Last edited: " + datediff;
                
            editBtn.textContent = "Edit";
            editBtn.value = key;
            deleteBtn.textContent = "Delete";
            deleteBtn.value = key;

            editBtn.addEventListener("click", editNote, false);
            deleteBtn.addEventListener("click", deleteNote, false);

            divForLbls.appendChild(createdLbl);
            divForLbls.appendChild(editedLbl);
            footer.appendChild(divForLbls);
            footer.appendChild(editBtn);
            footer.appendChild(deleteBtn);
            article.appendChild(h2);
            article.appendChild(p);
            article.appendChild(footer);
            frag.appendChild(article);

            notesDiv.appendChild(frag);
        }
    }
}

function clear() {
    var formElements = document.getElementById("form").elements;
    for (var i = 0; i < formElements.length; i++) {
        var elemType = formElements[i].type.toLowerCase();
        switch (elemType) {
            case "text":
            case "textarea":
            case "hidden":
                formElements[i].value = "";
                break;
            case "submit":
                formElements[i].value = "Add new note"
            default :
                break;
        }
    }
}

(function () {
    var form = document.getElementById("form");
    var notesDiv = document.getElementById("notes");
    var clearBtn = document.getElementById("clearBtn");

    clearBtn.addEventListener("click", clear, false);
    form.addEventListener("submit", saveNote, false);

    getNotes();

})();