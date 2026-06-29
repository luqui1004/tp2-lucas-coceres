document.addEventListener("DOMContentLoaded", function () {

    /*----------------Carrusel----------------*/

    const heroSlides = [

        {
            imagen: "img/hero.png",
            titulo: "FLONARYS",
            descripcion: "Protegemos la naturaleza para construir un futuro más verde, más limpio y más sostenible."
        },

        {
            imagen: "img/hero2.png",
            titulo: "SU APOYO SUMA",
            descripcion: "Cada aporte ayuda a proteger la naturaleza y construir un futuro más limpio y sostenible."
        }

    ];

    const heroImagen = document.querySelector("#heroImagen");
    const heroTitulo = document.querySelector("#heroTitulo");
    const heroDescripcion = document.querySelector("#heroDescripcion");

    const heroAnterior = document.querySelector("#heroAnterior");
    const heroSiguiente = document.querySelector("#heroSiguiente");

    let heroActual = 0;

    function mostrarHero(numeroSlide) {

        heroImagen.style.opacity = "0";
        heroTitulo.style.opacity = "0";
        heroDescripcion.style.opacity = "0";

        setTimeout(function () {

            heroImagen.src = heroSlides[numeroSlide].imagen;
            heroTitulo.textContent = heroSlides[numeroSlide].titulo;
            heroDescripcion.textContent = heroSlides[numeroSlide].descripcion;

            heroImagen.style.opacity = "1";
            heroTitulo.style.opacity = "1";
            heroDescripcion.style.opacity = "1";

            heroActual = numeroSlide;

        }, 250);

    }

    if (heroAnterior && heroSiguiente) {

        heroSiguiente.addEventListener("click", function () {

            let siguiente = heroActual + 1;

            if (siguiente >= heroSlides.length) {
                siguiente = 0;
            }

            mostrarHero(siguiente);

        });

        heroAnterior.addEventListener("click", function () {

            let anterior = heroActual - 1;

            if (anterior < 0) {
                anterior = heroSlides.length - 1;
            }

            mostrarHero(anterior);

        });

    }

    /*----------------Tarjeta de proyectos----------------*/

    const cards = document.querySelectorAll(".card");

    if (cards.length > 0) {

        const observer = new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {
                    entrada.target.classList.add("mostrar");
                }

            });

        }, {
            threshold: 0.2
        });

        cards.forEach(function (card) {

            observer.observe(card);

            const titulo = card.querySelector("h3");
            const imagen = card.querySelector("img");

            function abrirOCerrarCard() {

                cards.forEach(function (otraCard) {

                    if (otraCard !== card) {
                        otraCard.classList.remove("abierta");
                    }

                });

                card.classList.toggle("abierta");

            }

            titulo.addEventListener("click", abrirOCerrarCard);
            imagen.addEventListener("click", abrirOCerrarCard);

        });

    }

    /*----------------Calculadora de impacto----------------*/

    const abrirCalculadora = document.querySelector("#abrirCalculadora");
    const calculadoraImpacto = document.querySelector("#calculadoraImpacto");
    const cerrarCalculadora = document.querySelector("#cerrarCalculadora");

    const montoDonacion = document.querySelector("#montoDonacion");
    const botonesMonto = document.querySelectorAll(".montoFijo");
    const calcularImpacto = document.querySelector("#calcularImpacto");
    const resultadoImpacto = document.querySelector("#resultadoImpacto");

    const hacerDonacion = document.querySelector("#hacerDonacion");
    const graciasDonacion = document.querySelector("#graciasDonacion");

    if (abrirCalculadora) {

        abrirCalculadora.addEventListener("click", function () {
            calculadoraImpacto.classList.remove("oculto");
        });

    }

    if (cerrarCalculadora) {

        cerrarCalculadora.addEventListener("click", function () {
            calculadoraImpacto.classList.add("oculto");
        });

    }

    botonesMonto.forEach(function (boton) {

        boton.addEventListener("click", function () {

            montoDonacion.value = boton.value;

            calcularArboles();

        });

    });

    function calcularArboles() {

        const monto = Number(montoDonacion.value);

        if (monto <= 0) {

            resultadoImpacto.textContent = "Ingresá un monto válido.";

            return;

        }

        const arboles = Math.floor(monto / 10000);

        if (arboles <= 0) {

            resultadoImpacto.textContent = "Con ese monto todavía no se puede plantar un árbol.";

        } else if (arboles === 1) {

            resultadoImpacto.textContent = "Con tu donación se puede plantar 1 árbol a tu nombre.";

        } else {

            resultadoImpacto.textContent = "Con tu donación se pueden plantar " + arboles + " árboles a tu nombre.";

        }

    }

    if (calcularImpacto) {

        calcularImpacto.addEventListener("click", calcularArboles);

    }

    if (hacerDonacion) {

        hacerDonacion.addEventListener("click", function () {

            const monto = Number(montoDonacion.value);

            if (isNaN(monto) || monto < 10000) {

                resultadoImpacto.textContent = "Ingresá un monto válido.";
                return;

            }

            calculadoraImpacto.classList.add("oculto");
            graciasDonacion.classList.remove("oculto");

        });

    }

});