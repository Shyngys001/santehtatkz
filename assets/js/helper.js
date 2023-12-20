//==== TO LOAD HTML FILE AND REUSE IT ====//
function load(element, htmlFile) {
    const resultElement = document.querySelector(element);

    // Make a fetch request to the server to get the HTML content
    fetch(htmlFile)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        }).then(htmlContent => {
            // Set the HTML content to the resultElement
            resultElement.innerHTML = htmlContent;
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

load('.header', '/assets/html/header.html');
load('.footer', '/assets/html/footer.html');
load('.sidebar', '/assets/html/mobile-navbar.html');

