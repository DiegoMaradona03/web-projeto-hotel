document.addEventListener("DOMContentLoaded", () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const themeColor = rootStyles.getPropertyValue("--p4").trim(); // volta para t1 depois do teste

    let metaTheme = document.querySelector('meta[name="theme-color"]');
    metaTheme.setAttribute("content", themeColor);

    let appleStatus = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    appleStatus.setAttribute("content", "black-translucent"); // iOS vai tentar acompanhar
});