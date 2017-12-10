let BurgerMenuIcon = document.querySelector('.burgermenu-icon');
let SpanOne = document.querySelector('#nav-icon4 span:nth-child(1)')
let SpanThree = document.querySelector('#nav-icon4 span:nth-child(3)')
let MenuContainer = document.querySelector('header');
let NavIndication = document.querySelector('.navindication');
let MenuItems = document.querySelectorAll("header a");
let ImageLink = document.querySelector('.grid-section');
BurgerMenuIcon.addEventListener('click', OpenMenu);
let RightArrow = document.querySelector('.rightarrow');
var indexvalue = 0;
let Modal = document.querySelector('.modal');
Modal.addEventListener('click', function () {
    Modal.classList.add('hide');
});




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
    let sectionGrid = document.querySelector('#section-grid');
    let GridImageTemplate = document.querySelector('#grid-img-template').content;

    drawings.forEach(function (drawing) {
        let clone = GridImageTemplate.cloneNode(true);
        if (Math.max(document.documentElement.clientWidth) > 1024) {
            clone.querySelector('.image-articles').setAttribute('style', 'background-image:url(' + drawing._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url + ')');
        } else {
            clone.querySelector('.image-articles').setAttribute('style', 'background-image:url(' + drawing._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url + ')');
        }
        clone.querySelector('.image-articles').setAttribute('id', drawing.id);

        let Article = clone.querySelector('.article');
        Article.addEventListener('click', function () {

            fetch("http://coffeandcoal.dk/nannajson/wp-json/wp/v2/artwork/" + drawing.id + "/?_embed").then(function (response) {
                return response.json();
            }).then(function (modalJson) {
                return showModal(modalJson);
                return Nextmodal(modalJson);
            })


        });


        sectionGrid.appendChild(clone);


        function showModal(singleevent) {

            Modal.classList.add('modal-show');


            Modal.querySelector(".modal-image").setAttribute('style', 'background-image:url(' + singleevent._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url + ')');

            Modal.classList.remove('hide');


            RightArrow.addEventListener('click', NextModal);

            for (i=0; i < drawings.length; i++) {
                if (singleevent.id == drawings[i].id) {
                    indexvalue = i;
                }
            }

            function NextModal() {

                Modal.querySelector(".modal .modal-image").setAttribute('style', 'background-image:url(' + drawings[indexvalue + 1]._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url + ')');
                console.log(indexvalue);
            }




        };









    });



    function getArtworkByCategory(id) {
        console.log('works')
        fetch("http://coffeandcoal.dk/nannajson/wp-json/wp/v2/artwork?_embed&categories=" + id)
            .then(res => res.json())
            .then(showArtworkType);
    }


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
