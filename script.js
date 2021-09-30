

    // Soort van de motor van dit hele schip. Raapt alle movie titles, movie posters en imdb links op en propt
    // Dat gezellig samen in een <li><a><img>genot</img></a></li>
    const addMoviesToDom = (movies) => {
        const activeMoviesUl = document.getElementById("film-grid");
        activeMoviesUl.innerHTML = "";
        movies.map (movies => {
            
            // Er staat iets in de opdracht over "zet sommige van deze dingen in aparte functions"... 
            // maar ik heb echt geen flauw benul hoe ik dat zou moeten doen. Ik dacht met wat comments ertussen
            // Is het ook wel duidelijk wat het allemaal doet (:

            // Takes care of the titles
            const newLi = document.createElement("li")
            activeMoviesUl.appendChild(newLi)
            newLi.innerHTML = movies.Title;
            
            // Takes care of the IMDB Links
            const imdbLink = movies.imdbID
            const newA = document.createElement("a");
            newA.href = "https://www.imdb.com/title/"+imdbLink+"/"
            newA.target= "_blank"
            newLi.appendChild(newA);

            // Takes care of the images
            const imgPosters = movies.Poster;
            const newImg = document.createElement("img");
            newImg.src = imgPosters;
            newA.appendChild(newImg)
        });
    }

    // Filtert alle movie titles op inclusiviteit van een string en werpt het dan naar hierboven
    const filterMovies = (wordInMovieTitle) => {
       const filteredMovies = movies.filter(movie => {
           return movie.Title.includes(wordInMovieTitle);
       })
       addMoviesToDom(filteredMovies)
    }
    
    // Filtert alle movie titles op datum van verschijning en geeft die als voorzet naar die bovenste function
    const filterLatestMovies = () => {
        const latestMovies = movies.filter(movie => {
            return movie.Year >= 2014;
        })
        addMoviesToDom(latestMovies)
    }

    // Pakt de value van de radio buttons en vuurt een function af met die value als argument (zie hierboven)
    const handleOnChangeEvent = (event) => {
        switch (event.target.value) {
            case 'new':
                filterLatestMovies();
            break;
            case 'avengers':
                filterMovies("Avengers");
            break;
            case 'xmen':
                filterMovies("X-Men");
            break;
            case 'princess':
                filterMovies("Princess");
            break;
            case 'batman':
                filterMovies("Batman");
            break;
            case 'default':
                addMoviesToDom(movies);
        }
    }

    // Grabbelt alle radio buttons bij elkaar
    const movieRadioButtons = document.getElementById("radio-nav").getElementsByTagName("input")

    // Hangt aan al die bij elkaar gegrabbelde radio buttons eventlisteners en activeert m'n trap card (die function)
    const addEventListeners = Array.from(movieRadioButtons).forEach(button => {
        button.addEventListener ("change", handleOnChangeEvent)
    });

    // Deze knul zoekt of mijn search input value voorkomt in mijn movies list en gooit dat dan allemaal
    // naar die function hierboven die ze vervolgens in de grid gooit. Oh en het is ook case insensitive, want dat is chill 
    // en hij verwijdert de "check" attribute van de radio buttons, aangezien die niet meer 'actief' zijn (:
    const searchMovieList = (value) => {
        Array.from(movieRadioButtons).forEach(button => {
            button.checked = false
        });
        const searchInputValue = searchInput.value.toLowerCase();
        const filteredMovies = movies.filter(movies => {
            filteredMovieTitles = movies.Title.toLowerCase();
            return filteredMovieTitles.includes(searchInputValue);
        })
        addMoviesToDom(filteredMovies);
    }

    // Grijpt zoek knopen hangt eventlistener eraan
    const searchButton = document.getElementById("search-button")
    searchButton.addEventListener("click", searchMovieList)

    // Pakt zoekveld en zorgt dat hij op enter de searchbutton klikt, want dat vind ik fijn (:
    const searchInput = document.getElementById("site-search");
    searchInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
         searchButton.click();
        }
    });
    

    // Zelf erin gegooid omdat ik het wel leuk vond als we begonnen met alle films op het scherm
    addMoviesToDom(movies)