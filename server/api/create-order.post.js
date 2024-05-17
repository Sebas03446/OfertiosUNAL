import { Preference } from 'mercadopago'

export default defineEventHandler(async event => {
	const runtimeConfig = useRuntimeConfig()
	const body = await readBody(event)

	console.log(runtimeConfig)
	switch (body.payment_method) {
		case 'mercadopago':
			const preference = new Preference(mercadopago)

			const response = await preference.create({
				body: {
					auto_return: 'approved',
					back_urls: {
						success: `${runtimeConfig.baseUrl}/success`,
					},
					items: [
						{
							id: body.product_name
								.toLowerCase()
								.replace(' ', '_'),
							quantity: 1,
							title: body.product_name,
							unit_price: 10000 ,
						},
					],
				},
			})

			return { url: response.init_point }
		default:
			setResponseStatus(event, 400)
			return { error: 'Invalid payment platform' }
	}
})