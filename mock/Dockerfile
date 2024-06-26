# Build phase
FROM golang:1.19-alpine AS builder

ENV CGO_ENABLED=0 \
    GOOS=linux \
    GO111MODULE=on

WORKDIR /app

COPY . .

RUN go mod download

RUN go build -o ./bin/main .

FROM scratch


COPY --from=builder /app/bin/main .

# Run executable
CMD ["./main"]