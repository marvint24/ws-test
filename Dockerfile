FROM oven/bun:latest

WORKDIR /app
COPY . .

RUN bun install
EXPOSE 80
CMD ["bun", "run" ,"index.ts"]