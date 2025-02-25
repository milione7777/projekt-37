const BASE_URL = "http://localhost:3000";

// getMovies
const getMovies = async () => {
  try {
      const response = await fetch(`${BASE_URL}/movies`);
      const movie = response.json();
      return movie;
  } catch (error) {
    console.log(error);
  }
}

// getMovieID
const getMovieById = async (id) => {
  const response = await fetch(`${BASE_URL}/movies/${id}`);
  //   const user = response.json();
  //   return user;
  console.log(response);
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
};
  
// createMovie 
  const createMovie = async (user) => {
    const url = `${BASE_URL}/movies`;
    const options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  };

// updatePatch
const editMovies = async (id, data) => {
  const url = `${BASE_URL}/movies/${id}`;
  const options = {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = await fetch(url, options);
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
};

//updatePut
const replaceMovies = async (movieId, updatedMovieData) => {
  try {
    const response = await fetch(`${BASE_URL}/movies/${movieId}`, {
      // Використовуємо movieId
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovieData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Помилка при оновленні фільму: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Помилка при оновленні фільму:", error);
    throw error;
  }
};


const deleteMovies = async (id) => {
  const url = `${BASE_URL}/movies/${id}`;
  const options = {
    method: "DELETE",
  };
  try {
    const response = await fetch(url, options);
    const deleteUser = response.json();
    return deleteUser;
  } catch (error) {
    (error) => console.log(error.massage);
  }
};

export { getMovies, getMovieById, createMovie, editMovies, replaceMovies, deleteMovies};