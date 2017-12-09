let BurgerMenuIcon = document.querySelector('.burgermenu-icon');
let SpanOne = document.querySelector('#nav-icon4 span:nth-child(1)')
let SpanThree = document.querySelector('#nav-icon4 span:nth-child(3)')
let MenuContainer = document.querySelector('header');
let NavIndication = document.querySelector('.navindication');
let MenuItems = document.querySelectorAll("header a");
let ImageLink = document.querySelector('.grid-section');
BurgerMenuIcon.addEventListener('click', OpenMenu);
let Modal = document.querySelector('.modal');




function showModal(singleevent) {

    console.log('working')
    Modal.classList.add('modal-show');
    let SingleImageSection = document.querySelector('.single-image-section');
    let SingleTextSection = document.querySelector('.single-text-section');
    let SingleImageTemplate = document.querySelector('.single-image-template');
    let SingleTextTemplate = document.querySelector('.single-text-template').content;
    cloneimage.querySelector('.single-image').setAttribute('src', singleevent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
    let clonetext = SingleTextTemplate.cloneNode(true);
    let cloneimage = SingleImageTemplate.cloneNode(true);
}




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
        clone.querySelector('img').setAttribute('id', drawing.id);

        let Article = clone.querySelector('.article');
        Article.addEventListener('click', function () {
            console.log(drawing.id);
            fetch("http://coffeandcoal.dk/nannajson/wp-json/wp/v2/artwork/" + drawing.id + "/?_embed").then(function (response) {
                return response.json();
            }).then(function (modalJson) {
                return showModal(modalJson);
            })


        });


        sectionGrid.appendChild(clone);


        function showModal(singleevent) {

            console.log(singleevent);
            Modal.classList.add('modal-show');
            let SingleImageSection = document.querySelector('.single-image-section');
            let SingleTextSection = document.querySelector('.single-text-section');
            let SingleImageTemplate = document.querySelector('.single-image-template');
            let SingleTextTemplate = document.querySelector('.single-text-template').content;
            let clonetext = SingleImageTemplate.cloneNode(true);
            let cloneimage = SingleTextTemplate.cloneNode(true);
            cloneimage.querySelector('img').setAttribute('src', singleevent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        }




    });


    let Menu = document.querySelector('.menu-left');

    //    document.querySelector('.characters').addEventListener('click', CharactersPage);
    //    document.querySelector('.projects').addEventListener('click', ProjectsPage);
    //    document.querySelector('.sketches').addEventListener('click', SketchesPage);

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
