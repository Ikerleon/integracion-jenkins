FROM node:24

WORKDIR /usr/src/app

# Instala servidor estático
RUN npm install -g http-server

COPY . .

EXPOSE 3007

CMD ["http-server", ".", "-p", "3007"]
