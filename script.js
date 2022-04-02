"use strict";

//function to create element and set attribute using DOM
function createElement(elementName, attributeName, attributeValue) {
    var Element = document.createElement(elementName);
    Element.setAttribute(attributeName, attributeValue);
    return Element;
}

//creating the main div
const main_container = createElement("div", "class", "main_container");
document.body.appendChild(main_container);

//creating the search box
const search_box = createElement("div", "class", "search_box");
main_container.appendChild(search_box);


//creating the input box
const input_box = createElement("input", "class", "input_box");
input_box.setAttribute("placeholder", "Search by Breweries Name, City, State...");
search_box.appendChild(input_box);

//creating the body
const container_body = createElement("div", "class", "container_body");
main_container.appendChild(container_body);

//Object to store base URL
const BreweriesApi = {
    baseUrl: "https://api.openbrewerydb.org/breweries"
};

//Add Evnet listner Function
input_box.addEventListener("keypress", (event) => {
    container_body.innerHTML = "";
    if (event.keyCode === 13) {
        // console.log(input_box.value + "is typed in input box");
        getData(input_box.value);
    }
})

//fetching the Data from the API endpoint
async function getData(endpoint) {
    //try and catch to handle error
    try {
        // console.log("This is a " + endpoint);
        const response = await fetch(`${BreweriesApi.baseUrl}/search?query=${endpoint}`);
        // console.log(response);
        const data = await response.json();
        console.log(data);
        showData(data);
    }
    catch (err) {
        alert("There is problem to fetching the data");
        console.log(err);
    }
}

//show the Data
function showData(data) {
    //iterating the throuth the objects and create cards
    data.map(Object => {
        console.log(Object);

        //creating the cards
        const cards = createElement("div", "class", "cards");
        container_body.appendChild(cards);

        const brewery_details = createElement("div", "class", "brewery_details");
        cards.appendChild(brewery_details);

        const name = createElement("div", "class", "name");
        brewery_details.appendChild(name);
        name.innerHTML = Object.name;

        const type = createElement("div", "class", "type");
        brewery_details.appendChild(type);
        type.innerHTML = Object.brewery_type;

        const location_details = createElement("div", "class", "location_details");
        cards.appendChild(location_details);

        const street = createElement("div", "class", "street");
        location_details.appendChild(street);
        street.innerHTML = Object.street;

        const city = createElement("div", "class", "city");
        location_details.appendChild(city);
        city.innerHTML = Object.city;

        const state = createElement("div", "class", "state");
        location_details.appendChild(state);
        state.innerHTML = Object.state;

        const country = createElement("div", "class", "country");
        location_details.appendChild(country);
        country.innerHTML = Object.country;

        const contact_details = createElement("div", "class", "contact_details");
        cards.appendChild(contact_details);

        const website_url = createElement("div", "class", "website_url");
        contact_details.appendChild(website_url);

        const a = createElement("a", "href", "http://www.divingdogbrew.com");
        a.setAttribute("target", Object.website_url);
        website_url.appendChild(a);
        a.innerHTML = Object.website_url;

        const phone = createElement("div", "class", "phone");
        contact_details.appendChild(phone);
        phone.innerHTML = Object.phone;
    });
}



