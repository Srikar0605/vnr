document.addEventListener('DOMContentLoaded', function () {
    function updateLanguageDropdown() {
        var iframe = document.querySelector("iframe.goog-te-menu-frame");
        if (iframe) {
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

            if (iframeDoc.readyState === 'complete') {
                var languages = iframeDoc.querySelectorAll(".goog-te-menu2-item div.text");

                languages.forEach(function(languageElem) {
                    var lang = languageElem.textContent.trim();
                    var nativeLang = getNativeLang(lang);
                    if (nativeLang) {
                        languageElem.textContent = nativeLang;
                    }
                });
            }
        }
    }

    function getNativeLang(lang) {
        switch (lang) {
            case "Spanish":
                return "Español";
            case "Hindi":
                return "हिन्दी";
            case "Telugu":
                return "తెలుగు";
            // Add other languages as needed
            default:
                return null;
        }
    }

    // Monitor the Google Translate dropdown for changes and update languages
    let observer = new MutationObserver(updateLanguageDropdown);
    let config = { attributes: true, childList: true, subtree: true };

    let targetNode = document.getElementById('google_translate_element');
    observer.observe(targetNode, config);

    // Also attempt to update languages after a delay to ensure the iframe is fully loaded
    setTimeout(updateLanguageDropdown, 3000);
});
