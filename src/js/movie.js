import {
  createMovie,
  deleteMovies,
  editMovies,
  getMovieById,
  getMovies,
} from "./CRUD";
import createUserMarkUp from "../templates/movies.hbs";
import { fillInForm, getFormData } from "./form-servise";
const container = document.getElementById("moviesList");
const btnGet = document.getElementById("get");
const addBtn = document.getElementById("added");
const formCreate = document.querySelector(".form-create");
const listBtn = document.getElementById("moviesList");
const edit = document.getElementById("edit");
const modal = document.getElementById("modal");
const modalPut = document.getElementById("modal-put");
 
// GET MOVIE

const getMovie = async () => {
  try {
    const movie = await getMovies();
    container.innerHTML = createUserMarkUp(movie);
  } catch (error) {
    console.log(error);
  }
};

btnGet.addEventListener("click", getMovie);

//CREATE MOVIE
const movieSave = async (evt) => {
  evt.preventDefault();
  const form = evt.currentTarget;
  const movieData = getFormData(form);

  createMovie(movieData)
    .then(getMovies)
    .then(() => {
      form.reset();
    });
};

formCreate.addEventListener("submit", movieSave);

//UPDATE
listBtn.addEventListener("click", async (event) => {
  if (event.target.dataset.action === "edit") {
    const movieId = event.target.dataset.id;
    const movie = await getMovieById(movieId);

    if (movie) {
      fillInForm(modal.querySelector("form"), movie);
      modal.dataset.id = movie.id;
      modal.style.display = "flex";
    }
  }
});

document.getElementById("close").addEventListener("click", () => {
  modal.style.display = "none";
});

edit.addEventListener("click", async () => {
  const form = modal.querySelector("form");
  const movieId = Number(modal.dataset.id);
  const updatedMovieData = getFormData(form);

  try {
    await editMovies(movieId, updatedMovieData);
    modal.style.display = "none";
    getMovie();
  } catch (error) {
    console.error("Ошибка при обновлении фильма", error);
  }
});

//REPLACE
listBtn.addEventListener("click", async (event) => {
  console.log("Кнопка натиснута");
  if (event.target.dataset.action === "update") {
    const movieId = event.target.dataset.id;
    console.log("ID фільму: ", movieId);
    const movie = await getMovieById(movieId);

    if (movie) {
      console.log("Фільм знайдений: ", movie);
      fillInForm(modalPut.querySelector("#replaceForm"), movie);
      modalPut.dataset.id = movie.id;
      modalPut.style.display = "flex";
    } else {
      console.log("Фільм не знайдений");
    }
  }
});

document.getElementById("close-put").addEventListener("click", () => {
  console.log("Модальне вікно закрите");
  modalPut.style.display = "none";
});

document.getElementById("update-put").addEventListener("click", async () => {
  const form = modalPut.querySelector("#replaceForm");
  const movieId = Number(modalPut.dataset.id);
  const updatedMovieData = getFormData(form);
  console.log("Оновлені дані фільму: ", updatedMovieData);

  try {
    await replaceMovies(movieId, updatedMovieData);
    modalPut.style.display = "none";
    getMovies();
  } catch (error) {
    console.error("Помилка при оновленні фільму:", error);
  }
});


//DELETE
const listMovieClick = (evt) => {
  if (evt.target.tagName !== "BUTTON") {
    return;
  }
  const action = evt.target.dataset.action;
  const id = evt.target.dataset.id;
  if (action === "edit") {
    editMovies(id);
  }

  if (action === "delete") {
    deleteMovie(id);
  }
};

const deleteMovie = async (id) => {
  try {
    await deleteMovies(id).getMovie();
  } catch (error) {
    console.log(error);
  }
};

listBtn.addEventListener("click", listMovieClick);
