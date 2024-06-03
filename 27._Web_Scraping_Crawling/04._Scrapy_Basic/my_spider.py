import scrapy

class BlogSpider(scrapy.Spider):
    name = 'blogspider'
    start_urls = ['https://www.zyte.com/blog/']

    def parse(self, response):
        # Udtrækker titler på blogindlæg
        for title in response.css('.oxy-post-title'):
            yield {'title': title.css('::text').get()}

        # Finder link til næste side og følger det
        for next_page in response.css('a.next'):
            yield response.follow(next_page, self.parse)
