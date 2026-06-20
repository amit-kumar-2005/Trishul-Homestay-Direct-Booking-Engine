/* =====================================
   THEME TOGGLE
===================================== */

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

/* =====================================
   LOAD SAVED THEME
===================================== */

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    if (themeToggle) {
        themeToggle.innerHTML =
            '<i class="fas fa-sun"></i>';
    }

}

/* =====================================
   TOGGLE THEME
===================================== */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        if (isDark) {

            localStorage.setItem("theme", "dark");

            themeToggle.innerHTML =
                '<i class="fas fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "light");

            themeToggle.innerHTML =
                '<i class="fas fa-moon"></i>';

        }

    });

}