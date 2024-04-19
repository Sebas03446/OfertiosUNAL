// Importa la instancia de Supabase desde tu archivo de configuración o plugin
import { createClient } from '@supabase/supabase-js'

//const supabaseUrl          = env("SUPABASE_URL")
//const supabaseKey          = env("SUPBASE_KEY")

//const supabase = createClient(supabaseUrl, supabaseKey)
export default defineEventHandler(async (event) => {
    const body = await readBody(event) 
    console.log('Hola desde la API!');
    console.log(body);
    return 'Hola desde la API!';
})