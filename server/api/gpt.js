import OpenAI from "openai";


export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nombre, imagen, precios } = body;
  const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
  };
  const openai = new OpenAI(configuration);
  
  try {

    const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: `Crea una descripción en no más de 5 líneas para el siguiente producto, si el producto tiene un almacen con mejor precio, menciona el nombre la descripción:
        Nombre: ${nombre}
        Imagen: ${imagen}
        Precios: ${JSON.stringify(precios)}` }],
        model: "gpt-3.5-turbo",
        max_tokens: 150,
      });
      console.log(response.choices[0].message);

    return response.choices[0].message.content;
  } catch (error) {
    return {
      status: 500,
      body: error.message,
    };
  }
});
