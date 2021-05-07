FROM golang:alpine as base

WORKDIR /app

COPY go.mod go.sum /app/

RUN go mod download

COPY . .

FROM base as dev

CMD ["go", "run", "main.go"]

FROM base as production

RUN go build -o main .

WORKDIR /dist

RUN cp /app/main . && cp /app/index.html .

CMD ["/dist/main"]