document.addEventListener("DOMContentLoaded", () => {
    const root = getComputedStyle(document.documentElement);
    const themeColor = root.getPropertyValue("--p4").trim(); // usa exatamente a cor que você quer

    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
        metaTheme = document.createElement("meta");
        metaTheme.setAttribute("name", "theme-color");
        document.head.appendChild(metaTheme);
    }

    metaTheme.setAttribute("content", themeColor);
});