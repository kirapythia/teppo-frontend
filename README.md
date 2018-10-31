# Teppo Frontend

TODO wiki pages

Further development of [Teppo](https://github.com/espoon-voltti?q=teppo)

A web client for using [Teppo REST API](https://github.com/espoon-voltti/teppo-backend). See [application wiki](../../wiki/) for more information.


# Development Notes October 31, 2018. To use SVGO optimizer that will significantly speed-up the load time required to load SVG plans inline. 

Simply add configuration object to module.loaders like this.

          {
            test: /\.(dwg|dxf|pdf).svg$/,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                options: {
                  svgo: {
                  }
                }
              }
            ]
          },

Previously webpack.config files can be found in the `webpack-configs` directory. Copy these files and overwrite the files in `node_modules/react-scripts/configs/`

SVGO is an SVG image optimizer, we have found that the default PDF to SVG conversion files can be very large file sizes, so therefore to keep the file sizes not growing too large for client browsers, SVGO should be used.

- please also note that due to time restrictions SVGO is loaded with Webpack in the front-end and the correct place for it should be in the backend. 
- the correct place for SVGO optimization is in the backend after new plan file has been uploaded, and after SVGO optimization the optimized SVG file only should be uploaded to S3.

# The SVG conversion was not tested at all with multi-file uploads. This needs to be tested and modified to work correctly.


## Getting Started

TODO See [Getting Started](../../wiki/Getting-Started) for prerequisites and install instructions

## Running the tests

To run tests in watch mode
```
npm run test
```

To run tests with coverage reporting
```
npm run test-coverage
```

To run the linter
```
npm run linter
```

## Deployment

To run the development server
```
npm start
```

## Environments

To toggle between AWS / local backend, change proxy target setting in package.json
- AWS:      "http://52.214.196.107:8080" 
- Local:    "http://localhost:8080"

## Built With

TODO wiki: See a [list of dependencies](../../wiki/List-of-dependencies )

## License
[MIT License](./LICENSE)
