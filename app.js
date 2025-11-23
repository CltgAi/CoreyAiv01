document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const section = link.dataset.section;

        document.querySelectorAll(".page-section").forEach(s =>
            s.classList.remove("active")
        );

        document.getElementById(section).classList.add("active");
    });
});

// CSV Upload
document.getElementById("csvFile").addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const rows = e.target.result.split("\n").map(r => r.split(","));
        let html = "<table border='1'>";

        rows.forEach(r => {
            html += "<tr>";
            r.forEach(c => html += `<td>${c}</td>`);
            html += "</tr>";
        });
        html += "</table>";

        document.getElementById("csv-output").innerHTML = html;
    };

    reader.readAsText(file);
});
