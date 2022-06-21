# Image-Processing-API
This is an image Processing API 
to resize and save images at user specific sizes
using buffer to store these images for later use 

## author 
Kirellos Emad

## Dependencies or Installation
using this command will download packages dependencies 
```properties
  npm install 
```

## Run The Server
After the Installation of the dependencies, by running 
the following command to start the Server
```properties
npm run start
```

## Compiled
to compile from typeScript to javaScript run
the following command 
```properties
npm run build
```

## Linting
for lint using  esLint, run
the following command 
```properties
npm run lint
```

## Formatting
for more clean code and formatted, run 
the following command 
```properties
npm run prettier
```

## Testing
for test using jasmine ,run
the following command 
```properties
npm run test
```


### Instructions
### 1. Home Page
http://localhost:3000/
Endpoint to Home Page with welcome message and how to use resizer api
### 2. Image Endpoint
To use resizing you could type url as follow:
http://localhost:3000/api/images?imageName=(filename)&width=(positiveinteger)&height=(positiveinteger)


    Available filenames are:
        encenadaport
        fjord
        icelandwaterfall
        palmtunnel
        santamonica
