const cheerio = require('cheerio');

// The URL of the page you want to scrape
const url = "https://www.basketball-reference.com/players/"

const scrapeLink = async (player) => {
    try {
        // Fetch the HTML of the page
        const letter = player.split(" ")[1][0]
        const response = await fetch(url.concat(letter.toLowerCase()));
        const data = await response.text();


        // Load the HTML into cheerio
        const $ = cheerio.load(data);

        // Select the elements you want to scrape
        // Example: Scraping titles of articles
        const titles = [];
        var link = "";
        $('a').each((index, element) => {
            titles.push($(element).text())
            if ($(element).text().toLowerCase() === player.toLowerCase()) {
                link = "https://www.basketball-reference.com".concat($(element).attr('href'));
            }
        });

        console.log("titles: ", link)
        return (link)

        // Output the scraped data
    } catch (error) {
        console.error('Error scraping the data:', error);
    }
};

const scrapeData = async (player) => {
    try {
        // Fetch the HTML of the page
        const link = await scrapeLink(player);
        const response = await fetch(link);
        const data = await response.text();

        const $ = cheerio.load(data);

        const playerData = {}
        
        const titles = [];

        $('#div_per_game').find('tfoot').find('td').each((index, element) => {
            var tmpText = $(element).text()
            if (index <= 28) {
                stat = $(element).attr('data-stat')
                if (stat == 'pts_per_g') playerData.points = tmpText
                else if (stat == 'trb_per_g') playerData.trb = tmpText
                else if (stat == 'g') playerData.games = tmpText
                else if (stat == 'stl_per_g') playerData.stl = tmpText
                else if (stat == 'blk_per_g') playerData.blk = tmpText
                else if (stat == 'ast_per_g') playerData.ast = tmpText
            }
        });

        $('.media-item').find('img').each((index, element) => {
            playerData.image=$(element).attr('src')
        });
        
        console.log(titles);

        return playerData
        // Output the scraped data
    } catch (error) {
        console.error('Error scraping the data:', error);
    }
}

// Export the scrapeData function
module.exports = scrapeData;