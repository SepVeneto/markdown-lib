FROM node:16.11.0

COPY . /app

WORKDIR /app

RUN npm config set registry http://10.7.12.26:4873 && \
    npm i -g pnpm && \
    pnpm install

# node port
EXPOSE 8000

VOLUME ["/app/markdown/.vitepress/dist", "/app/markdown/src"]

CMD ["pnpm", "run", "bootstrap"]
