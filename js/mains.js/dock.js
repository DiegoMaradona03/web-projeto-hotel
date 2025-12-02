document.addEventListener("DOMContentLoaded", () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const t1 = rootStyles.getPropertyValue("--t1").trim();

    // Atualiza o meta theme-color (Android)
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
        metaTheme = document.createElement("meta");
        metaTheme.setAttribute("name", "theme-color");
        document.head.appendChild(metaTheme);
    }
    metaTheme.setAttribute("content", t1);

    // Ajuste extra para iOS
    let appleStatus = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleStatus) {
        appleStatus.setAttribute("content", "black-translucent");
    }
});