const swaggerAutogen = require('swagger-autogen')();
const fs = require('fs');
const path = require('path');

// ====== Swagger Documentation Configuration ====== //
const doc = {
    info: {
        title: 'Healthcare server 2', // 🔄 Update your API's title
        description: `
Welcome to the Healthcare!  
Add a brief description of your API, its purpose, and its primary features here.  

✨ **Key Features**:  
- Mention your API's core functionalities.
- Highlight user or developer benefits.
- Add emojis to make it visually appealing if desired.  

Let developers know what they can achieve with your API! 🚀
        `, // 🔄 Customize this description
    },
    host: 'localhost:3000', // 🔄 Replace with your server's hostname
    basePath: '/',    // 🔄 Specify the base path for your API
};

// ====== Paths for Swagger Files ====== //
const inputSwaggerFile = './swagger/swagger-name-input.json';  // Intermediate JSON file
const outputSwaggerFile = './swagger/swagger-output.json';     // Final JSON file with tags
const routes = [                                               // 🔄 Specify your route files
    '../routers/*.js',                  // General route files
];

// ====== Function to Dynamically Generate Tags ====== //
/**
 * Generate Swagger JSON file with tags dynamically based on the first segment in the route path.
 * @param {string} inputFilePath - Path to the input Swagger JSON file.
 * @param {string} outputFilePath - Path to the output Swagger JSON file.
 */
const generateSwaggerWithTags = (inputFilePath, outputFilePath) => {
    try {
        // Read and parse the input JSON file
        const rawData = fs.readFileSync(inputFilePath, 'utf8');
        const swaggerDoc = JSON.parse(rawData);

        const tagsMap = new Map();

        // Iterate over the paths and group them by tags based on the first segment in the route
        Object.keys(swaggerDoc.paths).forEach((route) => {
            const segments = route.split('/');
            if (segments.length > 1 && segments[1]) {
                const prefix = segments[1]; // Extract the first word after the initial slash
                const tagName = `${prefix.charAt(0).toUpperCase() + prefix.slice(1)}`; // Capitalize the prefix

                // Add tag to tagsMap if not already present
                if (!tagsMap.has(tagName)) {
                    tagsMap.set(tagName, {
                        name: tagName,
                        description: `Endpoints for ${prefix}` // 🔄 Customize descriptions if needed
                    });
                }

                // Update the route in paths to include the tag
                const methods = swaggerDoc.paths[route];
                Object.keys(methods).forEach((method) => {
                    if (!methods[method].tags) {
                        methods[method].tags = [];
                    }
                    if (!methods[method].tags.includes(tagName)) {
                        methods[method].tags.push(tagName);
                    }
                });
            }
        });

        // Add the tags to the Swagger JSON
        swaggerDoc.tags = Array.from(tagsMap.values());

        // Write the updated JSON to the output file
        fs.writeFileSync(outputFilePath, JSON.stringify(swaggerDoc, null, 4), 'utf8');
        console.log(`Updated Swagger JSON file generated at: ${outputFilePath}`);
    } catch (error) {
        console.error('Error processing Swagger JSON:', error.message);
    }
};

// ====== Function to Generate Swagger File ====== //
const generateSwaggerFile = async () => {
    try {
        console.log('Generating initial Swagger JSON...');
        await swaggerAutogen(inputSwaggerFile, routes, doc);
        console.log(`Swagger JSON file created at: ${inputSwaggerFile}`);

        // Once the initial file is created, dynamically add tags
        generateSwaggerWithTags(inputSwaggerFile, outputSwaggerFile);
    } catch (error) {
        console.error('Error generating Swagger JSON:', error.message);
    }
};

// ====== Execute the Process ====== //
generateSwaggerFile();
