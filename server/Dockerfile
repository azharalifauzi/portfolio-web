FROM nginx as base

COPY index.html /var/www/html/

FROM base as dev
COPY nginx/dev/ /etc/

FROM base as production
COPY nginx/prod/ /etc/
