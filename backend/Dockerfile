# syntax=docker/dockerfile:1

FROM golang:1.20.4

WORKDIR /app

COPY . .

RUN go mod download

EXPOSE 3000

CMD ["go", "run", "cmd/server/main.go"]