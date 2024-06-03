import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
# pip install scrapy

class WikipageSpider(CrawlSpider):
    name = 'WikiPageSpider'  # Navnet på spideren.
    allowed_domains = ['en.wikipedia.org']  # Begrænser crawl til disse domæner.
    start_urls = ['https://en.wikipedia.org/wiki/List_of_common_misconceptions']  # Start-URL for spideren.

    # Definerer regler for crawling og link-udtrækning.
    rules = (
        # Følger links, der matcher regex '/wiki/' og kalder 'parse_item' callback-funktion.
        Rule(LinkExtractor(allow=r'/wiki/'), callback='parse_item', follow=True),
    )

    def parse_item(self, response):
        # Ekstraherer URL, titel og indhold af siden og returnerer det som en dictionary.
        yield {
            'url': response.url,
            'title': response.css('h1::text').get(),
            'content': response.css('p::text').getall()
        }

# Kommando for at kør spider og gemmo output
# scrapy crawl WikiPageSpider -o output.json




# Kommando til at lave projekt
# scrapy startproject