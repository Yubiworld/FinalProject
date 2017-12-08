let BurgerMenuIcon = document.querySelector('.burgermenu-icon');
let SpanOne = document.querySelector('#nav-icon4 span:nth-child(1)')
let SpanThree = document.querySelector('#nav-icon4 span:nth-child(3)')
let MenuContainer = document.querySelector('header');
let NavIndication = document.querySelector('.navindication');
let MenuItems = document.querySelectorAll("header a");
let ImageLink = document.querySelector('.gird-image-a');
BurgerMenuIcon.addEventListener('click', OpenMenu);

function OpenMenu() {

    MenuContainer.classList.toggle('appear');
    BurgerMenuIcon.classList.toggle('open');
    SpanOne.classList.toggle('dark-bckg');
    SpanThree.classList.toggle('dark-bckg');
    NavIndication.classList.toggle('fade');
    let MenuItems = document.querySelectorAll("header a");
    MenuItems.forEach(function (menus) {
        menus.classList.toggle('fade');
    });

}
//
//var path = document.querySelector(".drawingart path");
//var total_length = path.getTotalLength();
//console.log(total_length);


function getAllArtwork() {
    fetch("http://coffeandcoal.dk/nannajson/wp-json/wp/v2/artwork?_embed")
        .then(res => res.json())
        .then(showArtwork);


}


function showArtwork(drawings) {
    console.log(drawings);
    let sectionGrid = document.querySelector('#section-grid');
    let GridImageTemplate = document.querySelector('#grid-img-template').content;
    drawings.forEach(function (drawing) {
        let clone = GridImageTemplate.cloneNode(true);
        clone.querySelector('img').setAttribute("src", drawing._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        sectionGrid.appendChild(clone);
    })


    let Menu = document.querySelector('.menu-left');

    document.querySelector('.characters').addEventListener('click', CharactersPage);
    document.querySelector('.projects').addEventListener('click', ProjectsPage);
    document.querySelector('.sketches').addEventListener('click', SketchesPage);

    function CharactersPage(drawings) {

        if (Menu.classList.contains('dark-bckg')) {
            console.log('its light');
            document.querySelector('.navindication').textContent = 'Characters';
        }
    }

    function ProjectsPage() {

    };

    function SketchesPage() {

    };
}





getAllArtwork();
