# Artillery Sitemap
This [Artillery](https://artillery.io/) plugin allows you to get all URL from a sitemap then call randoms URL from this one.

## Usage

### Install

`npm install artillery-plugin-sitemap`

### Usage

Simple example :

``` yaml
config:
  target: "https://toto.test/sitemap.xml" # Set the sitemap there
  phases:
    - duration: 20
      arrivalRate: 1
  plugins:
    sitemap: {}
scenarios:
  - flow:
      - loop:
          - get:
              url: "/" # We should assign a useless URL there (it will be replaced by a random URL)
              headers:
                User-Agent: "bot"
        count: 100
```