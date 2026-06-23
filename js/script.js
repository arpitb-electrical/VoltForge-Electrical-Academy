// ======================================
// VOLTFORGE FINAL JAVASCRIPT
// PART 1 - CORE SYSTEM
// ======================================


// Website Start
document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});


// Initialize All Features
function initializeWebsite(){

    setupNavigation();

    setupBackToTop();

    setupSearch();

    setupFilters();

    setupVideoFilters();

    loadPDFs();

    loadVideos();

    setupCounter();

}



// ======================================
// LOADER SYSTEM
// ======================================


window.addEventListener("load", () => {

    const loader =
    document.querySelector(".loader");


    if(loader){

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";


            setTimeout(() => {

                loader.style.display = "none";

            }, 500);


        }, 800);

    }

});




// ======================================
// SMOOTH NAVIGATION
// ======================================


function setupNavigation(){


    const links =
    document.querySelectorAll('a[href^="#"]');


    links.forEach(link => {


        link.addEventListener("click", function(e){


            e.preventDefault();


            const target =
            document.querySelector(
                this.getAttribute("href")
            );


            if(target){

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }


        });


    });


}




// ======================================
// BACK TO TOP BUTTON
// ======================================


function setupBackToTop(){


    const button =
    document.getElementById("backToTop");


    if(!button) return;


    button.style.display = "none";


    window.addEventListener("scroll", () => {


        if(window.scrollY > 300){

            button.style.display = "flex";

        }

        else{

            button.style.display = "none";

        }


    });


    button.addEventListener("click", () => {


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    });


}
// ======================================
// PART 2 - PDF LIBRARY SYSTEM
// ======================================


// Store All PDFs
let allPDFs = [];


// First Time Message Control
let firstPDFLoad = true;



// ======================================
// LOAD PDF DATA FROM JSON
// ======================================

async function loadPDFs(){

    try{


        const response =
        await fetch("data/pdfs.json");


        if(!response.ok){

            throw new Error(
                "PDF JSON file not found"
            );

        }


        const data =
        await response.json();


        allPDFs = data;


        // First time show message
        displayPDFs([]);


        console.log(
            "⚡ PDF Loaded Successfully",
            allPDFs
        );


    }


    catch(error){


        console.error(
            "PDF Loading Error:",
            error
        );


        const container =
        document.querySelector(
            ".pdf-container"
        );


        if(container){

            container.innerHTML = `

            <div class="no-result">

                <h3>
                    PDF Loading Failed
                </h3>

                <p>
                    Check pdfs.json file
                </p>

            </div>

            `;

        }


    }


}



// ======================================
// CREATE PDF CARDS
// ======================================


function displayPDFs(pdfs){


    const container =
    document.querySelector(
        ".pdf-container"
    );


    if(!container) return;


    // Clear old cards
    container.innerHTML = "";



    // No PDF Available
    if(pdfs.length === 0){


        if(firstPDFLoad){


            container.innerHTML = `

            <div class="no-result">

                <h3>
                    📚 Select a Subject
                </h3>

                <p>
                    Choose All or any subject 
                    to view available PDFs.
                </p>

            </div>

            `;


            firstPDFLoad = false;


        }


        else{


            container.innerHTML = `

            <div class="no-result">

                <h3>
                    No PDF Found
                </h3>

                <p>
                    PDFs are not available for 
                    this subject yet.
                </p>

            </div>

            `;


        }


        return;


    }



    // Create PDF Cards
    pdfs.forEach(pdf => {


        const card =
        document.createElement("div");


        card.className =
        "pdf-card";



        card.innerHTML = `


        <img 
        src="${pdf.thumbnail}"
        alt="${pdf.title}"
        class="pdf-thumbnail">


        <h3>
            ${pdf.title}
        </h3>


        <p class="subject-tag">

            ⚡ ${pdf.subject}

        </p>


        <a
        href="${pdf.file}"
        target="_blank"
        class="btn">

            <i class="fa-solid fa-download"></i>

            Download PDF

        </a>


        `;


        container.appendChild(card);


    });


}
// ======================================
// PART 3 - PDF SEARCH & FILTER SYSTEM
// ======================================



// ======================================
// PDF SEARCH SYSTEM
// ======================================

function setupSearch(){


    const searchBox =
    document.querySelector(
        ".search-box input"
    );


    if(!searchBox) return;



    searchBox.addEventListener(
        "input",
        function(){


            const value =
            this.value.toLowerCase();



            const result =
            allPDFs.filter(pdf => {


                return (

                    pdf.title
                    .toLowerCase()
                    .includes(value)


                    ||

                    pdf.subject
                    .toLowerCase()
                    .includes(value)


                );


            });



            displayPDFs(result);


        }


    );


}




// ======================================
// PDF FILTER SYSTEM
// ======================================


function setupFilters(){


    const buttons =
    document.querySelectorAll(
        ".filter-btn"
    );



    buttons.forEach(button => {



        button.addEventListener(
            "click",
            function(){



                // Remove old active button
                buttons.forEach(btn => {


                    btn.classList.remove(
                        "active"
                    );


                });




                // Add new active button
                this.classList.add(
                    "active"
                );




                const category =
                this.dataset.category;




                // Show all PDFs
                if(category === "all"){


                    displayPDFs(
                        allPDFs
                    );


                }



                // Subject wise PDF filter
                else{


                    const filtered =
                    allPDFs.filter(pdf => {


                        return (
                            pdf.category === category
                        );


                    });



                    displayPDFs(
                        filtered
                    );


                }



            }


        );



    });


}
// ======================================
// PART 4 - YOUTUBE VIDEO SYSTEM
// ======================================


