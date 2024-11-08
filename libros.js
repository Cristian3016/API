const libros = [
  {
    id: 1,
    titulo: "Cien Años de Soledad",
    autor: "Gabriel García Márquez",
    anioPublicacion: 1967,
    genero: {
      id: 3,
      nombre: "Realismo mágico",
      codigo: "RM",
    },
  },
  {
    id: 2,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    anioPublicacion: 1605,
    genero: {
      id: 4,
      nombre: "Novela de caballería",
      codigo: "NC"
    }
  },
  {
    id: 3,
    titulo: "",
    autor: "",
    anioPublicacion: 0,
    genero: {
      id: 5,
      nombre: "",
      codigo: ""
    }
  }
];


module.exports = libros;
