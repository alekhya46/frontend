# FROM etheros_frontend_image
# WORKDIR /opt/frontend
# COPY . /opt/frontend
# ENV NODE_OPTIONS=--max-old-space-size=4096
# RUN ionic build --disableHostCheck --prod --output-hashing=all -- --base-href=/ --aot

FROM node:12.18

RUN mkdir -p /app

WORKDIR /app
COPY . /app
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm install
CMD ["npm", "start"]
