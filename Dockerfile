FROM node:16.11.0

COPY . /

RUN npm config set registry http://10.7.12.26:4873 && \
    npm i -g pnpm && \
    pnpm i && \
    pnpm run build

# node port
EXPOSE 8000

VOLUME ["/markdown/.vitepress/dist", "/server/markdown"]
