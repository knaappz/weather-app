export const plWeatherDescription = (description, code) => {
    const descriptions = {
        // Group 2xx: Thunderstorm
        200: "Burza z lekkim deszczem",
        201: "Burza z deszczem",
        202: "Burza z ulewnym deszczem",
        210: "Lekka burza",
        211: "Burza",
        212: "Silna burza",
        221: "Poszarpana burza",
        230: "Burza z lekką mżawką",
        231: "Burza z mżawką",
        232: "Burza z intensywną mżawką",
    
        // Group 3xx: Drizzle
        300: "Mżawka o lekkim natężeniu",
        301: "Mżawka",
        302: "Mżawka o dużym natężeniu",
        310: "Mżawka z lekkim deszczem",
        311: "Mżawka z deszczem",
        312: "Intensywna mżawka z deszczem",
        313: "Przelotny deszcz i mżawka",
        314: "Ulewny deszcz z mżawką",
        321: "Przelotna mżawka",
    
        // Group 5xx: Rain
        500: "Lekki deszcz",
        501: "Umiarkowany deszcz",
        502: "Ulewny deszcz",
        503: "Bardzo ulewny deszcz",
        504: "Ekstremalny deszcz",
        511: "Marznący deszcz",
        520: "Przelotny deszcz o małym natężeniu",
        521: "Przelotny deszcz",
        522: "Przelotny deszcz o dużym natężeniu",
        531: "Poszarpany przelotny deszcz",
    
        // Group 6xx: Snow
        600: "Lekki śnieg",
        601: "Śnieg",
        602: "Intensywny śnieg",
        611: "Deszcz ze śniegiem",
        612: "Lekki deszcz ze śniegiem",
        613: "Przelotny deszcz ze śniegiem",
        615: "Lekki deszcz i śnieg",
        616: "Deszcz i śnieg",
        620: "Lekki przelotny śnieg",
        621: "Przelotny śnieg",
        622: "Intensywny przelotny śnieg",
    
        // Group 7xx: Atmosphere
        701: "Mgła",
        711: "Dym",
        721: "Zamglenie",
        731: "Wirujący pył/piasek",
        741: "Mgła",
        751: "Piasek",
        761: "Pył",
        762: "Popiół wulkaniczny",
        771: "Szkwały",
        781: "Tornado",
    
        // Group 800: Clear
        800: "Czyste niebo",
        801: "Niewielkie zachmurzenie",
        802: "Rozproszone chmury",
        803: "Umiarkowane zachmurzenie",
        804: "Pełne zachmurzenie",
      };
      
        return descriptions[code] || description;
      };

