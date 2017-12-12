/*              Calling all the Global Elements                 */

var BurgerMenuIcon = document.querySelector(".burgermenu-icon");
var SpanOne = document.querySelector("#nav-icon4 span:nth-child(1)");
var SpanTwo = document.querySelector("#nav-icon4 span:nth-child(2)");
var SpanThree = document.querySelector("#nav-icon4 span:nth-child(3)");
var MenuContainer = document.querySelector("header");
var NavIndication = document.querySelector(".navindication");
var MenuItems = document.querySelectorAll("header a");
var ImageLink = document.querySelector(".grid-section");
var RightArrow = document.querySelector(".rightarrow");
var ArrowCont = document.querySelector(".rightarrow-cont");
var MainContainer = document.querySelector(".main-grid-container");
var LeftMenu = document.querySelector(".menu-left");
var Logo = document.querySelector(".burgermenu-logo path");
var Facebook = document.querySelector(".facebook i");
var Instagram = document.querySelector(".instagram i");
var NannaVallentin = document.querySelector(".nannavallentin path");
var searchParams = new URLSearchParams(window.location.search);
var Pathname = window.location.pathname;
var shop = searchParams.get("shop");
var about = searchParams.get("about");
var categoryid = searchParams.get("categoryid");
var index= Pathname.search('index');
var Modal = document.querySelector(".modal");

/****************************************/

function getArtworkByCategory() {
    fetch("http://coffeandcoal.dk/nannajson/wp-json/wp/v2/artwork?_embed&categories=" + categoryid)
        .then(res => res.json())
        .then(showArtworks);
}


function getProducts() {
    fetch("http://coffeandcoal.dk/nannajson/wp-json/wp/v2/shop?_embed")
        .then(res => res.json())
        .then(showProducts);
}




/*     Event Listeners      */

BurgerMenuIcon.addEventListener("click", OpenMenu);

Modal.addEventListener("click", ModalAdd);


/*                 Burger Menu Clicked and opened, the color of the elements is changing based on if the element itself is dark or light    */
function OpenMenu() {
    MenuContainer.classList.toggle("appear");
    BurgerMenuIcon.classList.toggle("open");
    NavIndication.classList.toggle("fade");
    LeftMenu.classList.toggle("light-bckg");
    SpanOne.classList.toggle("dark-bckg");
    SpanTwo.classList.toggle("dark-bckg");
    SpanThree.classList.toggle("dark-bckg");
    SpanOne.classList.toggle("light-bckg");
    SpanTwo.classList.toggle("light-bckg");
    SpanThree.classList.toggle("light-bckg");
    let MenuItems = document.querySelectorAll("header a");
    MenuItems.forEach(function(menus) {
        menus.classList.toggle("fade");

    });

}

/*                Shop Page to show all the products in the grid layout               */

function showProducts(products) {

    let sectionGrid = document.querySelector("#section-grid");
    let GridShopTemplate = document.querySelector("#shop-template").content;
    products.forEach(function (product) {
        let cloneshop = GridShopTemplate.cloneNode(true);
        cloneshop.querySelector(".image-articles").setAttribute("style", "background-image:url(" + product._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url + ")");
        cloneshop.querySelector(".product-title").textContent = product.acf.product_title;
        cloneshop.querySelector(".product-price").textContent = product.acf.price + "DKK";
        if (product.acf.sold_out == true) {
            cloneshop.querySelector(".sold-out").textContent = "Sold Out";
        }
        sectionGrid.appendChild(cloneshop);


    });

};

/*                      Modal Opened and closed                                            */
function ModalAdd() {
    Modal.classList.add("hide");
    RightArrow.classList.add("hide");
};

