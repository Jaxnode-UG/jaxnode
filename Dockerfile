FROM node:6.1.0

RUN mkdir /src
WORKDIR /src

COPY package.json /src  
RUN npm install

# Add your source files
COPY . /src
CMD ["npm","start"] 
