Dette program scraper og crawler ved hjælp af Scrapy. Dens hovedfil er WikiPageSpider, som bygger en spider. Når man kører denne spider, gemmer den outputtet.

Forudsætninger
Installér Scrapy:

bash
Copy code
pip install scrapy
Kommando for at køre spideren og gemme output
bash
Copy code
scrapy crawl WikiPageSpider -o output.json