import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { GoogleGenerativeAI } = require("@google/generative-ai");

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const configuration = {
    apiKey: process.env.GEMINI_KEY,
  };
  const genAI = new GoogleGenerativeAI(configuration);

  if (!body.query) {
    throw createError({
      statusCode: 400,
      statusMessage: "Query is required",
    });
  }

  

  try {
    let model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    console.log(`Entro a pensar con "${body.query}"`)


    const prompt = `given the search "${body.query}" give me the 10 most popular technology devices in south america that satisfies that information. Detail the information in a JSON format with the following fields: 
    - "producto_id": an integer representing the product ID, please make this a number that is bigger than 4000
    - "nombre": the complete name of the device,
    - "imagen": an URL of the image of the device,
    - "calificacion": a rating in stars between 0 and 5,
    - "precio": the price of the device in the local currency (use a string format).

    Please, give me ONLY and ONLY the JSON format.`;

    const result = await model.generateContent(prompt);
    const jsonResponse = JSON.parse(result.response.text());

    return jsonResponse;
  } catch (error) {
    console.error('Error generating content:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating content from AI',
    });
  } // HASTA AQUÍ
});