// Store All Videos
let allVideos = [];


// ======================================
// LOAD VIDEO DATA FROM JSON
// ======================================

async function loadVideos(){

    try{


        const response =
        await fetch(
            "data/videos.json"
        );


        if(!response.ok){

            throw new Error(
                "videos.json not found"
            );

        }


        const data =
        await response.json();


        allVideos = data;


        displayVideos(allVideos);


        console.log(
            "⚡ Videos Loaded Successfully",
            allVideos
        );


    }


    catch(error){


        console.error(
            "Video Loading Error:",
            error
        );


        const container =
        document.querySelector(
            ".video-container"
        );


        if(container){

            container.innerHTML = `

            <div class="no-result">

                <h3>
                    Video Loading Failed
                </h3>

                <p>
                    Check videos.json file
                </p>

            </div>

            `;

        }


    }


}



// ======================================
// CREATE VIDEO CARDS
// ======================================


function displayVideos(videos){


    const container =
    document.querySelector(
        ".video-container"
    );


    if(!container) return;


    // Clear old videos
    container.innerHTML = "";



    // No Videos Available
    if(videos.length === 0){


        container.innerHTML = `

        <div class="no-result">

            <h3>
                No Videos Found
            </h3>

            <p>
                Videos are not available for this subject yet.
            </p>

        </div>

        `;


        return;


    }



    // Create Video Cards
    videos.forEach(video => {


        const card =
        document.createElement("div");


        card.className =
        "video-card";



        card.innerHTML = `


        <img 
        src="${video.thumbnail}"
        alt="${video.title}"
        class="video-thumbnail">


        <h3>
            ${video.title}
        </h3>


        <p class="subject-tag">

            🎥 ${video.subject}

        </p>


        <a
        href="${video.link}"
        target="_blank"
        class="btn">

            <i class="fa-brands fa-youtube"></i>

            Watch Class

        </a>


        `;


        container.appendChild(card);


    });


}
// ======================================
// PART 5 - VIDEO FILTER SYSTEM
// ======================================


function setupVideoFilters(){


    const buttons =
    document.querySelectorAll(
        ".video-filter-btn"
    );


    buttons.forEach(button => {


        button.addEventListener(
            "click",
            function(){


                // Remove old active button
                buttons.forEach(btn => {


                    btn.classList.remove(
                        "active"
                    );


                });


                // Add active class
                this.classList.add(
                    "active"
                );


                const category =
                this.dataset.category;



                // Show all videos
                if(category === "all"){


                    displayVideos(
                        allVideos
                    );


                }


                // Subject wise videos
                else{


                    const filteredVideos =
                    allVideos.filter(video => {


                        return (
                            video.category === category
                        );


                    });


                    displayVideos(
                        filteredVideos
                    );


                }


            }


        );


    });


}
// ======================================
// PART 6 - COUNTER & SCROLL ANIMATION
// ======================================


// ======================================
// COUNTER ANIMATION
// ======================================


function setupCounter(){


    const counters =
    document.querySelectorAll(
        ".counter"
    );


    const observer =
    new IntersectionObserver(entries => {


        entries.forEach(entry => {


            if(entry.isIntersecting){


                const counter =
                entry.target;


                const target =
                Number(
                    counter.dataset.target
                );


                let count = 0;


                const increment =
                target / 100;



                function updateCounter(){


                    count += increment;


                    if(count < target){


                        counter.innerText =
                        Math.ceil(count);


                        requestAnimationFrame(
                            updateCounter
                        );


                    }


                    else{


                        counter.innerText =
                        target;


                    }


                }


                updateCounter();


                // Run only once
                observer.unobserve(counter);


            }


        });


    });


    counters.forEach(counter => {


        observer.observe(counter);


    });


}




// ======================================
// SCROLL REVEAL ANIMATION
// ======================================


function setupScrollAnimation(){


    const observer =
    new IntersectionObserver(entries => {


        entries.forEach(entry => {


            if(entry.isIntersecting){


                entry.target.classList.add(
                    "show"
                );


            }


        });


    },{

        threshold: 0.15

    });




    const elements =
    document.querySelectorAll(
        ".pdf-card, .video-card, .stat-card, .exam-card, .about-content, .founder-section, .contact-card"
    );



    elements.forEach(element => {


        element.classList.add(
            "hidden"
        );


        observer.observe(element);


    });


}




// ======================================
// AUTO RUN ANIMATION AFTER CARDS LOAD
// ======================================


// PDF Cards Animation
const originalDisplayPDFs =
displayPDFs;


displayPDFs = function(pdfs){


    originalDisplayPDFs(pdfs);


    setupScrollAnimation();


};


// Video Cards Animation
const originalDisplayVideos =
displayVideos;


displayVideos = function(videos){


    originalDisplayVideos(videos);


    setupScrollAnimation();


};
// ======================================
// PART 7 - FINAL WEBSITE STATUS
// ======================================


// Run Initial Scroll Animation
document.addEventListener("DOMContentLoaded", () => {


    // Delay for smooth loading
    setTimeout(() => {


        setupScrollAnimation();


    }, 500);


});



// ======================================
// FINAL CONSOLE MESSAGE
// ======================================


console.log(
`
========================================

      ⚡ VOLTFORGE ELECTRICAL ACADEMY ⚡

         Website Successfully Loaded

      📚 PDF Library Ready
      🎥 Video Library Ready
      🔍 Search System Ready
      🏷️ Category Filter Ready
      ✨ Premium Animation Ready

      Developed by:
      Mr. Arpit Renuka Sanjay Badhe

========================================
`
);