FROM node:latest
LABEL authors="Omar"

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000

CMD ["npm","start"]