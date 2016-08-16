FROM node:6.4.0

RUN mkdir /src

COPY package.json /src
WORKDIR /src 
RUN npm install

# Add your source files
COPY . /src  
CMD ["npm","start"] 
