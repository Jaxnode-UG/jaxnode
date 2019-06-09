FROM mhart/alpine-node:11.9.0

RUN npm config set unsafe-perm true \
    && npm install -g yarn \
    && npm config set unsafe-perm false 

RUN mkdir /src

COPY package.json /src
WORKDIR /src
RUN yarn

# Add your source files
COPY . /src  
CMD ["npm","start"]