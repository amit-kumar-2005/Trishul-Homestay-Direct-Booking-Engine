/* =====================================
   WHATSAPP CONFIG
===================================== */

const WHATSAPP_NUMBER =
    "917250192373";

/* =====================================
   FORM ELEMENT
===================================== */

const bookingForm =
    document.getElementById(
        "bookingForm"
    );

/* =====================================
   VALIDATION HELPERS
===================================== */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}

function isValidPhone(phone) {

    return /^[0-9]{10}$/
        .test(phone);

}

/* =====================================
   FORM SUBMIT
===================================== */

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const checkIn =
                document.getElementById(
                    "checkIn"
                ).value;

            const checkOut =
                document.getElementById(
                    "checkOut"
                ).value;

            const guests =
                document.getElementById(
                    "guests"
                ).value;

            const roomType =
                document.getElementById(
                    "roomType"
                ).value;

            const fullName =
                document.getElementById(
                    "fullName"
                ).value.trim();

            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();

            const email =
                document.getElementById(
                    "email"
                ).value.trim();

            const message =
                document.getElementById(
                    "message"
                ).value.trim();

            /* =========================
               VALIDATION
            ========================= */

            if (
                !checkIn ||
                !checkOut
            ) {

                alert(
                    "Please select booking dates."
                );

                return;

            }

            if (
                new Date(checkOut) <=
                new Date(checkIn)
            ) {

                alert(
                    "Check-Out date must be after Check-In date."
                );

                return;

            }

            if (
                fullName.length < 3
            ) {

                alert(
                    "Please enter a valid name."
                );

                return;

            }

            if (
                !isValidPhone(phone)
            ) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;

            }

            if (
                !isValidEmail(email)
            ) {

                alert(
                    "Please enter a valid email address."
                );

                return;

            }

            /* =========================
               WHATSAPP MESSAGE
            ========================= */

            const whatsappMessage =

`Hello Trishul Homestay,

I would like to inquire about a booking.

--------------------------------

Check-In: ${checkIn}

Check-Out: ${checkOut}

Guests: ${guests}

Room Type: ${roomType}

--------------------------------

Guest Details

Name: ${fullName}

Phone: ${phone}

Email: ${email}

--------------------------------

Special Request:

${message || "N/A"}

--------------------------------

Please let me know availability.

Thank You.`;

            const encodedMessage =
                encodeURIComponent(
                    whatsappMessage
                );

            const whatsappURL =

`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}