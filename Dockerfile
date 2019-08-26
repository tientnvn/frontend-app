FROM node:10 as builder

RUN mkdir -p /opt/app

# copy in our source code last, as it changes the most
WORKDIR /opt/app

COPY . /opt/app

RUN yarn install

RUN yarn build


FROM node:10
RUN yarn global add serve
WORKDIR /opt/app
COPY  --from=builder /opt/app/build/ /opt/app/
EXPOSE 5000
CMD ["/bin/sh","-c","serve"]
