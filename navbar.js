function highlightActiveTab() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf("/") + 1);

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeTab = document.querySelector(`#${filename.split('.')[0]}Tab`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

function navigateTo(page, button) {
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    button.classList.add('active');

    window.location.href = page;

}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
