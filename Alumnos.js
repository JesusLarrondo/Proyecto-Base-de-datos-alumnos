
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector(".close-modal");
const btnOpen = document.querySelector(".show-modal");
const btnGrupo = document.querySelector(".grupos");
const nuevoGrupo = document.querySelector(".nuevoGrupo");
const btnCloseG = document.querySelector(".close-grupo");
const btnCalif = document.querySelector(".calif");
const grades = document.querySelector(".grades");
const btnCloseCalif = document.querySelector(".close-calificaciones");

function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    return;
}

function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    return;
}

function closeGrupo() {
    nuevoGrupo.classList.add("hidden");
    overlay.classList.add("hidden");
    return;
}

function openGrupo1() {
    nuevoGrupo.classList.remove("hidden");
    overlay.classList.remove("hidden");
    return;
}

function closeCalif() {
    grades.classList.add("hidden");
    overlay.classList.add("hidden");
    return;
}

function openGrades() {
    grades.classList.remove("hidden");
    overlay.classList.remove("hidden");
    return;
}

//Funciones del proyecto

function registrar() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;
    const alumno = new Alumno(nombre, apellido, edad); 
    console.log({ alumno });
    alumno.agregarMateria("Fisica")
    guardarAlumno(alumno); 
}

function guardarAlumno(alumno) {
    let alumnos = JSON.parse(window.localStorage.getItem("alumnosRegistrados"));
    if (alumnos) {
        alumnos.push(alumno);
    } else {
        alumnos = [];
        alumnos.push(alumno);
    }
    let lista = document.getElementById("lista-alumnos");

    for (let i = 0; i < alumnos.length; i++) {
        let item = document.createElement("li");
        item.textContent = "Nombre: " + alumnos[i].nombre + ", Apellido: " + alumnos[i].apellido + ", Edad: " + alumnos[i].edad;
        lista.appendChild(item);
    }
    window.localStorage.setItem("alumnosRegistrados", JSON.stringify(alumnos));
}

function crearGrupo() {
    let nombreGrupo = document.getElementById("nombreGrupo").value;

    if(typeof nombreGrupo !== 'string' || nombreGrupo === "") return;

    const grupo = new Grupo(nombreGrupo);
    console.log({ grupo });
    window.grupo = grupo;
    guardarGrupo(grupo);
    
    let grupoItems = document.getElementsByClassName("grupo-item");
for (let i = 0; i < grupoItems.length; i++) {
    grupoItems[i].addEventListener("click", function() {
        let selectedGrupo = grupos[i];

        if (selectedGrupo) {
            alumno.grupo = selectedGrupo;
            actualizarAlumnoEnLocalStorage(alumno);
        }
    });
}
}

function guardarGrupo(grupo) {
    let grupos = JSON.parse(window.localStorage.getItem("gruposCreados"));
    if (grupos) {
        grupos.push(grupo);
    } else {
        grupos = [];
        grupos.push(grupo);
    }
    
    window.localStorage.setItem("gruposCreados", JSON.stringify(grupos));
}

function generarIdAleatorio() {
    
    return Math.random().toString(36).substring(2, 7);
}

function Alumno(nombre, apellido, edad, id = generarIdAleatorio()) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.materias = [];
    this.calificaciones = [];
    this.grupo = null;

    this.agregarMateria = function (materia) {
        this.materias.push(materia);
    }

    this.agregarCalificacion = function (calificacion) {
        this.calificaciones.push(calificacion);
    }
}

function Grupo(nombre, id = generarIdAleatorio(), alumnos = []) {
    this.id = id;
    this.nombre = nombre;
    this.alumnos = alumnos;

    this.inscribirAlumno = function (alumno) {
        this.alumnos.push(alumno);
    }
}

function actualizarGrupoEnLocalStorage(grupo){
    let grupos = JSON.parse(window.localStorage.getItem("gruposCreados"));
    if (grupos) {
        let index = -1;

        for (let i = 0; i < grupos.length; i++) {
            if (grupos[i].id === grupo.id) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            grupos[index] = grupo;
        }
    }

    window.localStorage.setItem("gruposCreados", JSON.stringify(grupos));
}

function actualizarAlumnoEnLocalStorage(alumno) {
    let alumnos = JSON.parse(window.localStorage.getItem("alumnosRegistrados"));
    if (alumnos) {
        let index = alumnos.findIndex(function(a) {
            return a.nombre === alumno.nombre && a.apellido === alumno.apellido;
        });

        if (index !== -1) {
            alumnos[index] = alumno;
        }
    }

    window.localStorage.setItem("alumnosRegistrados", JSON.stringify(alumnos));
}

function logOut() {
    window.location.assign("index.html");
}

btnOpen.addEventListener("click", openModal);
btnClose.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
btnGrupo.addEventListener("click", openGrupo1);
btnCloseG.addEventListener("click", closeGrupo);
btnCalif.addEventListener("click", openGrades);
btnCloseCalif.addEventListener("click", closeCalif);

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeGrupo();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeCalif();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let grupos = JSON.parse(window.localStorage.getItem("gruposCreados"));
    let selectGrupo = document.getElementById("SelectGrupo")
    for (let i = 0; i < grupos.length; i++) {
        let item = document.createElement("option");
        item.textContent = "Grupo: " + grupos[i].nombre;
        item.id = grupos[i].id;
        item.value = grupos[i].id;
        item.classList.add("grupo-item");
        selectGrupo.appendChild(item);
    }

    let alumnos = JSON.parse(window.localStorage.getItem("alumnosRegistrados"));
    let selectAlumno = document.getElementById("SelectAlumno")
    for (let i = 0; i < alumnos.length; i++) {
        let item = document.createElement("option");
        item.textContent = "Alumno: " + alumnos[i].nombre + " " + alumnos[i].apellido;
        item.id = alumnos[i].id;
        item.value = alumnos[i].id;
        item.classList.add("alumno-item");
        selectAlumno.appendChild(item);
    }

    const btnInscribirAlumno = document.getElementById('inscribir-btn');

    btnInscribirAlumno.addEventListener('click', function() {
        let idAlumno = selectAlumno.value;
        let idGrupo = selectGrupo.value;

        let grupo = null;
        let alumno = null;

        for (let i = 0; i < grupos.length; i++) {
            if (grupos[i].id === idGrupo) {
                grupo = new Grupo(grupos[i].nombre, grupos[i].id, grupos[i].alumnos);
                break;
            }
        }

        for (let i = 0; i < alumnos.length; i++) {
            if (alumnos[i].id === idAlumno) {
                alumno = new Alumno(alumnos[i].nombre, alumnos[i].apellido, alumnos[i].edad, alumnos[i].id);
                break;
            }
        }

        grupo.inscribirAlumno(alumno);

        actualizarGrupoEnLocalStorage(grupo);
    });
});