/*                     Change the color based on the Category Id of that page                    */
function ChangeColor(drawings){
/*             If the user is on Projects site change the color to light                         */
    if (categoryid == 5) {
        NavIndication.textContent = "Projects";
        MainContainer.classList.add("light-bckg");
        LeftMenu.classList.add("light-bckg");
        NavIndication.classList.add("dark-color");
        MenuContainer.classList.add("dark-bckg");
        SpanOne.classList.add("dark-bckg");
        SpanTwo.classList.add("dark-bckg");
        SpanThree.classList.add("dark-bckg");
        RightArrow.classList.add("light-color");
        MenuItems.forEach(function(menus) {
        menus.classList.add("light-color");
        Logo.classList.add("dark-color");
        NannaVallentin.classList.add("dark-color");
        Facebook.classList.add("dark-color");
        Instagram.classList.add("dark-color");
        });
    }
    /*             If the user is on Characters or Sketches site change the color to Dark                         */
    if (categoryid == 4 || categoryid == 3) {
        MainContainer.classList.add("dark-bckg");
        LeftMenu.classList.add("dark-bckg");
        NavIndication.classList.add("light-color");
        MenuContainer.classList.add("light-bckg");
        SpanOne.classList.add("light-bckg");
        SpanTwo.classList.add("light-bckg");
        SpanThree.classList.add("light-bckg");
        MenuItems.forEach(function(menus) {
        menus.classList.add("dark-color");
        Logo.classList.add("light-color");
        Facebook.classList.add("light-color");
        Instagram.classList.add("light-color");
        NannaVallentin.classList.add("light-color");

        });
    }
     if (categoryid == 4) {
         /*If the user is on Characters, then write on the Navigation Indicator where the user is*/
            NavIndication.textContent = "Characters";
    }
    if (categoryid == 3) {
            NavIndication.textContent = "Sketches";
    }
}

    /*                      Show the artwork on the page                                */
function showArtworks(drawings) {
    let sectionGrid = document.querySelector("#section-grid");
    let GridImageTemplate = document.querySelector("#grid-img-template").content;

            /*                     For each drawing clone the grid-img-template                             */
    drawings.forEach(function(drawing) {
        let clone = GridImageTemplate.cloneNode(true);
/*  If the users screen width is less than 1024 shop the higher quality image, since on mobile and tablet the grid is only a row               */
        if (Math.max(document.documentElement.clientWidth) > 1024) {
            clone.querySelector(".image-articles").setAttribute("style", "background-image:url(" + drawing._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url + ")");
        } else {
            clone.querySelector(".image-articles").setAttribute("style", "background-image:url(" + drawing._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url + ")");
        }
        clone.querySelector(".image-articles").setAttribute("id", drawing.id);

        let Article = clone.querySelector(".article");

        /*                             Fetch the artwork specific to the id of the image                             */
        Article.addEventListener("click", function() {

            fetch("http://coffeandcoal.dk/nannajson/wp-json/wp/v2/artwork/" + drawing.id + "/?_embed").then(function(response) {
                return response.json();
            }).then(function(modalJson) {
                return showModal(modalJson);
            })
        });


        sectionGrid.appendChild(clone);

    /*                  Modal appears for an artwork that is clicked                                    */
        function showModal(singleevent) {
            RightArrow.classList.remove("hide");
            Modal.classList.remove("hide");
            Modal.classList.add("modal-show");
            LeftMenu.classList.toggle("dark-bckg");
            Modal.querySelector(".modal-name").textContent = singleevent.acf.title;
            Modal.querySelector(".modal-description").textContent = singleevent.acf.description;
            Modal.querySelector(".modal-image").setAttribute("style", "background-image:url(" + singleevent._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url + ")");
            RightArrow.addEventListener("click", NextModal);

            for (i = 0; i < drawings.length; i++) {
                if (singleevent.id == drawings[i].id) {
                    return i;
                }
            }

            function NextModal() {

                i++;
                /*The value of an i which is an index of an array is increasing everytime the function is running so that you can get the next image*/

                Modal.querySelector(".modal .modal-image").setAttribute("style", "background-image:url(" + drawings[i]._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url + ")");

                console.log(i);
            }
        };
    });

    let Menu = document.querySelector(".menu-left");
}
/*              Only show SVG animation after page has loaded/ Stackoverflow: show content after page has loaded, add a time delay  */

function Loading(){
setTimeout(function() {
  document.body.classList.add("loaded");
document.querySelector('body .drawing defs style').textContent='.cls-1{fill:none;stroke:#233b75;stroke-linecap:round;stroke-linejoin:round;}';
    document.querySelector('header').classList.add('loaded');
}, 1000)};

/*                                Run certain functions for specific webpages                                  */

/* if the URL of the Website contains the word index do the function specific for the page*/
if (index == 1){
    Loading();
}
/* if the URL of the Website contains the word shop do the function specific for the page*/
if (shop) {
    getProducts();
}
/* if the URL of the Website contains the word categoryid do the function specific for the page/s*/
 if(categoryid) {
    getArtworkByCategory();
    ModalAdd();
    ChangeColor();
}
