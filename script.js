var BurgerMenuIcon = document.querySelector(".burgermenu-icon");
var SpanOne = document.querySelector("#nav-icon4 span:nth-child(1)");
var SpanTwo = document.querySelector("#nav-icon4 span:nth-child(2)");
var SpanThree = document.querySelector("#nav-icon4 span:nth-child(3)");
var MenuContainer = document.querySelector("header");
var NavIndication = document.querySelector(".navindication");
var MenuItems = document.querySelectorAll("header a");
var ImageLink = document.querySelector(".grid-section");
var RightArrow = document.querySelector(".rightarrow path");
var ArrowCont = document.querySelector(".rightarrow-cont");
var MainContainer = document.querySelector(".main-grid-container");
var LeftMenu = document.querySelector(".menu-left");
var Logo = document.querySelector(".burgermenu-logo path");
var Facebook = document.querySelector(".facebook i");
var Instagram = document.querySelector(".instagram i");
var NannaVallentin = document.querySelector(".nannavallentin path");





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


BurgerMenuIcon.addEventListener("click", OpenMenu);
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


function showProducts(products) {

    console.log(products);
    let sectionGrid = document.querySelector("#section-grid");
    let GridShopTemplate = document.querySelector("#shop-template").content;

    products.forEach(function(product) {
        let cloneshop = GridShopTemplate.cloneNode(true);
        cloneshop.querySelector(".shop-article .image-container .image-articles").setAttribute("style", "background-image:url(" + product._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url + ")");
        cloneshop.querySelector(".product-title").textContent = product.acf.product_title;
        cloneshop.querySelector(".product-price").textContent = product.acf.price + "DKK";
        if (product.acf.sold_out == true) {
            cloneshop.querySelector(".sold-out").textContent = "Sold Out";
        }

        sectionGrid.appendChild(cloneshop);


    })




}
let Modal = document.querySelector(".modal");
Modal.addEventListener("click", ModalAdd);

function ModalAdd() {
    Modal.classList.add("hide");
    RightArrow.classList.add("hide")
};


function showArtworks(drawings) {


/*/break the functions/*/
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
        if (categoryid == 4) {
            NavIndication.textContent = "Characters";
        }
        if (categoryid == 3) {
            NavIndication.textContent = "Sketches";
        }


    }


    let sectionGrid = document.querySelector("#section-grid");
    let GridImageTemplate = document.querySelector("#grid-img-template").content;

    drawings.forEach(function(drawing) {
        let clone = GridImageTemplate.cloneNode(true);
        if (Math.max(document.documentElement.clientWidth) > 1024) {
            clone.querySelector(".image-articles").setAttribute("style", "background-image:url(" + drawing._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url + ")");
        } else {
            clone.querySelector(".image-articles").setAttribute("style", "background-image:url(" + drawing._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url + ")");
        }
        clone.querySelector(".image-articles").setAttribute("id", drawing.id);

        let Article = clone.querySelector(".article");
        Article.addEventListener("click", function() {

            fetch("http://coffeandcoal.dk/nannajson/wp-json/wp/v2/artwork/" + drawing.id + "/?_embed").then(function(response) {
                return response.json();
            }).then(function(modalJson) {
                return showModal(modalJson);
            })
        });


        sectionGrid.appendChild(clone);


        function showModal(singleevent) {
            console.log(singleevent)
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

let searchParams = new URLSearchParams(window.location.search);


let shop = searchParams.get("shop");
let about = searchParams.get("about");
let categoryid = searchParams.get("categoryid");

if (shop) {
    getProducts();
    ModalAdd();
}
if (categoryid) {
    getArtworkByCategory();
    ModalAdd();
}
