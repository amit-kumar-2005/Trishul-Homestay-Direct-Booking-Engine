/* =====================================
   CALENDAR ELEMENTS
===================================== */

const calendar =
    document.getElementById("calendar");

const monthYear =
    document.getElementById("monthYear");

const prevMonthBtn =
    document.getElementById("prevMonth");

const nextMonthBtn =
    document.getElementById("nextMonth");

/* =====================================
   CURRENT DATE
===================================== */

let currentDate =
    new Date();

/* =====================================
   AVAILABILITY DATA
===================================== */

let availabilityData = {};

/* =====================================
   LOAD AVAILABILITY
===================================== */

async function loadAvailability() {

    try {

        const response =
            await fetch(
                "data/availability.json"
            );

        availabilityData =
            await response.json();

        renderCalendar();

    } catch (error) {

        console.error(
            "Availability Load Error:",
            error
        );

        if (calendar) {

            calendar.innerHTML = `

                <div class="error-message">

                    Unable to load availability data.

                </div>

            `;

        }

    }

}

/* =====================================
   RENDER CALENDAR
===================================== */

function renderCalendar() {

    if (!calendar) return;

    calendar.innerHTML = "";

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();

    const firstDay =
        new Date(year, month, 1);

    const lastDay =
        new Date(year, month + 1, 0);

    const totalDays =
        lastDay.getDate();

    const startDay =
        firstDay.getDay();

    const monthNames = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",

        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];

    monthYear.textContent =
        `${monthNames[month]} ${year}`;

    /* Empty Spaces */

    for (
        let i = 0;
        i < startDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        calendar.appendChild(empty);

    }

    /* Days */

    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const dayBox =
            document.createElement("div");

        dayBox.classList.add(
            "calendar-day"
        );

        const formattedDate =
            formatDate(
                year,
                month + 1,
                day
            );

        if (
            availabilityData[
                formattedDate
            ] === "available"
        ) {

            dayBox.classList.add(
                "available"
            );

        }

        if (
            availabilityData[
                formattedDate
            ] === "booked"
        ) {

            dayBox.classList.add(
                "booked"
            );

        }

        dayBox.textContent = day;

        calendar.appendChild(dayBox);

    }

}

/* =====================================
   FORMAT DATE
===================================== */

function formatDate(
    year,
    month,
    day
) {

    return `${year}-${String(month)
        .padStart(2, "0")}-${String(day)
        .padStart(2, "0")}`;

}

/* =====================================
   MONTH NAVIGATION
===================================== */

if (prevMonthBtn) {

    prevMonthBtn.addEventListener(
        "click",
        () => {

            currentDate.setMonth(
                currentDate.getMonth() - 1
            );

            renderCalendar();

        }
    );

}

if (nextMonthBtn) {

    nextMonthBtn.addEventListener(
        "click",
        () => {

            currentDate.setMonth(
                currentDate.getMonth() + 1
            );

            renderCalendar();

        }
    );

}

/* =====================================
   INIT
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    loadAvailability
);