FROM node:6.2.1

RUN mkdir /src

COPY package.json /src
WORKDIR /src 
RUN npm install

# Add your source files
COPY . /src  
CMD ["npm","start"] 
