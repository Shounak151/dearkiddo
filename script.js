// ==========================================
// VARIABLES
// ==========================================

let selectedDate = "";

let selectedActivity = "";

const noBtn1 =
    document.getElementById("noBtn1");

const yesBtn1 =
    document.querySelector("#page1 .yes-btn");

const firstPageMessage =
    document.getElementById("firstPageMessage");

let firstPageNoClickCount = 0;

const firstPageMessages = [
    "Are you sure? 👀",
    "Better say yes 😌",
    "Please :(",
    "Don't do this 😭",
    "I'm gonna cry 🥺",
    "💔 <3"
];

if (noBtn1) {

    noBtn1.style.position = "static";
    noBtn1.style.left = "auto";
    noBtn1.style.top = "auto";

    noBtn1.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            firstPageNoClickCount += 1;

            const nextScale =
                Math.min(
                    1.08 + firstPageNoClickCount * 0.08,
                    1.4
                );

            if (yesBtn1) {

                yesBtn1.style.transform = "scale(" + nextScale + ")";

            }

            if (firstPageMessage) {

                firstPageMessage.textContent =
                    firstPageMessages[
                        Math.min(
                            firstPageNoClickCount - 1,
                            firstPageMessages.length - 1
                        )
                    ];

                firstPageMessage.hidden = false;

            }

        }
    );

}


// ==========================================
// GO TO PAGE
// ==========================================

function goToPage(pageNumber) {

    document
        .querySelectorAll(".page")
        .forEach(function (page) {

            page.classList.remove("active");

        });


    const nextPage =
        document.getElementById(
            "page" + pageNumber
        );


    if (nextPage) {

        nextPage.classList.add("active");

    }

}


// ==========================================
// MOVE NO BUTTON
// ==========================================

function moveNoButton(button) {

    const buttonWidth =
        button.offsetWidth;

    const buttonHeight =
        button.offsetHeight;


    const padding = 20;


    const maxX =
        window.innerWidth -
        buttonWidth -
        padding;


    const maxY =
        window.innerHeight -
        buttonHeight -
        padding;


    const randomX =
        Math.floor(
            Math.random() *
            Math.max(maxX - padding, 1)
        ) + padding;


    const randomY =
        Math.floor(
            Math.random() *
            Math.max(maxY - padding, 1)
        ) + padding;


    button.style.position = "fixed";

    button.style.left =
        randomX + "px";

    button.style.top =
        randomY + "px";

}


// ==========================================
// PAGE 2 NO BUTTON
// ==========================================

const noBtn2 =
    document.getElementById("noBtn2");


if (noBtn2) {

    noBtn2.addEventListener(
        "mouseenter",
        function () {

            moveNoButton(noBtn2);

        }
    );


    noBtn2.addEventListener(
        "touchstart",
        function (event) {

            event.preventDefault();

            moveNoButton(noBtn2);

        },
        {
            passive: false
        }
    );

}


// ==========================================
// SELECT DATE
// ==========================================

function selectDate(button, date) {

    selectedDate = date;


    const buttons =
        document.querySelectorAll(
            "#page3 .options button"
        );


    buttons.forEach(
        function (btn) {

            btn.classList.remove(
                "selected"
            );

        }
    );


    button.classList.add(
        "selected"
    );

}


// ==========================================
// SELECT ACTIVITY
// ==========================================

function selectActivity(
    button,
    activity
) {

    selectedActivity =
        activity;


    const buttons =
        document.querySelectorAll(
            "#page4 .options button"
        );


    buttons.forEach(
        function (btn) {

            btn.classList.remove(
                "selected"
            );

        }
    );


    button.classList.add(
        "selected"
    );

}


// ==========================================
// FINISH PLAN
// ==========================================

function finishPlan() {

    // Check date

    if (selectedDate === "") {

        alert(
            "First choose a Pujo day 😌"
        );

        return;

    }


    // Check activity

    if (selectedActivity === "") {

        alert(
            "Choose what you want to do 👀"
        );

        return;

    }


    // ======================================
    // UPDATE FINAL PAGE
    // ======================================

    document.getElementById(
        "finalDate"
    ).textContent =
        selectedDate;


    document.getElementById(
        "finalActivity"
    ).textContent =
        selectedActivity;


    // Show final page

    goToPage(5);


    // Celebration

    createConfetti();


    // ======================================
    // SEND EMAIL
    // ======================================

    const templateParams = {

        pujo_day:
            selectedDate,

        activity:
            selectedActivity

    };


    emailjs
        .send(
            "service_az0fil",
            "template_e6hgh8j",
            templateParams
        )

        .then(
            function (response) {

                console.log(
                    "EMAIL SENT SUCCESSFULLY!",
                    response.status,
                    response.text
                );

            }
        )

        .catch(
            function (error) {

                console.error(
                    "EMAIL FAILED:",
                    error
                );

            }
        );

}


// ==========================================
// CONFETTI
// ==========================================

function createConfetti() {

    const symbols = [

        "🌸",
        "✨",
        "🎊",
        "🌼",
        "⭐",
        "🪔"

    ];


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        confetti.style.position =
            "fixed";


        confetti.style.left =
            Math.random() * 100 +
            "vw";


        confetti.style.top =
            "-30px";


        confetti.style.fontSize =
            15 +
            Math.random() * 20 +
            "px";


        confetti.style.zIndex =
            "9999";


        confetti.style.pointerEvents =
            "none";


        const duration =
            2 +
            Math.random() * 3;


        confetti.style.transition =
            "top " +
            duration +
            "s linear, transform " +
            duration +
            "s linear";


        document.body.appendChild(
            confetti
        );


        setTimeout(
            function () {

                confetti.style.top =
                    "110vh";


                confetti.style.transform =
                    "rotate(" +
                    Math.random() * 720 +
                    "deg)";

            },
            50
        );


        setTimeout(
            function () {

                confetti.remove();

            },
            (duration + 1) * 1000
        );

    }

}