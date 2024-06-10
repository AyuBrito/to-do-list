const url = "https://api.freeapi.app/api/v1/todos";

function postData(event) {
  event.preventDefault();
  const title = document.getElementById("input-list").value;

  const data = {
    description: "teste",
    title: title,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then((response) => {
      console.log(response);

      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Resposta do servidor:", data);

      getData();
    })
    .catch((error) => {
      console.error("Erro: post", error);
    });
}

function getData() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.data && Array.isArray(data.data)) {
        exibir(data.data);
      } else {
        console.error("Estrutura de dados inesperada:", data);
      }
    })
    .catch((error) => {
      console.error("Erro: get", error);
    });
}

function exibir(dataArray) {
  const resultDiv = document.getElementById("list-ul");
  resultDiv.innerHTML = "";
  dataArray.forEach((item) => {
    const itemDiv = document.createElement("li");

    if (item.title) {
      itemDiv.textContent = `${item.title}`;
    } else {
      itemDiv.textContent = "Title não encontrado";
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");

    deleteButton.style.textDecoration = "none";

    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      deleteData(item._id);
    });

    itemDiv.appendChild(deleteButton);
    itemDiv.addEventListener("click", function () {
      this.classList.toggle("checked");
    });
    resultDiv.appendChild(itemDiv);
  });
}

function deleteData(id) {
  const deleteUrl = `${url}/${id}`;

  fetch(deleteUrl, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Item deletado:", data);
      getData();
    })
    .catch((error) => {
      console.error("Erro: delete", error);
    });
}

window.addEventListener("load", getData);
