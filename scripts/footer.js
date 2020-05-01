var footer = document.getElementById("footer");
var current_footer_id="";

footer.addEventListener("click", OpenInNewWindow);

function OpenInNewWindow(e)
{
    var footer_id = e.target.getAttribute("id");

    if(footer_id==="footer_home" && footer_id!=current_footer_id)
    {
        window.open("./index.html", "_self");
        current_footer_id="footer_home";
    }
    if(footer_id==="footer_list" && footer_id!=current_footer_id)
    {
        window.open("./listPage.html", "_self");
        current_footer_id="footer_list";
    }
    if(footer_id==="footer_custom_page" && footer_id!=current_footer_id)
    {
        window.open("./favorites.html", "_self");
        current_footer_id="footer_custom_page";
    }
    if(footer_id==="footer_about_us" && footer_id!=current_footer_id)
    {
        window.open("./about/about.html", "_self");
        current_footer_id="footer_about_us";
    }


}