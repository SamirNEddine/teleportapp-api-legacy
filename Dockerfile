FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install && \
    npm cache clean --force

COPY . .

## Wait for mongo database to run
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then the application
CMD /wait && npm run production