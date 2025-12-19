const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const swaggerUiDist = require('swagger-ui-dist').getAbsoluteFSPath();

// Serve Swagger UI static files
app.use('/swagger', express.static(swaggerUiDist));


// Serve public OpenAPI YAML file
app.get('/openapi.yaml', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend', 'openapi.yaml'));
});

// Serve admin OpenAPI YAML file
app.get('/openapi-admin.yaml', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend', 'openapi-admin.yaml'));
});


// Serve Swagger UI with a custom HTML that loads the correct OpenAPI spec
app.get('/docs', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Swagger UI</title>
      <link rel="stylesheet" type="text/css" href="/swagger/swagger-ui.css" />
      <link rel="icon" type="image/png" href="/swagger/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="/swagger/favicon-16x16.png" sizes="16x16" />
      <style>body { margin: 0; background: #fafafa; }</style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="/swagger/swagger-ui-bundle.js" charset="UTF-8"></script>
      <script src="/swagger/swagger-ui-standalone-preset.js" charset="UTF-8"></script>
      <script>
        window.onload = function() {
          window.ui = SwaggerUIBundle({
            url: '/openapi.yaml',
            dom_id: '#swagger-ui',
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            layout: "StandaloneLayout"
          });
        };
      </script>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Swagger UI available at http://localhost:${PORT}/docs`);
});
