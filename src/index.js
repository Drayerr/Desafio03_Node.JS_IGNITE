const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

function checkRepoExists(request, response, next) {
  const { id } = request.params

  const repo = repositories.find(repo => repo.id === id)

  if(repo){
    return next()
  } else {
    return response.status(404).json({error: "Repository not found!"})
  }
}

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.status(201).json(repository);
});

app.put("/repositories/:id", checkRepoExists, (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  const repository = { ...repositories[repositoryIndex], title, url, techs };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", checkRepoExists, (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", checkRepoExists, (request, response) => {
  const { id } = request.params;

  repo = repositories.find(repo => repo.id === id)

  repo.likes++

  return response.status(200).json(repo);
});

module.exports = app;
