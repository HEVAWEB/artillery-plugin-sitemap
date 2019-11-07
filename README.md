# Artillery Sitemap

Un plugin pour [Artillery](https://artillery.io/) permettant de pointer sur des URL randoms provenant du sitemap d'un site.

## Usage

Simple exemple :

``` yaml
config:
  target: "https://toto.test/sitemap.xml" # Renseigner le sitemap ici
  phases:
    - duration: 20
      arrivalRate: 1
  plugins:
    sitemap: {}
scenarios:
  - flow:
      - loop:
          - get:
              url: "/" # Il est nécessaire de renseigner une URL (celle-ci sera remplacée par l'URL random)
              headers:
                User-Agent: "bot"
        count: 100
```