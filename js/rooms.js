/* =====================================
   ROOMS DATA LOADER
===================================== */

const roomsContainer =
    document.getElementById("rooms-container");

/* =====================================
   LOAD ROOMS
===================================== */

async function loadRooms() {

    try {

        const response =
            await fetch("data/rooms.json");

        const rooms =
            await response.json();

        displayRooms(rooms);

    } catch (error) {

        console.error(
            "Error loading rooms:",
            error
        );

        if (roomsContainer) {

            roomsContainer.innerHTML = `

                <div class="error-message">

                    <h3>
                        Unable to load rooms
                    </h3>

                    <p>
                        Please try again later.
                    </p>

                </div>

            `;

        }

    }

}

/* =====================================
   DISPLAY ROOMS
===================================== */

function displayRooms(rooms) {

    if (!roomsContainer) return;

    roomsContainer.innerHTML = "";

    rooms.forEach(room => {

        const amenitiesHTML =
            room.amenities
                .map(item =>
                    `<span>${item}</span>`
                )
                .join("");

        const card = `

            <div class="room-card">

                <div class="room-image">

                    <img
                        src="${room.image}"
                        alt="${room.name}"
                    >

                </div>

                <div class="room-content">

                    <h3>
                        ${room.name}
                    </h3>

                    <p>
                        ${room.description}
                    </p>

                    <div class="room-meta">

                        <span>

                            <i class="fas fa-user-friends"></i>

                            ${room.capacity}

                        </span>

                    </div>

                    <div class="room-amenities">

                        ${amenitiesHTML}

                    </div>

                    <div class="room-footer">

                        <h4>

                            ${room.price}

                        </h4>

                        <a
                            href="booking.html"
                            class="btn btn-primary"
                        >

                            Book Now

                        </a>

                    </div>

                </div>

            </div>

        `;

        roomsContainer.insertAdjacentHTML(
            "beforeend",
            card
        );

    });

}

/* =====================================
   INIT
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    loadRooms
);