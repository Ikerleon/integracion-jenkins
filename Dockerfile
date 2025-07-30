FROM node:24

WORKDIR /usr/src/app

# Instala servidor estático
RUN npm install -g http-server

COPY . .

EXPOSE 8080

CMD ["http-server", ".", "-p", "8080"]
